import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:gap-4">
          {/* Top section for mobile - Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:hidden">
            <Link to="/privacy" className="text-gray-600 hover:text-[#164ec8] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-[#164ec8] transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#164ec8] transition-colors">
              Contact
            </Link>
          </div>

          {/* Main footer content */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-center sm:text-left order-2 sm:order-1">
              © {currentYear} Connetz. All rights reserved.
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 order-1 sm:order-2">
              Made with <FaHeart className="text-red-500 animate-pulse" /> by Connetz Team
            </div>
            
            {/* Links - Hidden on mobile, shown on larger screens */}
            <div className="hidden sm:flex items-center space-x-6 order-3">
              <Link to="/privacy" className="text-gray-600 hover:text-[#164ec8] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-[#164ec8] transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-[#164ec8] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 