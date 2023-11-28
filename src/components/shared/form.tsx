/** @jsxImportSource @emotion/react */
import {
  HTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes,
  forwardRef,
  useContext,
} from "react";
import {
  Control,
  FieldValues,
  FormState,
  Path,
  RegisterOptions,
  SubmitHandler,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";
import { cx } from "@emotion/css";
import Button, { IButton } from "@/components/shared/button/index.button";
import useSharedForm from "@/hooks/use-shared-form";
import styles from "@/styles/form.style";
import { CldUploadWidget, CldUploadWidgetPropsOptions } from "next-cloudinary";
import { useTheme } from "@emotion/react";
import PhoneInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { selectCountryCode } from "@/redux/slices/location.slice";
import { useAppSelector } from "@/redux/util";
import { selectActiveUser } from "@/redux/slices/user.slice";
import { ModalContext } from "@/context/modal/modal.context";
import useLogout from "@/hooks/use-logout";
import useFormControl from "@/hooks/use-form-control";
import ShouldRender from "./should-render";

type IForm<F extends FieldValues> = {
  fields: IFormField<F>[];
  buttons: IButton[];
  praise: string;
  successMessage: string;
  onSubmit: SubmitHandler<F>;
} & React.FormHTMLAttributes<HTMLFormElement>;

type IFormFieldOptions = CldUploadWidgetPropsOptions & {
  helperMessage: string;
};

export type IFormField<T extends FieldValues> = {
  id: keyof T;
  register: UseFormRegister<T>;
  options?: IFormFieldOptions;
  setValue: UseFormSetValue<T>;
  control: Control<T, any>;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

type IFormHelper = {
  type?: IFormHelperTypes;
} & PropsWithChildren;

export enum IFormHelperTypes {
  Error = "error",
  Praise = "praise",
  Success = "success",
  Warning = "warning",
  Info = "info",
}

export type IFormResponse = {
  type: IFormHelperTypes;
  message: string;
};

export default function Form<F extends FieldValues>({
  buttons,
  children,
  fields,
  praise,
  successMessage,
  onSubmit,
  className,
  id = "",
}: IForm<F>) {
  const {
    submitForm,
    formResponse,
    shouldPraise,
    showSwitchUserText,
    handlingSubmit,
    ...rest
  } = useSharedForm<F>(onSubmit, successMessage, id);
  return (
    <form
      css={styles}
      className={cx(`form ${className}`)}
      onSubmit={submitForm}
    >
      {fields.map(({ value, ...field }) => (
        <Form.Field
          key={field.name}
          field={field}
          showSwitchUserText={showSwitchUserText}
          {...rest}
        />
      ))}
      <ShouldRender if={shouldPraise && !rest.formState.isSubmitting}>
        <Form.Group className="group-message">
          <Form.Helper type={IFormHelperTypes.Praise}>{praise}</Form.Helper>
        </Form.Group>
      </ShouldRender>
      {formResponse && (
        <Form.Group className="group-message">
          <Form.Helper type={formResponse.type}>
            {formResponse.message}
          </Form.Helper>
        </Form.Group>
      )}
      {buttons.map((button, i) => (
        <Form.Button
          key={`${button.id}-${i}`}
          button={button}
          isHandlingSubmit={handlingSubmit}
          formResponse={formResponse}
          {...rest}
        />
      ))}
      {children}
    </form>
  );
}

Form.Label = function FormLabel({
  children,
  htmlFor,
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

Form.Field = function FormField<F extends FieldValues>({
  field,
  showSwitchUserText,
  ...rest
}: {
  field: IFormField<F>;
  showSwitchUserText: boolean;
} & UseFormReturn<F>) {
  const {
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = rest;

  field["aria-invalid"] = errors[field.id] ? "true" : "false";
  field.setValue = setValue;
  if ("type" in field && field.type === "tel") field.control = control;

  return (
    <Form.Group key={field.id}>
      {field["aria-label"] && (
        <Form.Label htmlFor={field.id}>
          {field["aria-label"]}
          {field.required && <span className="asterisk">*</span>}
        </Form.Label>
      )}
      <Form.Control
        {...field}
        {...register(
          field.id as Path<F>,
          { ...field } as RegisterOptions<F, Path<F>> | undefined
        )}
      />
      {errors[field.id] && (
        <Form.Helper type={IFormHelperTypes.Warning}>
          {errors[field.id]?.message as string}
        </Form.Helper>
      )}
      <ShouldRender if={showSwitchUserText && field.name === "email"}>
        <Form.SwitchUser isSubmitting={isSubmitting} />
      </ShouldRender>
    </Form.Group>
  );
};

Form.Control = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  IFormField<any>
>(function FormField<Y extends FieldValues>(
  { setValue, ...field }: IFormField<Y>,
  ref: any
) {
  const { isDarkMode } = useTheme();
  const countryCode = useAppSelector(selectCountryCode);
  const userData = useAppSelector(selectActiveUser);
  const { fileUploadMessage, handleUpload, handleUploadSuccess } =
    useFormControl(field, setValue);

  if ("rows" in field)
    return (
      <textarea
        aria-label={field.name}
        className="field"
        ref={ref}
        {...field}
      />
    );
  else if ("type" in field)
    if (field.type === "file")
      return (
        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          onSuccess={handleUploadSuccess}
          onUploadAdded={(results) => handleUpload(results, field.options)}
          options={field.options}
        >
          {({ open }) => {
            function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
              e.preventDefault();
              open();
            }
            return (
              <div
                className="flex border border-danger cursor-pointer"
                onClick={handleOnClick}
                id="uploadWidget"
              >
                <p
                  className={cx(
                    {
                      "text-greyLighter": isDarkMode && !fileUploadMessage.type,
                      "text-secondGrey": !isDarkMode && !fileUploadMessage.type,
                      "text-red-500": fileUploadMessage.type === "error",
                      "text-success": fileUploadMessage.type === "success",
                    },
                    "flex-1 flex items-center p-2"
                  )}
                >
                  {fileUploadMessage.message}
                </p>
                <div
                  className={cx(
                    {
                      "bg-greyLighter text-black": isDarkMode,
                      "bg-grey2 text-white": !isDarkMode,
                    },
                    "py-2 px-[22.5px] leading-8 inline-flex items-center justify-center"
                  )}
                >
                  Browse file
                </div>
              </div>
            );
          }}
        </CldUploadWidget>
      );
    else if (field.type === "tel")
      return (
        <PhoneInput
          name={field.name as string}
          control={field.control}
          rules={{ required: field.required }}
          className={cx("field-tel border", {
            "border-warning": field["aria-invalid"] === "true",
            "border-greyLighter": field["aria-invalid"] === "false",
          })}
          defaultCountry={countryCode}
        />
      );
    else {
      const isEmailField = field.name === "email";
      if (isEmailField && userData?.email) field = { ...field, readOnly: true };
      else if (isEmailField && !userData?.email) {
        const { readOnly, ...rest } = field;
        field = rest;
      }
      return <input className="field" ref={ref} {...field} />;
    }

  return null;
});

Form.SwitchUser = function SwitchUser({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const { modalTitle } = useContext(ModalContext);
  const logout = useLogout();

  return (
    <Form.Helper type={IFormHelperTypes.Info}>
      You are currently logged in with this email.
      {!isSubmitting && (
        <>
          <span
            className="cursor-pointer underline font-medium text-primary ms-1"
            onClick={() => logout(modalTitle)}
          >
            Switch user?
          </span>
          <span
            className="cursor-pointer underline font-medium text-red-500 ms-1"
            onClick={() => logout()}
          >
            Logout?
          </span>
        </>
      )}
    </Form.Helper>
  );
};

Form.Group = function FormGroup({
  children,
  className,
}: HTMLProps<HTMLDivElement>) {
  return <div className={cx(`group ${className}`)}>{children}</div>;
};

Form.Helper = function FormHelper({ children, type }: IFormHelper) {
  return <span className={cx("helper theme-text", type)}>{children}</span>;
};

Form.Button = function FormButton<F extends FieldValues>({
  button,
  formResponse,
  isHandlingSubmit,
  formState: { isLoading, isValid, isSubmitting },
}: {
  button: IButton;
  formResponse?: IFormResponse;
  isHandlingSubmit: boolean;
  formState: FormState<F>;
}) {
  return (
    <Form.Group className="group-button" key={button.key}>
      <Button
        {...button}
        disabled={
          button.type === "submit" &&
          (button.disabled ||
            isLoading ||
            !isValid ||
            isSubmitting ||
            Boolean(formResponse) ||
            isHandlingSubmit)
        }
        isLoading={
          (isSubmitting || isHandlingSubmit) && button.type === "submit"
        }
        notGrow
      />
    </Form.Group>
  );
};
