/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
type ModalContextType = {
  isShowed: boolean;
  closeModal: () => void;
  openModal: () => void;
};
const initValue: ModalContextType = {
  isShowed: false,
  closeModal: () => {},
  openModal: () => {},
};
const ModalContext = createContext<ModalContextType>(initValue);
const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) console.log("context use outside provider");
  return context;
};

const Modal = ({ children }: { children: any }) => {
  const [isShowed, setIsShowed] = useState(true);
  const closeModal = () => {
    setIsShowed(false);
  };
  const openModal = () => {
    setIsShowed(true);
  };

  return (
    <ModalContext.Provider value={{ isShowed, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

function ExitButton({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  const { closeModal } = useContext(ModalContext);
  return (
    <button
      className={twMerge("cursor-pointer p-2 rounded-full hover:bg-gray-200")}
      onClick={closeModal}
    >
      {children}
    </button>
  );
}
function ContentBox({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  const { isShowed, closeModal } = useModalContext();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside modal box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }

    if (isShowed) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowed, closeModal]);
  if (!isShowed) return;
  return (
    <>
      <div className="fixed inset-0 bg-gray-900/30 z-40"></div>
      <div
        ref={modalRef}
        className={twMerge(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg z-50",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

//Modal.ExitButton = ExitButton;
//Modal.ContentBox = ContentBox;
export { ExitButton, ContentBox, useModalContext };
export default Modal;
