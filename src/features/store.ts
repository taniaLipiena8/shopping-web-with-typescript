import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./cart/cartSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    carts: cartsReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;
