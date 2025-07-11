import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  Star,
  ArrowRight,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo1 } from "@/components/ui/LogoShowcase";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "home", href: "/home" },
    { name: "About Us", href: "/home" },
    { name: "Contact", href: "/home" },
    { name: "Reservations", href: "/home" },
    { name: "Catering", href: "/home" },
    { name: "Gift Cards", href: "/home" },
  ];

  const categories = [
    { name: "Appetizers", href: "/home?category=appetizers" },
    { name: "Main Courses", href: "/home?category=mains" },
    { name: "Desserts", href: "/home?category=desserts" },
    { name: "Beverages", href: "/home?category=beverages" },
    { name: "Chef's Special", href: "/home?category=special" },
    { name: "Healthy Options", href: "/home?category=healthy" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-500",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-500",
    },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Logo1 />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Serving delicious, authentic cuisine with love and passion since
              2020. Every dish tells a story of tradition and innovation.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`bg-white/10 backdrop-blur-sm p-3 rounded-full ${social.color} hover:bg-white/20 transition-all duration-300 transform hover:scale-110`}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">4.9 (2,847 reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
              Menu Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-transparent bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-300">
                    123 Flavor Street
                    <br />
                    Giza, Egypt 12345
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-300">+20 1055679094</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-2 rounded-lg">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-300">hisham@letseats.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-lg">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-300">
                    Mon-Thu: 11:00 AM - 10:00 PM
                    <br />
                    Fri-Sat: 11:00 AM - 11:00 PM
                    <br />
                    Sun: 12:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Free Delivery</h4>
            <p className="text-gray-400 text-sm">On orders over 100 EGP</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Quality Guarantee</h4>
            <p className="text-gray-400 text-sm">Fresh ingredients daily</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-400 text-sm">We're here to help</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <p>&copy; {currentYear} Hisham Ibrahim. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
