import { ReactElement, MutableRefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: ReactElement }) {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (!modalRoot || !elRef.current) return;

    modalRoot.appendChild(elRef.current);

    return () => {
      elRef.current && modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(children, elRef.current);
}
