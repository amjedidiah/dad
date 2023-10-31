import Rating from "../rating";
import Price from "../price";
import { useContext, useMemo } from "react";
import { IButton } from "../button/index.button";
import { ModalContext } from "@/context/modal/modal.context";
import { ModalTitles } from "@/context/modal/types";
import { CartIcon } from "@/icons";
import {
  cartAdd,
  cartRemove,
  selectCartStatus,
  selectIsItemInCart,
  selectItemQuantity,
} from "@/redux/slices/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/util";
import ButtonGroup from "../button/button-group";
import { cx } from "@emotion/css";
import ShouldRender from "../should-render";
import Image from "next/image";
import { isDev } from "@/utils/constants";

type Props = {
  price?: number;
  average_rating?: number;
  title: string;
  type: string;
  id: number;
  audio_url?: string;
  isLoading: boolean;
  back_cover?: string;
  front_cover: string;
  duration?: string;
  recorded_at?: string;
};

export default function ContentItem({
  title,
  type,
  id,
  audio_url,
  isLoading,
  ...rest
}: Props) {
  const { toggleModal } = useContext(ModalContext);
  const isBook = type === "book";
  const isInCart = useAppSelector(selectIsItemInCart(id));
  const cartItemQuantity = useAppSelector(selectItemQuantity(id));
  const cartStatus = useAppSelector(selectCartStatus);
  const dispatch = useAppDispatch();

  const typeButtons: IButton[] = useMemo(() => {
    const buttons = isBook
      ? ([
          {
            key: `view reviews`,
            value: `View Reviews`,
            className: "rounded",
            outlined: true,
            onClick: () => toggleModal(ModalTitles.content),
          },
        ] as IButton[])
      : [];

    if (isBook && isDev)
      buttons.push({
        key: isInCart ? "remove from cart" : "add to cart",
        value: isInCart ? "Remove From Cart" : "Add To Cart",
        className: "rounded",
        Icon: CartIcon,
        onClick: () =>
          isInCart
            ? dispatch(cartRemove({ id, quantity: cartItemQuantity }))
            : dispatch(cartAdd(id)),
        disabled: !id || cartStatus.value === "pending",
        isLoading: cartStatus.value === "pending",
      } as IButton);
    else if (!isBook)
      buttons.push({
        key: `listen`,
        value: `Listen`,
        className: "rounded",
        onClick: () => window.open(audio_url, "_blank"),
      } as IButton);

    return buttons;
  }, [
    audio_url,
    cartItemQuantity,
    cartStatus.value,
    dispatch,
    id,
    isBook,
    isInCart,
    toggleModal,
  ]);

  return (
    <li key={title}>
      <div className="grid gap-6 border border-secondGrey p-4">
        <div
          className={cx(
            {
              "h-[2.94in] mdx:h-[4.2in]": isBook,
              "h-[1.96in] mdx:h-[2.8in]": !isBook,
            },
            "w-[1.96in] mdx:w-[2.8in] relative group rounded mx-auto"
          )}
        >
          <ShouldRender if={isLoading}>
            <div className="w-full h-full animate-pulse bg-greyLoading rounded" />
          </ShouldRender>
          <ShouldRender if={!isLoading}>
            <Image
              src={rest.front_cover}
              alt="front cover"
              className={cx({ "group-hover:hidden": isBook })}
              fill
              sizes="100%"
            />
            <ShouldRender if={isBook && !!rest.back_cover}>
              <Image
                src={rest.back_cover as string}
                alt="back cover"
                className="hidden group-hover:block"
                fill
                sizes="100%"
              />
            </ShouldRender>
          </ShouldRender>
        </div>
        <div className="flex flex-wrap items-center justify-between font-medium theme-text gap-4">
          <div className="grid gap-2 w-full">
            <ShouldRender if={!title}>
              <p className="w-40 h-8 bg-greyLoading animate-pulse" />
            </ShouldRender>
            <ShouldRender if={!!title}>
              <p className="text-2xl leading-8">{title}</p>
            </ShouldRender>
            <ShouldRender if={isBook}>
              {rest.average_rating ?? <Rating value={rest.average_rating} />}
            </ShouldRender>
            <ShouldRender if={!isBook}>
              <p className="flex flex-wrap justify-between items-center">
                {rest.recorded_at ? (
                  <span>
                    {new Date(rest.recorded_at).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                ) : (
                  <span className="h-5 w-32 flex-1 animate-pulse bg-greyLoading rounded" />
                )}
                {rest.duration ? (
                  <span>{rest.duration}</span>
                ) : (
                  <span className="h-5 w-60 flex-1 animate-pulse bg-greyLoading rounded" />
                )}
              </p>
            </ShouldRender>
          </div>
          {rest.price && (
            <p className="leading-5">
              <Price value={rest.price} />
            </p>
          )}
        </div>
        <ButtonGroup
          className="flex-wrap [&.flex-wrap]:gap-4 [&_button]:flex-1 [&_button]:h-full"
          buttons={typeButtons}
        />
      </div>
    </li>
  );
}
