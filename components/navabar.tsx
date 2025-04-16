"use client";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartSidebar from "./cart";

const Navbar = () => {
  const totalItems = useSelector((state: any) => state.Cart.items);

  //-------------------------useState------------------------
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //------------------functions-----------------------
  const calculateTotalQuantity = () => {
    const total = totalItems.reduce(
      (acc: any, item: any) => acc + item.quantity,
      0
    );
    return total;
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              ShopEasy
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/">
              <span>Home</span>
            </Link>
            <button
              className="relative inline-block"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="text-base font-medium text-gray-800">Cart</span>

              {totalItems?.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {calculateTotalQuantity()}
                </span>
              )}
            </button>
          </div>
          <CartSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
