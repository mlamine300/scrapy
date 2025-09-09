"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { ExitButton, useModalContext } from "./Modal";
import { HiOutlineEnvelope, HiXMark } from "react-icons/hi2";
import { addUserEmailToProduct } from "../lib/actions";

const TrackModal = ({ id }: { id: string }) => {
  const [email, setEmail] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { closeModal } = useModalContext();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);
    await addUserEmailToProduct(id, email);
    setIsSubmiting(false);
    closeModal();
  };
  return (
    <form className="flex flex-col gap-2 w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-row justify-between  my-2">
        <Image src={"/images/logo.png"} alt="log" width={40} height={40} />
        <ExitButton className="bg-transparent">
          <HiXMark className="w-8 h-8 text-gray-500" />
        </ExitButton>
      </div>
      <h3 className="text-lg font-medium text-stone-900">
        Stay updated with product pricing alerts right in your inbox!
      </h3>
      <p className="text-base text-stone-500">
        Never miss a bargain again with our timely alerts!
      </p>
      <p className="text-sm text-stone-700 mt-4">Email address</p>
      <div className="flex flex-row gap-2 border rounded-full border-stone-900/30 text-stone-900/60 px-3 py-2 items-center">
        <HiOutlineEnvelope className="w-5 h-5" />
        <input
          type="email"
          required
          className="w-full border-none outline-none"
          placeholder="contact@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmiting}
        className="w-full p-3 bg-stone-950 text-slate-50 text-base font-semibold hover:bg-stone-400 rounded-xl mt-5 cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed"
      >
        {isSubmiting ? "Submiting..." : "Track Product"}
      </button>
    </form>
  );
};

export default TrackModal;
