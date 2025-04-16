import { cartActions } from "@/services/redux/slices/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ProductCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  //---------------------useSelectors--------------------------
  const totalcartItems = useSelector((state: any) => state.Cart.items);

  //-------------------------------redux store-------------------------
  const dispatch = useDispatch();

  //----------------------useState------------------------------
  const [cartItem, setCartItem] = useState<any>();

  //------------------------functions---------------------------------
  const handleAdd = () => {
    dispatch(
      cartActions.addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
  };

  const handleIncrement = () => {
    dispatch(cartActions.increaseQuantity(item.id));
  };

  const handleDecrement = () => {
    if (cartItem?.quantity === 1) {
      dispatch(cartActions.removeFromCart(item.id));
    } else {
      dispatch(cartActions.decreaseQuantity(item.id));
    }
  };

  useEffect(() => {
    if (totalcartItems?.length > 0) {
      const cartItem = totalcartItems?.find(
        (product: any) => product.id === item.id
      );
      setCartItem(cartItem);
    }
  }, [totalcartItems]);
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
      {" "}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-blue-600 font-bold text-lg">
              ${item.price}
            </span>
            <span className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
              {item.category}
            </span>
          </div>
          {cartItem?.quantity > 0 ? (
            <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
              <button
                onClick={handleDecrement}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                -
              </button>
              <span className="text-md font-semibold">{cartItem.quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
