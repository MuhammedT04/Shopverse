import { useState } from "react";

import { LogOut, Menu, X, Settings, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../store/slice/adminSlice";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login')
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/admin" className="font-bold text-xl text-gray-800">
            Naturo Admin
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
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
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a
                href="/admin"
                className="text-gray-700 hover:text-gray-900 flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Dashboard
              </a>
              <a
                href="/"
                className="text-gray-700 hover:text-gray-900 flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                View Store
              </a>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900 flex items-center text-left"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
