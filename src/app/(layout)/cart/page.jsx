"use client";
import CartItems from "@/components/cart/cart-items/CartItems";
import OrderSummary from "@/components/cart/oredr-summary/OrderSummary";
import Container from "@/components/shared/container/Container";
import NotData from "@/components/shared/no-data/NoData";
import useAxios from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart?.cartItems);
  const axios = useAxios();

  const [paymentMethod, setPaymentMethod] = useState("online");

  const [finalCartItems, setFinalCartItems] = useState(Array(5).fill(null));
  const [shippingCharges, setShippingCharges] = useState([]);
  const [discountCoupons, setDiscountCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  // shipping charge logic
  const subtotal = finalCartItems?.reduce((acc, item) => {
    return acc + (item?.price || 0) * (item?.quantity || 0);
  }, 0);

  const [shippingCharge, setShippingCharge] = useState({});
  const total = subtotal + (shippingCharge?.charge || 0) - (discount || 0);

  const handleCouponApply = async () => {
    const discountPercentage = discountCoupons.find(
      (coupon) => coupon.couponCode === couponCode
    )?.percent;
    const totalDiscount = discountPercentage
      ? (discountPercentage / 100) * subtotal
      : 0;
    setDiscount(totalDiscount);
  };
  useEffect(() => {
    const getData = async () => {
      const {
        data: { data: dataFromApi },
      } = await axios.get(
        "/client/cart-page?ids=" + cartItems.map((item) => item.id).join(","),
        cartItems?.map((item) => item?.id)
      );
      if (cartItems.length > 0) {
        setFinalCartItems(
          dataFromApi?.products?.map((item) => {
            return {
              ...item,
              quantity: cartItems.find((cartItem) => cartItem.id === item._id)
                ?.quantity,
            };
          })
        );
      } else {
        setFinalCartItems([]);
      }
      if (dataFromApi?.shippingCharges?.length > 0) {
        setShippingCharges(dataFromApi?.shippingCharges);
      }

      if (dataFromApi?.discountCoupons?.length > 0) {
        setDiscountCoupons(dataFromApi?.discountCoupons);
      }
      setLoading(false);
    };
    getData();
  }, [cartItems]);

  return (
    <div>
      {finalCartItems.length > 0 ? (
        <Container
          className={
            "grid my-4 lg:my-10 grid-cols-1 md:gap-6 lg:gap-10  md:px-4 px-2"
          }
        >
          <div>
            <CartItems cartItems={finalCartItems} loading={loading} />
          </div>
          {/* <OrderSummary
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
          /> */}
        </Container>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <NotData text={"cart items"} />
        </div>
      )}
    </div>
  );
}
