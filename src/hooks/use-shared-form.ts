import { useState } from "react";
import {
  DeepMap,
  DeepPartial,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { IFormResponse, IFormHelperTypes } from "@/components/shared/form";
import { useAppDispatch, useAppSelector } from "@/redux/util";
import { magicPublishable as magic } from "@/lib/magic.lib";
import useLogin from "@/hooks/use-login";
import useUserUpdate from "@/hooks/use-user-update";
import { validateCookie } from "@/lib/auth.lib";
import {
  formUpdate,
  formClear,
  selectFormData,
} from "@/redux/slices/form.slice";
import { useDeepCompareEffect } from "react-use";
import { selectActiveUser, userFetch } from "@/redux/slices/user.slice";
import useDebounce from "@/hooks/use-debounce";

type IUseSharedForm<F extends FieldValues> = UseFormReturn<F> & {
  submitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formResponse?: IFormResponse;
  shouldPraise: boolean;
  showSwitchUserText: boolean;
  handlingSubmit: boolean;
};

export default function useSharedForm<F extends FieldValues>(
  onSubmit: SubmitHandler<F>,
  successMessage: string,
  formId: string
): IUseSharedForm<F> {
  const dispatch = useAppDispatch();
  const login = useLogin();
  const userUpdate = useUserUpdate();
  const formData = useAppSelector(selectFormData(formId));
  const userData = useAppSelector(selectActiveUser);
  const defaultValues = {
    ...formData,
    ...userData,
  } as unknown as DefaultValues<F>;
  const useFormApi = useForm<F>({
    mode: "onChange",
    defaultValues,
  });
  const valueChanges = useDebounce(useFormApi.watch());
  const [formResponse, setFormResponse] = useState<IFormResponse | undefined>();
  const [handlingSubmit, setHandlingSubmit] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHandlingSubmit(true);
    const values = useFormApi.getValues();

    try {
      if (!magic) throw "An error occurred. Please reload the page";

      // Attempt to login if not logged in
      const isLoggedIn = await validateCookie();
      if (!isLoggedIn && values.email) await login(values.email);

      // Await form submit
      await useFormApi.handleSubmit(onSubmit)(e);

      // Show response of form submit
      setFormResponse({
        message: successMessage,
        type: IFormHelperTypes.Success,
      });

      const isEmailData = Object.keys(values).length === 1;
      // Update logged in user with relevant form values if data contains values to update else just fetch user
      if (!isEmailData) await userUpdate(values as any).catch(console.error);
      else await dispatch(userFetch());

      // Reset form
      useFormApi.reset();

      // Clear redux form data
      await dispatch(formClear(formId));
    } catch (error) {
      // Set returned form response
      setFormResponse({
        message: error as string,
        type: IFormHelperTypes.Error,
      });

      // Log error to console
      console.error(error);

      // Reset form
      useFormApi.reset(undefined, {
        keepDirtyValues: true,
        keepIsValid: true,
        keepErrors: true,
        keepIsSubmitted: true,
      });
    } finally {
      // Clear form submit response
      setTimeout(() => setFormResponse(undefined), 5000);
      setHandlingSubmit(false);
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
      if (Object.keys(values).length) dispatch(formUpdate(formId, values));
    }
  }, [valueChanges]);

  return {
    ...useFormApi,
    submitForm,
    formResponse,
    handlingSubmit,
    shouldPraise: useFormApi.formState.isValid && !formResponse?.message,
    showSwitchUserText: !!userData?.email,
  };
}
