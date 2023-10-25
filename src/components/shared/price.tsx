import { useAppSelector } from "@/hooks/types";
import { selectLocationPrice } from "@/redux/slices/location.slice";

type Props = {
  value: number;
};

export default function Price({ value }: Props) {
  const price = useAppSelector(selectLocationPrice(value));
  return <>{price}</>;
}
