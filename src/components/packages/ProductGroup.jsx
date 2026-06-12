import Image from 'next/image'
import TakaSymbol from '../shared/Taka-Symbol'
import { FaRegCircleCheck } from 'react-icons/fa6';

export default function ProductGroup({ item, selectedItems, setSelectedItems }) {
  const handleProductClick = (product) => {
    const index = selectedItems.findIndex((item) => item._id === product._id);
    if (index === -1) {
      setSelectedItems([...selectedItems, product]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item._id !== product._id));
    }
  };
  return (
    <div>
      <h4 className="text-base md:text-lg lg:text-xl font-semibold text-text-primary-color group-hover:text-secondary-color transition duration-200 mb-3">
        {item.category}
      </h4>
      <div className="flex flex-wrap gap-6 mt-4">
        {
          item.products.map((product, index) => {
            return (
              <div className="group" key={index}
                onClick={() => handleProductClick(product)}
              >
                <div className=" shadow-lg border border-green-400 cursor-pointer bg-gray-100 rounded-md overflow-hidden flex items-center justify-center p-2 relative">
                  {
                    selectedItems.find((item) => item._id === product._id)
                    && <div className='absolute w-full h-full bg-black/50 flex items-center justify-center'>
                      <FaRegCircleCheck className='text-white text-4xl' />
                    </div>
                  }
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md aspect-square object-cover w-12 h-12"
                  />
                </div>
                <p className="text-xs md:text-sm text-center text-text-primary-color mt-2 group-hover:text-secondary-color">
                  {product.title}
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
