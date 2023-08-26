/** @jsxImportSource @emotion/react */
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { cx } from "@emotion/css";
import Button, { IButton } from "@/components/shared/button/index.button";
import useSharedForm from "@/hooks/use-shared-form";
import styles from "@/styles/form.style";
import { IComponentWithChildren } from "@/utils/types";

type IForm<F extends FieldValues> = {
  fields: IFormField<F>[];
  buttons: IButton[];
  praise: string;
  successMessage: string;
  onSubmit: SubmitHandler<F>;
} & React.FormHTMLAttributes<HTMLFormElement>;

export type IFormField<T extends FieldValues> = {
  id: keyof T;
  register: UseFormRegister<T>;
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
}: IForm<F>) {
  const {
    register,
    formState: { isValid, isLoading, errors, isSubmitting },
    submitForm,
    formResponse,
    shouldPraise,
  } = useSharedForm<F>(onSubmit, successMessage);

  return (
    <form css={styles} className="form" onSubmit={submitForm}>
      {fields.map(({ value, ...field }) => {
        field["aria-invalid"] = errors[field.id] ? "true" : "false";

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
              button.disabled ||
              isLoading ||
              !isValid ||
              isSubmitting ||
              Boolean(formResponse)
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
>(function FormField<Y extends FieldValues>(field: IFormField<Y>, ref: any) {
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
    return <input className="field" ref={ref} {...field} />;

  return null;
});

Form.Helper = function FormHelper({ children, type }: IFormHelper) {
  return <span className={cx("helper theme-text", type)}>{children}</span>;
};
