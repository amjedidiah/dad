/** @jsxImportSource @emotion/react */
import Button, { ButtonProps } from "@/components/button";
import styles from "@/styles/button-group.style";

type Props = {
  buttons: ButtonProps[];
};

export default function ButtonGroup({ buttons }: Props) {
  return (
    <div css={styles}>
      {buttons.map((button) => (
        <Button key={button.value} {...button} />
      ))}
    </div>
  );
}
