type Props = {
  children: React.ReactNode;
  if: boolean;
};

export default function ShouldRender({ children, if: condition }: Props) {
  return condition ? <>{children}</> : null;
}
