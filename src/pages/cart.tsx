import Button from "@/components/shared/button/index.button";
import RootLayout from "@/components/shared/layout/root-layout";
import Rating from "@/components/shared/rating";
import SectionHeader from "@/components/shared/section-header";
import ShouldRender from "@/components/shared/should-render";
import { useAppDispatch, useAppSelector } from "@/hooks/types";
import { DeleteIcon } from "@/icons";
import {
  cartUpdate,
  selectCartItems,
  selectCartStatus,
} from "@/redux/slices/cart.slice";
import { cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { CldOgImage } from "next-cloudinary";
import Image from "next/image";
import { IconContext } from "react-icons";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import useSWR from "swr";

type CartItem = {
  title: string;
  rating: number;
  price: number;
  quantity: number;
  imageUrl: string;
};

export default function Cart() {
  const {
    isDarkMode,
    colors: { white, secondGrey },
  } = useTheme();
  const items = useAppSelector(selectCartItems);
  const cartIsLoading = useAppSelector(selectCartStatus).value === "pending";
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useSWR<{
    data: any[];
    message: string;
    error: boolean;
  }>(items.length ? "/api/books/get" : null, (arg: any) =>
    fetch(arg, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: items.map((item) => item.id) }),
    }).then((res) => res.json())
  );
  const prunedData = (data?.data || []).map((item) => ({
    id: item.id,
    title: item.title,
    rating: item.average_rating,
    price: item.price,
    imageUrl: item.front_cover,
  }));
  const cartItems = items.map((item) => ({
    ...item,
    ...prunedData?.find(({ id }: any) => id == item.id),
  }));
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (acc, item) => acc + (item.quantity * item.price || 0),
    0
  );
  const requestError = data?.error || !!error;

  return (
    <RootLayout
      title="Cart | Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      description="Welcome to your personalized cart"
    >
      <CldOgImage src="v1694259792/dr-passy-og-image_v2xnww.png" alt="og" />
      <section className="load-in py-5">
        <div className="container">
          <SectionHeader
            title="Cart"
            subtitle="Welcome to your personalized cart"
            pageTitle
          />

          <article className="flex flex-wrap gap-16 xl:gap-32 mt-8">
            <div className="flex-1 grid gap-6">
              <ShouldRender if={!!cartItems.length || isLoading}>
                {(cartItems.length
                  ? cartItems
                  : Array.from({ length: 3 }).fill(0)
                ).map((item: any) => (
                  <div
                    key={item.id || Math.random()}
                    className="flex flex-wrap border border-greyLighter p-6 gap-8"
                  >
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
                            <h4 className="text-2xl font-medium">
                              {item.title}
                            </h4>
                          </ShouldRender>
                          <Rating value={item.rating} />
                        </div>
                        <ShouldRender if={isLoading}>
                          <p className="w-16 h-10 animate-pulse bg-greyLoading rounded" />
                        </ShouldRender>
                        <ShouldRender if={!isLoading}>
                          <p className="text-2xl font-medium">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(item.price || 0)}
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
                ))}
              </ShouldRender>
              <ShouldRender
                if={
                  (requestError && !isLoading && !cartItems.length) ||
                  (requestError && !isLoading && !cartItems.length)
                }
              >
                <div className="flex flex-col items-center justify-center h-fit p-8">
                  <IconContext.Provider
                    value={{
                      size: "7.5rem",
                      color: isDarkMode ? white : secondGrey,
                    }}
                  >
                    <div>
                      <AiOutlineShoppingCart />
                    </div>
                  </IconContext.Provider>
                  <p
                    className={cx({
                      "text-white": isDarkMode && !requestError,
                      "text-secondGrey": !isDarkMode && !requestError,
                      "text-red-500": requestError,
                    })}
                  >
                    {requestError
                      ? "Error loading cart "
                      : "Add items to your cart to see them here"}
                  </p>
                </div>
              </ShouldRender>
            </div>
            <ShouldRender if={!!cartItems.length && !isLoading}>
              <div className="min-w-full lgx:min-w-[392px] border border-greyLighter h-fit p-4 theme-text">
                <h4 className="text-[2rem] font-medium leading-8">
                  Cart Summary
                </h4>
                <div className="grid mt-8 mb-10 gap-4">
                  <p
                    className={cx(
                      {
                        "text-greyLighter": isDarkMode,
                        "text-grey1": !isDarkMode,
                      },
                      "flex items-center justify-between text-2xl font-medium"
                    )}
                  >
                    <span>Total Qty</span>
                    <span>{totalQty}</span>
                  </p>
                  <p
                    className={cx(
                      {
                        "text-greyLighter": isDarkMode,
                        "text-grey1": !isDarkMode,
                      },
                      "flex items-center justify-between text-2xl font-medium"
                    )}
                  >
                    <span>Total Cost</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(totalCost)}
                    </span>
                  </p>
                </div>
                <Button
                  key="checkout"
                  value="Checkout"
                  className="rounded w-full py-4 px-8 text-xl leading-6"
                />
              </div>
            </ShouldRender>
          </article>
        </div>
      </section>
    </RootLayout>
  );
}
