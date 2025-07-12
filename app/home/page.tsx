"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Plus,
  Star,
  Clock,
  MapPin,
  LogOut,
  ChefHat,
  Heart,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem, CartItem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Logo1 } from "@/components/ui/LogoShowcase";
import Navigation from "@/components/ui/Navigation";

export default function HomePage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartAnimation, setCartAnimation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const categories = ["all", "appetizers", "mains", "desserts", "beverages"];

  useEffect(() => {
    fetchMenuItems();
    loadCart();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else if (response.status === 401) {
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "Failed to load menu items",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = (item: MenuItem, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = cart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast({
      title: "Added to cart! 🎉",
      description: `${item.name} has been added to your cart`,
    });

    // Trigger animation
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 600);
  };

  const toggleFavorite = (itemId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFavoriteItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    localStorage.removeItem("token");

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-orange-200"></div>
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-orange-500 absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium text-lg">
            Preparing your feast...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 pb-32">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-300 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-">
          <div className="text-center mb-12">
            {/* Main Hero Content */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Delicious
                  <span className="text-gray-800"> awaits you</span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover our chef's finest creations, made with love and the
                freshest ingredients
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-full">
                    <ChefHat className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">150+</h3>
                <p className="text-gray-600">Delicious Dishes</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">4.9</h3>
                <p className="text-gray-600">Customer Rating</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-orange-500 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">15min</h3>
                <p className="text-gray-600">Average Prep Time</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7x1 mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for your favorite dish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/50 bg-white/80 backdrop-blur-sm shadow-lg focus:outline-none focus:border-orange-400 transition-all duration-300 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        {/* <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide w-full"> */}
        <div className="flex flex-wrap gap-2 mb-8 w-full">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`capitalize whitespace-nowrap rounded-3xl px-6 py-3 font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg transform scale-105"
                  : "bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Link key={item._id} href={`/details/${item._id}`}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-white/50 group cursor-pointer">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => toggleFavorite(item._id, e)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                    >
                      <Heart
                        size={18}
                        className={`${
                          favoriteItems.includes(item._id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600"
                        } transition-colors duration-200`}
                      />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm text-gray-800 font-medium px-3 py-1 capitalize"
                    >
                      {item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-600">
                        {item.price.toFixed(2)} EGP
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {(item.price * 1.2).toFixed(2)} EGP
                      </span>
                    </div>
                    <Button
                      onClick={(e) => addToCart(item, e)}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-3xl px-4 py-2 font-semibold shadow-lg transform hover:scale-110 transition-all duration-200"
                    >
                      <Plus size={18} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No dishes found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:right-6 md:w-auto">
          <div
            className={`transition-all duration-300 ${
              cartAnimation ? "scale-110 rotate-3" : "scale-100"
            }`}
          >
            <Button
              onClick={() => router.push("/checkout")}
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl h-16 px-6 shadow-2xl border-2 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart size={24} className="text-white" />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-white font-bold">View Cart</div>
                  <div className="text-white/90 text-sm">
                    {cartItemCount} items • {cartTotal.toFixed(2)} EGP
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
