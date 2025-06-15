"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem, CartItem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartAnimation, setCartAnimation] = useState(false);
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

  // const addToCart = (item: MenuItem) => {
  //   const existingItem = cart.find((cartItem) => cartItem._id === item._id);
  //   let newCart: CartItem[];

  //   if (existingItem) {
  //     newCart = cart.map((cartItem) =>
  //       cartItem._id === item._id
  //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //         : cartItem
  //     );
  //   } else {
  //     newCart = [...cart, { ...item, quantity: 1 }];
  //   }

  //   setCart(newCart);
  //   localStorage.setItem("cart", JSON.stringify(newCart));
  //   toast({
  //     title: "Added to cart",
  //     description: `${item.name} has been added to your cart`,
  //   });
  // };

  const addToCart = (item: MenuItem) => {
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
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });

    // Trigger animation
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/ezeats-logo.png"
            alt="EZ Eats Logo"
            width={100}
            height={100}
            className="object-cover"
          />
          {/* <h1 className="text-2xl font-bold tracking-wide">EZFOOD</h1> */}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-red-500 font-semibold px-4 py-2 rounded-full shadow hover:bg-red-100 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/details/${item._id}`} className="block">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-64 object-cover"
                />
              </Link>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <Badge variant="secondary" className="capitalize">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-500">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => addToCart(item)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Plus size={16} className="mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {cartItemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`transition-transform duration-300 ${
              cartAnimation ? "scale-110" : "scale-100"
            }`}
          >
            <Button
              onClick={() => router.push("/checkout")}
              className="bg-red-500 hover:bg-red-600 rounded-full h-16 px-6 shadow-lg"
            >
              <ShoppingCart size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm">View Cart</div>
                <div className="text-xs opacity-90">
                  {cartItemCount} items • ${cartTotal.toFixed(2)}
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
