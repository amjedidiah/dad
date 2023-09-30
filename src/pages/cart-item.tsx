import Button from "@/components/shared/button/index.button";
import Rating from "@/components/shared/rating";
import ShouldRender from "@/components/shared/should-render";
import { useAppDispatch, useAppSelector } from "@/hooks/types";
import { DeleteIcon } from "@/icons";
import { cartUpdate, selectCartStatus } from "@/redux/slices/cart.slice";
import { cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { PrunedCartItem } from "./cart";
import Price from "@/components/shared/price";

type CartItemProps = {
  isLoading: boolean;
  item: PrunedCartItem;
};

export default function CartItem({ isLoading, item }: CartItemProps) {
  const { isDarkMode } = useTheme();
  const cartIsLoading = useAppSelector(selectCartStatus).value === "pending";
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-wrap border border-greyLighter p-6 gap-8">
      <ShouldRender if={isLoading}>
        <div className="w-[2.45in] h-[3.675in] animate-pulse bg-greyLoading rounded" />
      </ShouldRender>
      <ShouldRender if={!isLoading}>
        <div className="w-[2.45in] h-[3.675in] relative group border border-danger">
          <Image
            src={item.imageUrl || "/images/book.png"}
            alt={item.title || "Book"}
            fill
            sizes="100%"
          />
        </div>
      </ShouldRender>
      <div className="min-w-[320px] flex flex-col flex-1 gap-16 justify-between">
        <div className="flex gap-8 justify-between theme-text">
          <div className="grid gap-4 flex-1">
            <ShouldRender if={isLoading}>
              <div className="w-44 h-8 animate-pulse bg-greyLoading rounded" />
            </ShouldRender>
            <ShouldRender if={!isLoading}>
              <h4 className="text-2xl font-medium">{item.title}</h4>
            </ShouldRender>
            <Rating value={item.rating} />
          </div>
          <ShouldRender if={isLoading}>
            <p className="w-16 h-10 animate-pulse bg-greyLoading rounded" />
          </ShouldRender>
          <ShouldRender if={!isLoading}>
            <p className="text-2xl font-medium">
              <Price value={item.price} />
            </p>
          </ShouldRender>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-8 items-center">
            <p
              className={cx(
                {
                  "text-greyLighter": isDarkMode,
                  "text-black": !isDarkMode,
                },
                "text-2xl font-medium "
              )}
            >
              Qty
            </p>
            <p className="flex gap-4">
              <Button
                key="cart-minus"
                value={(<AiOutlineMinus />) as any}
                className="group [&_span.text]:text-2xl"
                noIcon
                disabled={isLoading || cartIsLoading}
                onClick={() =>
                  dispatch(
                    cartUpdate({
                      id: item.id,
                      quantity: item.quantity - 1,
                    })
                  )
                }
              />
              <ShouldRender if={!isLoading}>
                <span
                  className={cx(
                    {
                      "text-greyLighter": isDarkMode,
                      "text-white": !isDarkMode,
                    },
                    "py-1 px-4 font-medium text-2xl theme-text"
                  )}
                >
                  {item.quantity}
                </span>
              </ShouldRender>
              <ShouldRender if={isLoading}>
                <span className="w-10 h-10 animate-pulse bg-greyLoading rounded" />
              </ShouldRender>
              <Button
                key="cart-plus"
                value={(<AiOutlinePlus />) as any}
                className="group [&_span.text]:text-2xl "
                noIcon
                disabled={isLoading || cartIsLoading}
                onClick={() =>
                  dispatch(
                    cartUpdate({
                      id: item.id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
              />
            </p>
          </div>
          <Button
            key="cart-remove"
            value={(<DeleteIcon />) as any}
            className="group [&_span.text]:text-2xl "
            noIcon
            outlined
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
