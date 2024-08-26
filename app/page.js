"use client";
import { Tag, Pagination } from "antd";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { DeleteQuote } from "./_utilsfunctions/deletequote";
import { FetchQuotes } from "./_utilsfunctions/FetchQuotes";
import { GetQuotesCount } from "./_utilsfunctions/GetQuotesCount";
import { GradientText } from "text-gradients";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  const [page, setPage] = useState(1);
  const [quotes, setQuotes] = useState([]);
  const [quotecount, SetQuoteCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    const response = await FetchQuotes(page);

    if (response.success) {
      setQuotes(response.quote);
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
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
    const response = await GetQuotesCount();
    if (response.success) {
      SetQuoteCount(response.count);
    } else {
      toast.error(response.message);
    }
  }

  useEffect(() => {
    fetchData();
    GetCount();
  }, [page]);

  return (
    <main>
      {loading ? (
        <div className="flex gap-2 items-center justify-center mt-10">
          <GradientText
            color="bluepink"
            direction="top left"
            className="text-4xl font-extrabold "
          >
            Loading
          </GradientText>
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      ) : quotes?.length > 0 ? (
        <div className="flex justify-center flex-col items-center gap-y-6">
          <div className="h-[500px] w-full flex flex-col items-center gap-y-6 mt-10 overflow-auto">
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
                className="bg-slate-900 p-3 flex gap-y-1 gap-x-2 rounded-lg w-1/2 justify-between "
              >
                <div>
                  <p className="text-xl ">{q.quote}</p>
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
          </div>
          <Pagination
            className="bg-white"
            onChange={(value) => {
              setPage(value);
            }}
            defaultCurrent={page}
            total={quotecount}
            pageSize={4}
          />
        </div>
      ) : (
        <p>No quotes available.</p>
      )}
    </main>
  );
}
