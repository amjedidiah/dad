import { useState } from "react";
import {
  Control,
  DeepMap,
  DeepPartial,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { IFormResponse, IFormHelperTypes } from "@/components/shared/form";
import { useAppDispatch, useAppSelector } from "./types";
import {
  formUpdate,
  formClear,
  selectCombinedFormData,
} from "@/redux/slices/form.slice";
import { useDeepCompareEffect } from "react-use";

type IUseSharedForm<F extends FieldValues> = Pick<
  UseFormReturn<F>,
  "register" | "formState"
> & {
  submitForm: any;
  formResponse?: IFormResponse;
  shouldPraise: boolean;
  setValue: UseFormSetValue<F>;
  control: Control<F, any>;
  showSwitchUserText: boolean;
};

export default function useSharedForm<F extends FieldValues>(
  onSubmit: SubmitHandler<F>,
  successMessage: string
): IUseSharedForm<F> {
  const defaultValues = useAppSelector(
    selectCombinedFormData()
  ) as DefaultValues<F>;
  const dispatch = useAppDispatch();
  const useFormApi = useForm<F>({
    mode: "onChange",
    defaultValues,
  });
  const valueChanges = useFormApi.watch();
  const [formResponse, setFormResponse] = useState<IFormResponse | undefined>();
  const shouldPraise = useFormApi.formState.isValid && !formResponse;
  const showSwitchUserText = !!defaultValues?.email;

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Await form submit
      await useFormApi.handleSubmit(onSubmit)(e);

      // Set returned form response
      setFormResponse({
        message: successMessage,
        type: IFormHelperTypes.Success,
      });

      // Reset form
      useFormApi.reset();

      // Clear redux form data
      await dispatch(formClear());
    } catch (error) {
      // Set returned form response
      setFormResponse({
        message: error as string,
        type: IFormHelperTypes.Error,
      });

      // Log error to console
      console.error(error);
    } finally {
      // Clear form response
      setTimeout(() => setFormResponse(undefined), 5000);
    }
  };

  // Update form with changes from the redux store
  useDeepCompareEffect(() => {
    for (let key of Object.keys(defaultValues)) {
      const value = defaultValues[key];
      useFormApi.setValue(key as Path<F>, value, { shouldDirty: false });
    }
  }, [defaultValues, useFormApi.setValue]);

  // Update store with changes from the form
  useDeepCompareEffect(() => {
    const createValuesFromDirtyFields = (
      dirtyFields: Partial<Readonly<DeepMap<DeepPartial<F>, boolean>>>,
      changes: F
    ) => {
      const values = {} as FieldValues;

      Object.keys(dirtyFields).forEach((fieldName) => {
        if (dirtyFields[fieldName]) {
          values[fieldName] = changes[fieldName];
        }
      });

      return values;
    };

    if (Object.keys(valueChanges).length) {
      const values = createValuesFromDirtyFields(
        useFormApi.formState.dirtyFields,
        valueChanges
      );
      dispatch(formUpdate(values));
    }
  }, [valueChanges]);

  return {
    ...useFormApi,
    submitForm,
    formResponse,
    shouldPraise,
    showSwitchUserText,
  };
}
