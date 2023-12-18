import { useContext } from "react";
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
import { IContentData } from "@/context/rating/rating.context";
import { IContentItem } from "@/components/shared/content/content-item";

export default function useContentItem({
  type,
  id,
  audio_url,
}: Pick<IContentItem, "id" | "audio_url"> & Pick<IContentData, "type">) {
  const { toggleModal } = useContext(ModalContext);
  const isBook = type === "book";
  const isInCart = useAppSelector(selectIsItemInCart(id));
  const cartItemQuantity = useAppSelector(selectItemQuantity(id));
  const cartStatus = useAppSelector(selectCartStatus);
  const dispatch = useAppDispatch();

  return {
    isBook,
    typeButtons: isBook
      ? [
          {
            key: `view details`,
            value: `View Details`,
            className: "rounded",
            outlined: true,
            onClick: () => toggleModal(ModalTitles.content, { id, type }),
          },
          {
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
          },
        ]
      : [
          {
            key: `listen`,
            value: `Listen`,
            className: "rounded",
            onClick: () => window.open(audio_url, "_blank"),
          },
        ],
  };
}
