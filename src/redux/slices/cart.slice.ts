import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/redux/store";
import { HTTP_METHOD } from "next/dist/server/web/http";
import { hydrate } from "@/redux/util";

type CommonStateStatus = {
  value: "idle" | "pending" | "rejected" | "fulfilled";
  message?: string;
};

type CartState = {
  items: CartItems;
  status: CommonStateStatus;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartItems = {
  [key: string]: CartItem;
};

const initialState: CartState = {
  items: {} as CartItems,
  status: { value: "idle" },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartActionPending(state) {
      state.status = { value: "pending" };
    },
    cartActionDone(state) {
      state.status = { value: "idle" };
    },
    cartAddItem(state, action: PayloadAction<CartItem>) {
      state.items = {
        ...state.items,
        [action.payload.id]: action.payload,
      };
    },
    cartRemoveItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      delete state.items[id];
    },
    cartEmpty(state) {
      state.items = initialState.items;
      state.status = initialState.status;
    },
    cartRestore(state, action: PayloadAction<CartItems>) {
      state.items = action.payload;
    },
    cartUpdateItem(state, action: PayloadAction<CartItem>) {
      const { id, quantity } = action.payload;
      state.items[id].quantity = quantity;
    },
    cartRefresh(state, action: PayloadAction<CartItem[]>) {
      const dbItems = action.payload.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as CartItems);
      const newItems = { ...state.items, ...dbItems };
      state.items = newItems;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(cartAdd.pending, cartSlice.caseReducers.cartActionPending)
      .addCase(cartAdd.fulfilled, cartSlice.caseReducers.cartActionDone)
      .addCase(cartAdd.rejected, (state, action) => {
        const id = action.meta.arg;
        delete state.items[id];
        state.status = { value: "idle", message: action.error.message };
      })
      .addCase(cartRemove.pending, cartSlice.caseReducers.cartActionPending)
      .addCase(cartRemove.fulfilled, cartSlice.caseReducers.cartActionDone)
      .addCase(cartRemove.rejected, (state, action) => {
        const { id, quantity } = action.meta.arg;
        state.items[id] = { id, quantity };
        state.status = { value: "idle", message: action.error.message };
      })
      .addCase(cartClear.pending, cartSlice.caseReducers.cartActionPending)
      .addCase(cartClear.fulfilled, cartSlice.caseReducers.cartActionDone)
      .addCase(cartUpdate.pending, cartSlice.caseReducers.cartActionPending)
      .addCase(cartUpdate.fulfilled, cartSlice.caseReducers.cartActionDone)
      .addCase(cartUpdate.rejected, (state, action) => {
        const { id, quantity } = action.meta.arg;
        state.items[id].quantity = quantity;
        state.status = { value: "idle", message: action.error.message };
      })
      .addCase(cartLoad.pending, cartSlice.caseReducers.cartActionPending)
      .addCase(cartLoad.fulfilled, cartSlice.caseReducers.cartActionDone)
      .addCase(cartLoad.rejected, (state, action) => {
        state.status = { value: "idle", message: action.error.message };
      })
      .addCase(hydrate, (state, action) => ({
        ...state,
        ...action.payload.cart,
      }));
  },
});

function cartRequest(
  method: HTTP_METHOD,
  value: {
    userId: string;
    bookId?: number;
    quantity?: number;
    items?: CartItem[];
  }
) {
  const queryParams = new URLSearchParams({
    userId: value.userId,
    bookId: value.bookId + "" || "",
  }).toString();
  return fetch(`/api/cart?${queryParams}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body:
      method === "DELETE" || method === "GET"
        ? undefined
        : JSON.stringify(value),
  })
    .then((res) => res.json())
    .then(({ data, message, error }) => {
      // if error, revert changes
      if (error) throw message;

      return data;
    });
}

export const cartAdd = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cart/cartAdd", async (id, { dispatch, getState }) => {
  const userId = getState().user.id;
  const isLoggedIn = !!userId;
  const item = { id, quantity: 1 };

  // add item to redux store optimistically
  await dispatch(cartSlice.actions.cartAddItem(item));

  // if not logged in, return
  if (!isLoggedIn) return;

  // if logged in, send request to server
  await cartRequest("POST", { userId, bookId: id, quantity: 1 });
});

export const cartRemove = createAsyncThunk<
  void,
  {
    id: number;
    quantity: number;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cart/cartRemove", async ({ id, quantity }, { dispatch, getState }) => {
  const userId = getState().user.id;
  const isLoggedIn = !!userId;

  // remove item from redux store optimistically
  await dispatch(cartSlice.actions.cartRemoveItem(id));

  // if not logged in, return
  if (!isLoggedIn) return;

  // if logged in, send request to server
  await cartRequest("DELETE", { userId, bookId: id });
});

export const cartClear = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cart/cartClear", async (_, { dispatch, getState }) => {
  const userId = getState().user.id;
  const isLoggedIn = !!userId;
  const cartItems = getState().cart.items;

  // clear items from redux store optimistically
  await dispatch(cartSlice.actions.cartEmpty());

  // if not logged in, return
  if (!isLoggedIn) return;

  try {
    // if logged in, send request to server
    await cartRequest("PUT", { userId });
  } catch (error) {
    await dispatch(cartSlice.actions.cartRestore(cartItems));
  }
});

export const cartUpdate = createAsyncThunk<
  void,
  { id: number; quantity: number },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cart/cartUpdate", async ({ id, quantity }, { dispatch, getState }) => {
  const userId = getState().user.id;
  const isLoggedIn = !!userId;

  if (quantity === 0) {
    await dispatch(cartRemove({ id, quantity }));
    return;
  }

  // update item in redux store optimistically
  await dispatch(cartSlice.actions.cartUpdateItem({ id, quantity }));

  // if not logged in, return
  if (!isLoggedIn) return;

  // if logged in, send request to server
  await cartRequest("PATCH", { userId, bookId: id, quantity });
});

export const cartLoad = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("cart/cartLoad", async (_, { dispatch, getState }) => {
  const userId = getState().user.id;
  const isLoggedIn = !!userId;
  const initCartItems = getState().cart.items;

  if (!isLoggedIn) return;

  // if logged in, send request to server
  const items: CartItem[] = await cartRequest("GET", { userId });

  // update items in redux store
  await dispatch(cartSlice.actions.cartRefresh(items));

  try {
    const newItems = Object.values(getState().cart.items);
    // batch update items in server
    await cartRequest("PUT", { userId, items: newItems });
  } catch (error) {
    await dispatch(cartSlice.actions.cartRestore(initCartItems));
  }
});

export const selectCartStatus = ({ cart: { status } }: RootState) => status;

const selectCartItemsMap = ({ cart: { items } }: RootState) => items;

export const selectCartItems = createSelector([selectCartItemsMap], (items) =>
  Object.values(items)
);

export const selectCartItemsCount = createSelector([selectCartItems], (items) =>
  items.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectIsItemInCart = (id?: number) => (state: RootState) =>
  !id ? false : !!state.cart.items[id];

export const selectItemQuantity = (id?: number) => (state: RootState) => {
  if (!id) return 0;
  return state.cart.items[id]?.quantity || 0;
};

export default cartSlice;
