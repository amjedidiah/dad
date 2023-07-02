/** @jsxImportSource @emotion/react */
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import Button, { IButton } from "@/components/shared/button";
import styles from "@/styles/form.style";
import { IComponentWithChildren } from "@/utils/types";

type IForm<F extends FieldValues> = {
  fields: IFormField<F>[];
  buttons: IButton[];
} & React.FormHTMLAttributes<HTMLFormElement>;

export type IFormField<T extends FieldValues> = {
  id: keyof T;
  register: UseFormRegister<T>;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

export default function Form<F extends FieldValues>({
  buttons,
  children,
  fields,
}: IForm<F>) {
  const { register, handleSubmit } = useForm<F>();
  const onSubmit: SubmitHandler<F> = (data) => console.log(data);

  return (
    <form css={styles} className="form" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => {
        const registeredField = { ...field, register } as IFormField<F>;
        return (
          <Form.Group key={field.id}>
            <Form.Label htmlFor={field.id}>{field["aria-label"]}</Form.Label>
            <Form.Field {...registeredField} />
          </Form.Group>
        );
      })}
      {buttons.map((button) => (
        <Form.Group key={button.key}>
          <Button {...button} />
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

Form.Field = function FormField<Y extends FieldValues>({
  register,
  ...field
}: IFormField<Y>) {
  if ("rows" in field)
    return (
      <textarea
        aria-label={field.name}
        className="field"
        {...field}
        {...register(field.id as Path<Y>, { required: field.required })}
      />
    );
  else if ("type" in field)
    return (
      <input
        className="field"
        {...field}
        {...register(field.id as Path<Y>, { required: field.required })}
      />
    );

  return null;
};
