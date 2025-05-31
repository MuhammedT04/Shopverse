import { useState } from "react";

import { Search, ShoppingBag, User, Menu, X ,LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const {user} =useSelector((state)=>state.user)
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const handlLogout=()=>{
      dispatch(logout())
      navigate('/')
     }

  return (
    <header className="bg-[#f8f5f2] py-4 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-bold text-xl text-gray-800">
            Shops
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-800 hover:text-gray-600 text-sm">
              Home
            </a>
            <a
              href="/products"
              className="text-gray-800 hover:text-gray-600 text-sm"
            >
              Products
            </a>
            <a
              href="/about"
              className="text-gray-800 hover:text-gray-600 text-sm"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-800 hover:text-gray-600 text-sm"
            >
              Contact
            </a>
          </nav>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-6">
          {user ? (
             
              <LogOut className="h-5 w-8" onClick={handlLogout} />
          
          ):(
              <a href="/login" className="text-gray-800 hover:text-gray-600">
              <User className="h-5 w-8" />
            </a>
          )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-gray-800 hover:text-gray-600">
                Home
              </a>
              <a href="/products" className="text-gray-800 hover:text-gray-600">
                Products
              </a>
              <a href="/about" className="text-gray-800 hover:text-gray-600">
                About
              </a>
              <a href="/contact" className="text-gray-800 hover:text-gray-600">
                Contact
              </a>
            </nav>
            <div className="mt-4 flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-white rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex space-x-4">
                <a href="/login" className="text-gray-800 hover:text-gray-600">
                  <User className="h-5 w-5" />
                </a>
                <a href="/cart" className="text-gray-800 hover:text-gray-600">
                  <ShoppingBag className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
