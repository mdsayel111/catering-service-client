"use client";

import CartItems from "@/components/cart/cart-items/CartItems";
import OrderSummary from "@/components/cart/oredr-summary/OrderSummary";
import Container from "@/components/shared/container/Container";
import NotData from "@/components/shared/no-data/NoData";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const axios = useAxios();

  const [finalCartItems, setFinalCartItems] = useState([]);

  const [shippingCharges, setShippingCharges] = useState([]);
  const [discountCoupons, setDiscountCoupons] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const [shippingCharge, setShippingCharge] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("online");

  // =========================
  // COLLECT ALL PRODUCT IDS (product + package items)
  // =========================
  const productIds = [
    ...cartItems
      .filter((i) => i.type === "product")
      .map((i) => i.id),

    ...cartItems
      .filter((i) => i.type === "package")
      .flatMap((pkg) => pkg.ids || []),
  ];

  // =========================
  // SUBTOTAL
  // =========================
  const subtotal = finalCartItems.reduce((acc, item) => {
    if (item.type === "product") {
      return acc + (item.item?.price || 0) * (item.quantity || 0);
    }

    if (item.type === "package") {
      const packagePrice = item.items.reduce(
        (sum, p) => sum + (p?.packagePrice || 0),
        0
      );

      return acc + packagePrice * (item.quantity || 0);
    }

    return acc;
  }, 0);

  const total =
    subtotal +
    (shippingCharge?.charge || 0) -
    (discount || 0);

  // =========================
  // COUPON
  // =========================
  const handleCouponApply = () => {
    const percent = discountCoupons.find(
      (c) => c.couponCode === couponCode
    )?.percent;

    setDiscount(percent ? (percent / 100) * subtotal : 0);
  };

  // =========================
  // FETCH ALL PRODUCTS ONLY ONCE
  // =========================
  useEffect(() => {
    const getData = async () => {
      if (!cartItems.length) {
        setFinalCartItems([]);
        setLoading(false);
        return;
      }

      const {
        data: { data },
      } = await axios.get(
        `/client/cart-page?ids=${productIds.join(",")}`
      );

      const allProducts = data?.products || [];

      // =========================
      // BUILD PRODUCT ITEMS
      // =========================
      const productItems = cartItems
        .filter((i) => i.type === "product")
        .map((cartItem) => {
          const product = allProducts.find(
            (p) => p._id === cartItem.id
          );

          return {
            type: "product",
            item: product,
            quantity: cartItem.quantity,
          };
        });

      // =========================
      // BUILD PACKAGE ITEMS
      // =========================
      const packageItems = cartItems
        .filter((i) => i.type === "package")
        .map((pkg) => {
          const items = pkg.ids
            .map((id) =>
              allProducts.find((p) => p._id === id)
            )
            .filter(Boolean);

          return {
            type: "package",
            items,
            quantity: pkg.quantity,
          };
        });

      // =========================
      // MERGE
      // =========================
      setFinalCartItems([...productItems, ...packageItems]);

      setShippingCharges(data?.shippingCharges || []);
      setDiscountCoupons(data?.discountCoupons || []);

      setLoading(false);
    };

    getData();
  }, [cartItems]);

  // =========================
  // UI
  // =========================
  return (
    <div>
      {finalCartItems.length > 0 ? (
        <Container className="grid my-4 lg:my-10 grid-cols-1 md:gap-6 lg:gap-10 md:px-4 px-2">

          <div className="grid lg:grid-cols-[70%_30%] gap-6">

            <div>
              <CartItems
                cartItems={finalCartItems}
                loading={loading}
              />
              <OrderSummary
                handleCouponApply={handleCouponApply}
                discount={discount}
                shippingCharges={shippingCharges}
                shippingCharge={shippingCharge}
                subtotal={subtotal}
                total={total}
                setShippingCharge={setShippingCharge}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                containerClassName={"lg:hidden"}
              />

              <div className="mt-4 mb-6 justify-between gap-4  flex">
                <Link
                  href={"/products"}
                  className="text-black cursor-pointer hover:bg-black hover:text-white text-sm font-semibold py-3 px-6 rounded border border-black transition text-nowrap"
                >
                  কেনাকাটা চালিয়ে যান
                </Link>
                <Link
                  href="/checkout"
                  className="bg-black cursor-pointer text-white hover:border hover:border-black text-sm font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition text-nowrap"
                >
                  চেকআউট করুন
                </Link>
              </div>
            </div>

            <OrderSummary
              handleCouponApply={handleCouponApply}
              discount={discount}
              shippingCharges={shippingCharges}
              shippingCharge={shippingCharge}
              subtotal={subtotal}
              total={total}
              setShippingCharge={setShippingCharge}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              containerClassName={"hidden lg:block"}
            />

          </div>

        </Container>
      ) : (
        <NotData text="cart items" />
      )}
    </div>
  );
}