"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateQuotefunction } from "../_utilsfunctions/createquotefunction";

const Create = () => {
  const [quote, setQuote] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();

  async function handleCreateQuote(e) {
    e.preventDefault();

    try {
      const result = await CreateQuotefunction(quote, tag);

      if (result.success) {
        toast.success("Quote created successfully");
        setQuote("");
        setTag("");
        router.push("/");
      } else {
        toast.error(result.message || "An error occurred");
      }
    } catch (error) {
      toast.error("Failed to create quote. Please try again.");
    }
  }

  return (
    <main className="w-1/2 m-auto mt-10 flex items-center  h-[450px]">
      <div className="flex flex-col w-full gap-y-10 justify-center items-center ">
        <textarea
          placeholder="Enter Quote"
          className="rounded-md text-black p-2 w-full h-[120px] resize-none"
          onChange={(e) => setQuote(e.target.value)}
          value={quote}
        ></textarea>

        <input
          placeholder="Author"
          className="rounded-md text-black w-1/2  p-2"
          onChange={(e) => setTag(e.target.value)}
          value={tag}
        ></input>

        <button
          className="addbtn w-[10%]  rounded-md p-2"
          onClick={handleCreateQuote}
        >
          Post
        </button>
      </div>
    </main>
  );
};

export default Create;
