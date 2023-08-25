/** @jsxImportSource @emotion/react */
import Button, { IButton } from "@/components/shared/button";
import styles from "@/styles/button-group.style";

type Props = {
  buttons: IButton[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ButtonGroup({ buttons, ...rest }: Props) {
  return (
    <div css={styles} {...rest}>
      {buttons.map(({ key, ...rest }) => (
        <Button key={key} {...rest} />
      ))}
    </div>
  );
}
