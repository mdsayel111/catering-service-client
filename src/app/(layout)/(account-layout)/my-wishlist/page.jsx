"use client";

import NotData from "@/components/shared/no-data/NoData";
import Pagination from "@/components/shared/pagination/Pagination";
import ItemCard from "@/components/shared/product-card/ItemCard";
import config from "@/config";
import useAuthAxios from "@/hooks/useAuthAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems);
  const [products, setProducts] = useState([]);
  const axios = useAuthAxios();
  const itemsPerPage = config?.itemsPerPage;
  const totalPage = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    axios
      .get(
        "/product/get-by-ids?ids=" +
          wishlistItems?.map((item) => item)?.join(",")
      )
      .then((response) => {
        setProducts(response.data.data);
      });
  }, [wishlistItems]);
  return (
    <div className="w-full">
      <div className="w-full px-2">
        {products?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            <>
              {products.map((item, index) => (
                <ItemCard item={item} key={index} />
              ))}
            </>
          </div>
        ) : (
          <NotData text="Products" />
        )}
      </div>
      <div className="bg-white p-3 mx-5 rounded-sm">
        {totalPage > 1 && (
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
