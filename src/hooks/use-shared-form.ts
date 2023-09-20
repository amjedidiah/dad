import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Control,
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  SubmitHandler,
  UseFormReturn,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import {
  IFormResponse,
  IFormHelperTypes,
  IFormField,
} from "@/components/shared/form";
import { useAppSelector } from "./types";
import { selectActiveUser } from "@/redux/slices/user.slice";

type IUseSharedForm<F extends FieldValues> = Pick<
  UseFormReturn<F>,
  "register" | "formState"
> & {
  submitForm: any;
  formResponse?: IFormResponse;
  shouldPraise: boolean;
  setValue: UseFormSetValue<F>;
  control: Control<F, any>;
};

export default function useSharedForm<F extends FieldValues>(
  onSubmit: SubmitHandler<F>,
  successMessage: string,
  fields: IFormField<F>[],
  defaultValues?: DefaultValues<F>
): IUseSharedForm<F> {
  const userData = useAppSelector(selectActiveUser);
  const updatedFormValues = useMemo(
    () => ({
      ...defaultValues,
      ...userData,
    }),
    [defaultValues, userData]
  ) as DefaultValues<F>;
  const { register, handleSubmit, formState, reset, setValue, control, watch } =
    useForm<F>({
      mode: "onChange",
      defaultValues: updatedFormValues,
    });
  const [formResponse, setFormResponse] = useState<IFormResponse | undefined>();
  const shouldPraise = useMemo(
    () => formState.isValid && !formResponse,
    [formState.isValid, formResponse]
  );
  const formFieldsObject = watch();
  const formFieldNames = useMemo(
    () => Object.keys(formFieldsObject),
    [formFieldsObject]
  );

  const submitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await handleSubmit(onSubmit)(e);
        setFormResponse({
          message: successMessage,
          type: IFormHelperTypes.Success,
        });
        reset();
      } catch (error) {
        setFormResponse({
          message: error as string,
          type: IFormHelperTypes.Error,
        });
        reset(undefined, {
          keepDirtyValues: true,
          keepIsValid: true,
          keepErrors: true,
          keepIsSubmitted: true,
        });
        console.error(error);
      } finally {
        setTimeout(() => setFormResponse(undefined), 5000);
      }
    },
    [handleSubmit, onSubmit, reset, successMessage]
  );

  useEffect(() => {
    if (!formFieldNames.length || !userData?.email) return;
    formFieldNames.forEach((fieldName) => {
      const value = userData[fieldName as keyof typeof userData] as PathValue<
        F,
        Path<F>
      >;
      if (value) setValue(fieldName as Path<F>, value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFieldNames.length, setValue, userData]);

  useEffect(() => {
    fields.forEach((field) => {
      field.readOnly = Boolean(field.name === "email" && userData?.email);
    });
  }, [fields, userData?.email]);

  return {
    register,
    formState,
    submitForm,
    formResponse,
    shouldPraise,
    setValue,
    control,
  };
}
