"use client";

import Button from "@/components/shared/button/Button";
import NotData from "@/components/shared/no-data/NoData";
import useAuthAxios from "@/hooks/useAuthAxios";
import { useEffect, useState } from "react";
import OrderCard from "./components/order-card/OrderCard";
import OrderDetails from "./components/order-details/OrderDetails";
import OrderItems from "./components/order-items/OrderItems";

const Orders = () => {
  const axios = useAuthAxios();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/client/orders");
        setData(response.data?.data?.orders);
        setSelectedOrder(response.data?.data?.orders[0]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);



  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {data?.length > 0 ? (
        <>
          <div className="w-full max-w-[350px] mx-auto space-y-6 lg:max-h-screen overflow-y-auto thin-scrollbar lg:pr-1.5">
            {data?.map((item, index) => (
              <OrderCard
                key={index}
                item={item}
                setSelectedOrder={setSelectedOrder}
                selectedOrder={selectedOrder}
              />
            ))}
          </div>
          <div className="w-full h-full overflow-hidden flex-col hidden lg:flex">
            <OrderDetails
              item={data?.find((item) => item._id === selectedOrder?._id)}
            />
            <OrderItems
              item={data?.find((item) => item._id === selectedOrder?._id)}
            />
          </div>
        </>
      ) : (
        <NotData text="No order found" containerClassName={"h-fit"} />
      )}
    </div>
  );
};

export default Orders;
