/** @jsxImportSource @emotion/react */
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "@/styles/form.style";
import { IComponentWithChildren } from "@/utils/types";

type IForm = React.FormHTMLAttributes<HTMLFormElement> & IComponentWithChildren;

type IFormLabel = {
  htmlFor: string;
} & IComponentWithChildren;

export default function Form({ children }: IForm) {
  return (
    <form css={styles} className="form">
      {children}
    </form>
  );
}

Form.Group = function FormGroup({ children }: IComponentWithChildren) {
  return <div className="group">{children}</div>;
};

Form.Label = function FormLabel({ children, htmlFor }: IFormLabel) {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

Form.Field = function FormField(
  field:
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  if ("rows" in field)
    return (
      <textarea
        name={field.name}
        aria-label={field.name}
        className="field"
        {...field}
      />
    );
  else if ("type" in field) return <input className="field" {...field} />;

  return null;
};
