import { useCallback, useMemo, useState } from "react";
import {
  Control,
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { IFormResponse, IFormHelperTypes } from "@/components/shared/form";

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
  defaultValues?: DefaultValues<F>
): IUseSharedForm<F> {
  const { register, handleSubmit, formState, reset, setValue, control } =
    useForm<F>({
      mode: "onChange",
      defaultValues,
    });
  const [formResponse, setFormResponse] = useState<IFormResponse | undefined>();
  const shouldPraise = useMemo(
    () => formState.isValid && !formResponse,
    [formState.isValid, formResponse]
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
