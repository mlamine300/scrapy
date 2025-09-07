"use client";
import React from "react";
import { useModalContext } from "./Modal";

const TrackButton = () => {
  const { openModal } = useModalContext();

  return (
    <button
      onClick={openModal}
      className="w-full p-5 bg-stone-950 text-slate-50 text-xl font-semibold hover:bg-stone-400 rounded-full mt-10 cursor-pointer"
    >
      Track
    </button>
  );
};

export default TrackButton;
