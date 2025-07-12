"use client";

import React, { useState, useEffect } from "react";
import { LogOut, Menu, X, User, Bell, Settings, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Logo1 } from "./LogoShowcase";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/");
  };

  const navItems = [
    { label: "Home", href: "/home", active: true },
    { label: "Menu", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header
      className={`mb-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20"
          : "bg-gradient-to-r from-orange-300 via-pink-100 to-purple-400 shadow-2xl"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <a href="/home">
              <div className="flex items-center gap-4">
                <Logo1 />
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full font-medium transition-all duration-200 group ${
                    item.active
                      ? "text-purple-600 bg-white/50 shadow-sm"
                      : "text-gray-700 hover:text-purple-600 hover:bg-white/30"
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-purple-200 rounded-full opacity-50 -z-10"></div>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <button className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 group">
              <Search
                size={20}
                className="text-gray-800 group-hover:text-purple-600"
              />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-purple-600">
                  Hisham
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Hisham</p>
                    <p className="text-sm text-gray-500">admin@hisham.com</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Settings size={16} />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl rounded-2xl mt-2 mb-4 shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    item.active
                      ? "text-purple-600 bg-gradient-to-r from-orange-50 to-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Hisham</p>
                  <p className="text-sm text-gray-500">admin@hisham.com</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
