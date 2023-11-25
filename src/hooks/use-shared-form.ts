import { useEffect, useMemo, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  SubmitHandler,
  UseFormReturn,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { IFormResponse, IFormHelperTypes } from "@/components/shared/form";
import { selectActiveUser } from "@/redux/slices/user.slice";
import { useAppSelector } from "@/redux/util";
import { magicPublishable as magic } from "@/lib/magic.lib";
import useLogin from "./use-login";
import useUserUpdate from "./use-user-update";
import { validateCookie } from "@/lib/auth.lib";

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
  handlingSubmit: boolean;
};

export default function useSharedForm<F extends FieldValues>(
  onSubmit: SubmitHandler<F>,
  successMessage: string
): IUseSharedForm<F> {
  const login = useLogin();
  const userUpdate = useUserUpdate();
  const userData = useAppSelector(selectActiveUser);
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    control,
    getValues,
  } = useForm<F>({
    mode: "onChange",
    defaultValues: userData as any,
  });
  const [formResponse, setFormResponse] = useState<IFormResponse | undefined>();
  const shouldPraise = useMemo(
    () => formState.isValid && !formResponse,
    [formState.isValid, formResponse]
  );
  const formFieldNames = Object.keys(getValues());
  const showSwitchUserText = useMemo(
    () => !!userData?.email,
    [userData?.email]
  );
  const [handlingSubmit, setHandlingSubmit] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHandlingSubmit(true);
    const values = getValues();

    try {
      if (!magic) throw "An error occurred. Please reload the page";

      // Attempt to login if not logged in
      const isLoggedIn = await validateCookie();
      if (!isLoggedIn && values.email) await login(values.email);

      // Handle form submit
      await handleSubmit(onSubmit)(e);

      // Show response of form submit
      setFormResponse({
        message: successMessage,
        type: IFormHelperTypes.Success,
      });

      // Update logged in user with relevant form values
      await userUpdate(values as any).catch(console.error);

      // Reset form fields
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
      // Clear form submit response
      setTimeout(() => setFormResponse(undefined), 5000);
      setHandlingSubmit(false);
    }
  };

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

  return {
    register,
    formState,
    submitForm,
    formResponse,
    shouldPraise,
    setValue,
    control,
    showSwitchUserText,
    handlingSubmit,
  };
}
