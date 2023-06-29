/** @jsxImportSource @emotion/react */
import Button, { ButtonProps } from "@/components/shared/button";
import styles from "@/styles/button-group.style";

type Props = {
  buttons: ButtonProps[];
};

export default function ButtonGroup({ buttons }: Props) {
  return (
    <div css={styles}>
      {buttons.map(({ key, ...rest }) => (
        <Button key={key} {...rest} />
      ))}
    </div>
  );
}
