import Button from "@/components/shared/button/Button";
import { cn } from "@/utils/cn";
// import { getCartItems } from '@/utils/get-cart-details';

const OrderItems = ({ containerClassName, item }) => {
  const products = item?.products || [];
  return (
    <div
      className={cn(
        "bg-white border  h-fit  overflow-x-auto  w-[100vw-2rem] lg:w-full thin-scrollbar",
        containerClassName
      )}
    >
      <div className={cn("w-full flex flex-col h-full")}>
        {/* Table Header */}
        <div className="bg-gray-50 rounded-t-xl p-4 md:p-6 flex justify-between items-center text-gray-500 font-medium border-b border-gray-200">
          <div className="text-sm md:text-base ">Image</div>
          <div className="text-sm md:text-base text-center grow">Item</div>
          <div className="text-sm md:text-base w-14 md:w-20 text-center">
            Quantity
          </div>
          <div className="text-sm md:text-base w-16 md:w-16 text-right">
            Price
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200 grow overflow-y-auto thin-scrollbar">
          {products.map((product) => (
            <div key={product.id} className="p-4 md:p-6 flex items-center">
              <div className="flex-grow flex items-center space-x-4">
                <img
                  src={product?.product?.image}
                  alt={product?.product?.name}
                  className="w-12 h-12 rounded-lg"
                />
                <div className="lg:grow">
                  <div className="font-semibold text-center  text-gray-800 text-sm md:text-base">
                    {product?.product?.title}
                  </div>
                </div>
              </div>

              {/* Quantity Column (visible on all screen sizes) */}
              <div className="flex-shrink-0 w-14 md:w-20 text-center text-gray-700 font-medium">
                <div className="text-sm md:text-base">{product.quantity}</div>
              </div>

              {/* Price Column */}
              <div className="flex-shrink-0 w-16 md:w-16 text-right text-gray-700 font-medium text-sm md:text-base">
                {product?.product?.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
