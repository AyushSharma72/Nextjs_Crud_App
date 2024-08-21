"use client";
import { Tag, Pagination } from "antd";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { DeleteQuote } from "./_utilsfunctions/deletequote";
import { GradientText } from "text-gradients";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  const [page, setPage] = useState(1);
  const [quotes, setQuotes] = useState([]);
  const [quotecount, SetQuoteCount] = useState(0);
  const [loading, setloading] = useState(true);

  async function fetchData() {
    setloading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/quotescontroller/getquotes/${page}`
      );
      if (response.status === 200) {
        let data = await response.json();
        setQuotes(data.response);
        setloading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setloading(false);
    }
  }

  async function deletequote(id, e) {
    e.preventDefault();
    const response = await DeleteQuote(id);

    if (response.success) {
      toast.success("deleted");
      fetchData();
    } else {
      toast.error(response.message);
    }
  }

  async function GetCount() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/quotescontroller/GetQuotesCount"
      );
      if (response.status === 200) {
        const data = await response.json();
        SetQuoteCount(data.QuotesCount);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("error in pagination");
    }
  }

  useEffect(() => {
    fetchData();
    GetCount();
  }, [page]);

  return (
    <main className="flex flex-col items-center justify-between p-10 gap-y-6">
      {loading ? (
        <div className="flex gap-2 items-center">
          <GradientText
            color="bluepink"
            direction="top left"
            className="text-4xl font-extrabold"
          >
            Loading
          </GradientText>
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : quotes?.length > 0 ? (
        <>
          <GradientText
            color="bluepink"
            direction="top left"
            className="text-4xl font-extrabold"
          >
            Quotes
          </GradientText>
          {quotes.map((q) => (
            <div
              key={q._id}
              className="bg-slate-900 p-3 flex gap-y-1 rounded-lg w-1/2 justify-between"
            >
              <div>
                <p className="text-xl">{q.quote}</p>
                <div>
                  <Tag color="geekblue">{q.tag}</Tag>
                </div>
              </div>
              <div className="flex gap-1">
                <FaEdit className="cursor-pointer" />
                <MdDelete
                  className="text-red-600 cursor-pointer"
                  onClick={(e) => {
                    deletequote(q._id, e);
                  }}
                />
              </div>
            </div>
          ))}
          <Pagination
            className="bg-white"
            onChange={(value) => {
              setPage(value);
            }}
            defaultCurrent={page}
            total={quotecount}
            pageSize={4}
          />
        </>
      ) : (
        <p>No quotes available.</p>
      )}
    </main>
  );
}
