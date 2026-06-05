"use client";
import StatsCard from "@/components/dashboard/stats-card/StatsCard";
import useAuthAxios from "@/hooks/useAuthAxios";
import { useEffect, useState } from "react";
import { FaCheck, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function page() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [stats, setStats] = useState({});
  const axios = useAuthAxios();
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/stats/user-stats");
        setStats(response.data?.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 max-sm:gap-2 text-center">
      <StatsCard
        stats={{
          title: "Total Orders",
          value: stats.totalOrders || 0,
          icon: FaStar,
        }}
      />
      <StatsCard
        stats={{
          title: "Product in Cart",
          value: cartItems.length,
          icon: FaShoppingCart,
        }}
      />
      <StatsCard
        stats={{
          title: "My Wishlist",
          value: cartItems.length,
          icon: FaHeart,
        }}
      />
    </div>
  );
}
