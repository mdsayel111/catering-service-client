"use client";

import CartItems from "@/components/cart/cart-items/CartItems";
import OrderSummary from "@/components/cart/oredr-summary/OrderSummary";
import Address from "@/components/checkout/address/Address";
import Container from "@/components/shared/container/Container";
import TextInput from "@/components/shared/inputs/text-input/TextInput";
import SectionTitle from "@/components/shared/Titles/SectionTitle";
import useAxios from "@/hooks/useAxios";
import { removeAllCartItems } from "@/lib/redux/features/cartSlice";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const axios = useAxios();

  const user = useSelector((state) => state.auth?.user);
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(
    user?.firstName ? `${user.firstName} ${user.lastName}` : ""
  );
  const [phone, setPhone] = useState(user?.phone || "");
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [finalCartItems, setFinalCartItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!cartItems.length) {
        setFinalCartItems([]);
        setLoading(false);
        return;
      }

      const ids = [
        ...cartItems
          .filter((i) => i.type === "product")
          .map((i) => i.id),

        ...cartItems
          .filter((i) => i.type === "package")
          .flatMap((pkg) => pkg.ids || []),
      ];

      const { data: { data } } = await axios.get(
        `/client/cart-page?ids=${ids.join(",")}`
      );

      const allProducts = data?.products || [];

      // =========================
      // PRODUCTS
      // =========================
      const products = cartItems
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
      // PACKAGES
      // =========================
      const packages = cartItems
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

      setFinalCartItems([...products, ...packages]);
      setLoading(false);
    };

    getData();
  }, [cartItems]);

  const handleOrderNow = async () => {
    if (!fullName || !phone || !deliveryAddress?.address) {
      return toast.error("দয়া করে সব তথ্য পূরণ করুন");
    }

    try {
      await axios.post("/order", {
        user: {
          name: fullName,
          phone: phone,
        },
        address: {
          lat: deliveryAddress?.lat,
          long: deliveryAddress?.long,
          address: deliveryAddress?.address,
        },

        // ✅ FIXED: products field (item instead of product)
        products: finalCartItems
          .filter((i) => i.type === "product")
          .map((i) => ({
            item: i.item._id,
            quantity: i.quantity,
          })),

        // ✅ FIXED: packages must be array of arrays
        packages: finalCartItems
          .filter((i) => i.type === "package")
          .map((i) => [
            {
              items: i.items.map((p) => p._id),
              quantity: i.quantity,
            },
          ]),
      });

      toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে");

      dispatch(removeAllCartItems());
      router.push("/my-order");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const total = finalCartItems.reduce((acc, item) => {
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

  // =========================
  // UI
  // =========================
  return (
    <Container className="grid my-4 lg:my-10 grid-cols-1 sm:gap-6 lg:gap-10">
      <div className='grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 lg:gap-10'>
        <div>
          <CartItems cartItems={finalCartItems} loading={loading} hasRemove={false} hasDecrease={false} hasIncrease={false} />
          <OrderSummary
            handleCouponApply={() => { }}
            discount={0}
            shippingCharges={0}
            shippingCharge={0}
            subtotal={0}
            total={total}
            setShippingCharge={() => { }}
            couponCode={""}
            setCouponCode={() => { }}
            paymentMethod={""}
            setPaymentMethod={() => { }}
            containerClassName={"block lg:hidden"}
          />

          {finalCartItems.length > 0 && (
            <div className="mt-6 space-y-4">
              <SectionTitle title="ডেলিভারি তথ্য" />

              <TextInput
                label="পূর্ণ নাম"
                placeholder="পূর্ণ নাম লিখুন"
                value={fullName}
                setValue={setFullName}
              />

              <TextInput
                label="মোবাইল নম্বর"
                placeholder="মোবাইল নম্বর লিখুন"
                value={phone}
                setValue={setPhone}
              />

              <div>
                <p className={cn("text-xl font-semibold mb-2 lg:mb-4")}>
                  অবস্থান
                </p>

                <Address
                  setDeliveryAddress={setDeliveryAddress}
                  deliveryAddress={deliveryAddress}
                />
              </div>
              <button
                onClick={handleOrderNow}
                className="bg-black cursor-pointer lg:w-[400px] lg:mx-auto text-white hover:border hover:border-black text-sm font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition block mx-auto"
              >
                অর্ডার করুন
              </button>
            </div>
          )}
        </div>
        <OrderSummary
          handleCouponApply={() => { }}
          discount={0}
          shippingCharges={0}
          shippingCharge={0}
          subtotal={0}
          total={total}
          setShippingCharge={() => { }}
          couponCode={""}
          setCouponCode={() => { }}
          paymentMethod={""}
          setPaymentMethod={() => { }}
          containerClassName={"hidden lg:block"}
        />
      </div>

    </Container>
  );
}