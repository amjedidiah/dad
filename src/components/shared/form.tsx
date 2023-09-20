/** @jsxImportSource @emotion/react */
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import {
  Control,
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { cx } from "@emotion/css";
import Button, { IButton } from "@/components/shared/button/index.button";
import useSharedForm from "@/hooks/use-shared-form";
import styles from "@/styles/form.style";
import { IComponentWithChildren } from "@/utils/types";
import {
  CldUploadWidget,
  CldUploadWidgetProps,
  CldUploadWidgetPropsOptions,
  CldUploadWidgetResults,
} from "next-cloudinary";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { selectCountryCode } from "@/redux/slices/location.slice";
import { useAppSelector } from "@/hooks/types";
import { selectActiveUser } from "@/redux/slices/user.slice";

type IForm<F extends FieldValues> = {
  fields: IFormField<F>[];
  buttons: IButton[];
  praise: string;
  successMessage: string;
  onSubmit: SubmitHandler<F>;
  defaultValues?: DefaultValues<F>;
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
} & IComponentWithChildren;

export enum IFormHelperTypes {
  Error = "error",
  Praise = "praise",
  Success = "success",
  Warning = "warning",
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
  defaultValues,
}: IForm<F>) {
  const userData = useAppSelector(selectActiveUser);
  const updatedDefaultValues = {
    ...defaultValues,
    ...userData,
  } as DefaultValues<F>;
  const {
    register,
    formState: { isValid, isLoading, errors, isSubmitting },
    submitForm,
    formResponse,
    shouldPraise,
    setValue,
    control,
  } = useSharedForm<F>(onSubmit, successMessage, updatedDefaultValues);

  useEffect(() => {
    fields.forEach((field) => {
      if (field.name === "email" && defaultValues?.email) field.readOnly = true;
    });
  }, [defaultValues?.email, fields]);

  return (
    <form css={styles} className="form" onSubmit={submitForm}>
      {fields.map(({ value, ...field }) => {
        field["aria-invalid"] = errors[field.id] ? "true" : "false";
        field.setValue = setValue;
        if ("type" in field && field.type === "tel") field.control = control;

        return (
          <Form.Group key={field.id}>
            <Form.Label htmlFor={field.id}>
              {field["aria-label"]}
              {field.required && <span className="asterisk">*</span>}
            </Form.Label>
            <Form.Field
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
          </Form.Group>
        );
      })}
      {shouldPraise && !isSubmitting && (
        <Form.Group>
          <Form.Helper type={IFormHelperTypes.Praise}>{praise}</Form.Helper>
        </Form.Group>
      )}
      {formResponse && (
        <Form.Group>
          <Form.Helper type={formResponse.type}>
            {formResponse.message}
          </Form.Helper>
        </Form.Group>
      )}
      {buttons.map((button) => (
        <Form.Group key={button.key}>
          <Button
            {...button}
            disabled={
              button.type === "submit" &&
              (button.disabled ||
                isLoading ||
                !isValid ||
                isSubmitting ||
                Boolean(formResponse))
            }
            isLoading={isSubmitting && button.type === "submit"}
            notGrow
          />
        </Form.Group>
      ))}
      {children}
    </form>
  );
}

Form.Group = function FormGroup({ children }: IComponentWithChildren) {
  return <div className="group">{children}</div>;
};

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

Form.Field = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  IFormField<any>
>(function FormField<Y extends FieldValues>(
  { setValue, ...field }: IFormField<Y>,
  ref: any
) {
  const { isDarkMode } = useTheme();
  const [fileUploadMessage, setFileUploadMessage] = useState<{
    type?: string;
    message: string;
  }>({ message: field.options?.helperMessage || "" });
  const countryCode = useAppSelector(selectCountryCode);

  const handleSuccess: CldUploadWidgetProps["onSuccess"] = ({ info }) => {
    if (!info || typeof info === "string") return;
    const data = info as {
      secure_url: string;
      original_filename: string;
      format: string;
    };
    setValue(field.name as Path<Y>, data.secure_url as PathValue<Y, Path<Y>>);

    setFileUploadMessage({
      type: "success",
      message: `${data.original_filename}.${data.format}`,
    });
  };

  const handleUpload = (
    { info }: CldUploadWidgetResults,
    options?: IFormFieldOptions
  ) => {
    if (!info || typeof info === "string") return;
    const data = info as { file: { size: number; type: string } };
    const fileSize = data.file.size;
    const fileExt = data.file.type.split("/")[1];
    const maxFileSize = options?.maxFileSize || Number.MAX_SAFE_INTEGER;

    if (
      fileSize > maxFileSize ||
      !options?.clientAllowedFormats?.includes(fileExt)
    ) {
      setValue(field.name as Path<Y>, undefined as PathValue<Y, Path<Y>>);
      setFileUploadMessage({
        type: "error",
        message: field.options?.helperMessage || "",
      });
      setTimeout(
        () => toast.info("Close the upload dialog and try again..."),
        2500
      );
    }
  };

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
          onSuccess={handleSuccess}
          onUploadAdded={(results, widget) =>
            handleUpload(results, field.options)
          }
          options={field.options}
        >
          {({ open, results }) => {
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
    else return <input className="field" ref={ref} {...field} />;

  return null;
});

Form.Helper = function FormHelper({ children, type }: IFormHelper) {
  return <span className={cx("helper theme-text", type)}>{children}</span>;
};
