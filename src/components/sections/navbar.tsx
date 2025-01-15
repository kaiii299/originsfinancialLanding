import { useState } from "react";
import { LuAlignRight, LuX } from "react-icons/lu"; // Import Lucide icons
import {  navItems } from "@/lib/constants";

const bgColor = "bg-[#fbfcf5]";
const bgColorMobile = "bg-whitesmoke";
const textColor = "text-black";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get the current URL path
  const currentPath = window.location.pathname;

  return (
    <nav className={`${bgColor} ${textColor} sticky top-0 z-50`}>
      <div className="px-4 sm:px-6 lg:px-8 py-5 w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a className="flex items-center justify-center space-x-2 cursor-pointer" href="/">
            <img
              src={'src/assets/logo.svg'}
              title={"logo"}
              alt="logo"
              className="h-full w-full"
              loading={"eager"}
              draggable="false"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`hover:bg-main px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentPath === item.href ? "bg-main text-white" : ""
                  } ${textColor}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="-mr-2 flex md:hidden">
            <button
              id="menu-button"
              className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:${textColor} focus:outline-none`}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <LuAlignRight className="h-6 w-6 hover:text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-full ${bgColorMobile} ${textColor} transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-end items-center px-4 py-4 mt-1 mr-1">
          <button
            id="close-menu"
            className="text-gray-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LuX className="h-6 w-6 hover:text-black" />
          </button>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block hover:bg-primary hover:text-white px-3 py-2 rounded-md text-base font-medium ${
                currentPath === item.href ? "bg-main text-white" : ""
              } ${textColor}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;