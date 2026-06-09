
"use client";
import OrderSummary from '@/components/cart/oredr-summary/OrderSummary';
import ProductGroup from '@/components/packages/ProductGroup';
import Container from '@/components/shared/container/Container';
import SectionTitle from '@/components/shared/Titles/SectionTitle';
import useAxios from '@/hooks/useAxios';
import useGetData from '@/hooks/useGetData';
import Link from 'next/link';
import { useState } from 'react';

export default function Package() {
  const axios = useAxios();
  const res = useGetData(axios, "/client/packages-page", [
    "packages-product-groups",
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const total = selectedItems.reduce((sum, item) => {
    return sum + (item.packagePrice || 0);
  }, 0);
  return (
    <Container className={"pt-2 md:pt-4 lg:pt-8 pb-6 md:pb-8 lg:pb-14"}>

      <div className='grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 lg:gap-10'>
        <div>
          <div className='border rounded p-4'>
            <SectionTitle
              title={"আপনার প্যাকেজ তৈরী করুন "}
              className={"mb-3"}
            />
            {
              res?.data?.categoriesWithProducts?.map((item, index) => {
                return (
                  <ProductGroup item={item} key={index} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                )
              })
            }
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
            containerClassName={"block lg:hidden"}
          />
          {
            selectedItems.length > 0 && <div className="mt-4 mb-6 justify-between gap-4  flex">
              <Link
                href={"/products"}
                className="text-black cursor-pointer hover:bg-black hover:text-white text-sm font-semibold py-3 px-6 rounded border border-black transition text-nowrap"
              >
                কার্টে যোগ করুন
              </Link>
              <Link
                href="/checkout"
                className="bg-black cursor-pointer text-white hover:border hover:border-black text-sm font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition text-nowrap"
              >
                চেকআউট করুন
              </Link>
            </div>
          }
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
  )
}
