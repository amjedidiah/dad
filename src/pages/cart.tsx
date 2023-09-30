import Button from "@/components/shared/button/index.button";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";
import ShouldRender from "@/components/shared/should-render";
import { useAppSelector } from "@/hooks/types";
import { selectCartItems } from "@/redux/slices/cart.slice";
import { cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { IconContext } from "react-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useSWR from "swr";
import CartItem from "./cart-item";
import Price from "@/components/shared/price";

export type PrunedCartItem = {
  id: number;
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
  const { data, isLoading, error } = useSWR<{
    data: any[];
    message: string;
    error: boolean;
  }>(items.length ? "/api/books/get-cart" : null, (arg: any) =>
    fetch(arg, {
      method: "POST",
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
      title="Cart - Dr Passy Amaraegbu | Living a life of purity, power and prosperity"
      description="Welcome to your personalized cart"
    >
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
                  <CartItem
                    key={item.id || Math.random()}
                    isLoading={isLoading}
                    item={item}
                  />
                ))}
              </ShouldRender>
              <ShouldRender
                if={
                  (requestError && !isLoading && !cartItems.length) ||
                  (!requestError && !isLoading && !cartItems.length)
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
                      <Price value={totalCost} />
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
