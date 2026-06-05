import Container from "@/components/shared/container/Container";
import fetchData from "@/utils/fetch";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatCreatedAt(date) {
  if (!date) return null;
  const d = new Date(date);
  const day = ordinal(d.getDate()); // e.g. "24th"
  const month = d.toLocaleString("en-US", { month: "short" }); // "Nov"
  const year = d.getFullYear(); // 2021
  return `${day} ${month},${year}`; // -> "24th Nov,2021"
}

export default async function page() {
  const { data } = (await fetchData("/client/blog-page",  { cache: "no-store" })) || {};
  const blogs = data?.blogs || [];

  return (
    <Container>
      <div class="container max-w-7xl rounded mx-auto px-3 my-12">
        <div  className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {blogs?.map((item, index) => (
            <div class=" shadow-2xl text-center">
              <div>
                <Image
                  src={item?.image}
                  width={400}
                  height={400}
                  alt=""
                  className="w-full aspect-[3/2] object-cover"
                />
              </div>
              <div class="p-4">
                <h2 class="text-[16px] transition duration-200 hover:text-[#ff2631] mb-2 lg:text-[20px] font-bold">
                  {item?.title}
                </h2>
                <p class="text-[16px] mb-4 font-normal text-[#687083]">
                  {item?.shortDescription}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/blog/${item?._id}`}
                    class="transition duration-200 hover:text-[#ff2631] text-[14px] font-bold"
                  >
                    + READ MORE
                  </Link>
                  <p class="font-normal text-[14px] text-[#687083]">
                    {formatCreatedAt(item?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
