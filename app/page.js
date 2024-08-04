"use client";

import { Tag } from "antd";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [quotes, setQuotes] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/quotescontroller/getquotes/${page}`
      );
      if (response.status === 200) {
        let data = await response.json();
        setQuotes(data.response);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function deletequote(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/quotescontroller/deletequote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("work");
        toast.success("deleted");
        fetchData();
      } else {
        toast.error("Failed to delete quote");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <main className="flex flex-col items-center justify-between p-10 gap-y-6">
      {quotes.length > 0 ? (
        quotes.map((q) => (
          <div
            key={q._id}
            className="bg-slate-900 p-3 flex gap-y-1 rounded-lg w-1/2 justify-between"
          >
            <div>
              <p className="text-xl">{q.quote}</p>
              <div>
                {console.log(q.tag)}
                {q.tag.map((t, index) => (
                  <Tag key={index} color="geekblue">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex gap-1">
              <FaEdit className="cursor-pointer" />
              <MdDelete
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  deletequote(q._id);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No quotes available.</p>
      )}
    </main>
  );
}
