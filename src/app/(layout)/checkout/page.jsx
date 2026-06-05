"use client";

import Address from "@/components/checkout/address/Address";
import CartItems from "@/components/checkout/cart-items/CartItems";
import Container from "@/components/shared/container/Container";
import TextInput from "@/components/shared/inputs/text-input/TextInput";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import useAxios from "@/hooks/useAxios";
import { removeAllCartItems } from "@/lib/redux/features/cartSlice";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState(
    user?.firstName ? user?.firstName + " " + user?.lastName : ""
  );
  const [phone, setPhone] = useState(user?.phone || "");

  const cartItems = useSelector((state) => state.cart?.cartItems);
  const axios = useAxios();

  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const [finalCartItems, setFinalCartItems] = useState(Array(5).fill(null));

  const handleOrderNow = async () => {
    if (!fullName || !phone || !deliveryAddress?.address)
      return toast.error("দয়া করে সব তথ্য পূরণ করুন");
    try {
      await axios.post("/order", {
        products: finalCartItems?.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: deliveryAddress,
        user: {
          name: fullName,
          phone: phone,
        },
      });
      toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে");
      dispatch(removeAllCartItems());
      user?.phone ? router.push("/my-order") : router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
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
      setLoading(false);
    };
    getData();
  }, [cartItems]);


  return (
    <Container className="grid my-4 relative lg:my-10 grid-cols-1 sm:gap-6 lg:gap-10">
      <div>
        <CartItems finalCartItems={finalCartItems} loading={loading} />
        {finalCartItems?.length > 0 && (
          <div className="mt-6 space-y-4">
            <SectionTitle title="Shipping Information" />
            <TextInput
              label={"Full name"}
              placeholder={"Enter your name"}
              value={fullName}
              setValue={(val) => setFullName(val)}
            />
            <TextInput
              label={"Mobile number"}
              placeholder={"Enter your mobile number"}
              value={phone}
              setValue={(val) => setPhone(val)}
            />
            <div>
              <p className={cn("text-xl font-semibold mb-2 lg:mb-4")}>
                Location
              </p>
              <Address
                setDeliveryAddress={(val) => setDeliveryAddress(val)}
                deliveryAddress={deliveryAddress}
              />
            </div>
          </div>
        )}
      </div>
      {finalCartItems?.length > 0 && (
        <button
          onClick={handleOrderNow}
          className="bg-black cursor-pointer lg:w-[400px] lg:mx-auto text-white hover:border hover:border-black text-sm font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition text-nowrap"
        >
          Order Now
        </button>
      )}
    </Container>
  );
}
