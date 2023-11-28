/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import useSWR from "swr";
import { IButton } from "@/components/shared/button/index.button";
import { ModalContext } from "@/context/modal/modal.context";
import { CartIcon } from "@/icons";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/util";
import {
  cartAdd,
  cartRemove,
  selectCartStatus,
  selectIsItemInCart,
  selectItemQuantity,
} from "@/redux/slices/cart.slice";
import { isDev } from "@/utils/constants";
import { IContentItem } from "@/components/shared/content/content-item";
import { IContentData } from "@/context/rating/rating.context";

export type IContent = IContentItem & {
  publisher?: string;
  copies_sold?: number;
  foreword_author_title?: string;
  foreword_author_name?: string;
  foreword_content?: string;
  summary?: string;
  publish_date?: string;
};

export default function useContent(
  type: IContentData["type"],
  item?: IContent
) {
  const { toggleModal, modalData } = useContext(ModalContext);
  const contentId = modalData?.id;
  const { data, isLoading } = useSWR<{ data: IContent }>(
    !item && contentId ? `/api/${type}s/${contentId}` : null
  );
  const content = item ?? data?.data;
  const dispatch = useAppDispatch();
  const isInCart = useAppSelector(selectIsItemInCart(content?.id));
  const cartItemQuantity = useAppSelector(selectItemQuantity(content?.id));
  const cartStatus = useAppSelector(selectCartStatus);
  const router = useRouter();
  const isBook = type === "book";
  const headerTitle = isBook ? "His Best Selling Book" : "His Latest Message";
  const headerSubtitle = isBook ? "A live changing read" : "Fresh manner";
  const getTypeButtons = () => {
    if (!content) return [];
    const buttons = [
      {
        key: `see more ${type}s`,
        value: `See More ${type}s`,
        className: "rounded",
        outlined: true,
        onClick: () => {
          toggleModal();
          router.push({
            pathname: `/${type}s`,
            query: {
              target: `more${type}s`,
            },
          });
        },
      },
    ] as IButton[];

    if (isBook && isDev)
      buttons.push({
        key: isInCart ? "remove from cart" : "add to cart",
        value: isInCart ? "Remove From Cart" : "Add To Cart",
        className: "rounded",
        Icon: CartIcon,
        onClick: () =>
          isInCart
            ? dispatch(
                cartRemove({ id: content.id, quantity: cartItemQuantity })
              )
            : dispatch(cartAdd(content.id)),
        disabled: !content.id || cartStatus.value === "pending",
        isLoading: cartStatus.value === "pending",
      } as IButton);
    else if (!isBook)
      buttons.push({
        key: `listen`,
        value: `Listen`,
        className: "rounded",
        disabled: !content.id,
        onClick: () => window.open(content.audio_url, "_blank"),
      } as IButton);

    return buttons;
  };

  return {
    isLoading,
    isBook,
    content,
    headerTitle,
    headerSubtitle,
    typeButtons: getTypeButtons(),
    toggleModal,
  };
}
