import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { formatVND } from "@/utils/format";
import { useState, useEffect } from "react";

const SingleItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  // Sync state with prop if it changes externally
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  const handleIncreaseQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(item.id, newQty);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQuantity(item.id, newQty);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex items-center justify-center rounded-[10px] bg-gray-3 w-16 h-16 flex-shrink-0 overflow-hidden border border-gray-100">
          <Image 
            src={item.imgs?.thumbnails[0] || "/images/product/product-01.png"} 
            alt="product" 
            width={64} 
            height={64} 
            className="object-cover h-full w-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-dark text-sm mb-1 truncate hover:text-blue transition-colors">
            <a href="#"> {item.title} </a>
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">{formatVND(item.discountedPrice)}</p>
        </div>
      </div>

      {/* Quantity Controls - Horizontal */}
      <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200 h-8">
        <button 
          onClick={handleDecreaseQuantity} 
          className="w-6 h-full flex items-center justify-center hover:text-blue transition-colors text-sm font-bold disabled:opacity-30"
          disabled={quantity <= 1}
        >
          -
        </button>
        <div className="w-8 text-center text-xs font-bold pointer-events-none select-none">
          {quantity}
        </div>
        <button 
          onClick={handleIncreaseQuantity} 
          className="w-6 h-full flex items-center justify-center hover:text-blue transition-colors text-sm font-bold"
        >
          +
        </button>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleRemoveFromCart}
        aria-label="button for remove product from cart"
        className="flex items-center justify-center rounded-lg w-8 h-8 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red flex-shrink-0"
      >
        X
      </button>
    </div>
  );
};

export default SingleItem;
