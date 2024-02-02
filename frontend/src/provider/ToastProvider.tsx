import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { TAuthContext, TToast } from "../lib/types";

export const ToastContext = createContext<TAuthContext>({
  toast: {
    text: "",
    color: "",
  },
  setToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const timerId = useRef<NodeJS.Timeout>();
  const [toast, setToast] = useState<TToast>({
    text: "",
    color: "",
  });

  useEffect(() => {
    if (toast.text) {
      if (timerId.current) {
        timerId.current = undefined;
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => {
        setToast({ text: "", color: "" });
      }, 2000);
    }

    return () => clearTimeout(timerId.current);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      <div
        className={`${toast.text ? "shrink-0" : "hidden"}
        transition-all duration-500 text-md font-medium overflow-scroll scroll-m-0
        shadow-md border-[1px] border-dashed border-gray-500
        flex items-center rounded-md absolute bottom-4 flex-wrap text-ellipsis
        right-4 max-w-[220px] h-12 bg-gray-200 p-2 bg-${toast.color}
        `}
      >
        {toast.text}
      </div>
    </ToastContext.Provider>
  );
};
