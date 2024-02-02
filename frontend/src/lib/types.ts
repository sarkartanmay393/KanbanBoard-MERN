import { Dispatch, SetStateAction } from "react";

export type TToast = {
  text: string;
  color: "red-200" | "green-200" | "";
};

export type TAuthContext = {
  toast: TToast;
  setToast: Dispatch<SetStateAction<TToast>>;
};
