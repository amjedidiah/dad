import { useAppSelector } from "@/redux/util";
import { selectLocationPrice } from "@/redux/slices/location.slice";

type Props = {
  value: number;
};

export default function Price({ value }: Props) {
  const price = useAppSelector(selectLocationPrice(value));
  return <span suppressHydrationWarning>{price}</span>;
}
