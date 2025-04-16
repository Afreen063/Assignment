import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state: RootState) => state.Cart.items);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg transition-transform duration-300 z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black text-lg"
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto flex-grow space-y-4 h-[80vh]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-start gap-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded-md bg-gray-100"
              />
              <div className="flex flex-col w-full">
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </h4>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-semibold text-blue-600">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-700">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-white">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
