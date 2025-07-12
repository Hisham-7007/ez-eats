"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Minus,
  Heart,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem, CartItem } from "@/lib/types";
import Image from "next/image";

export default function ItemDetailsPage() {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  useEffect(() => {
    fetchItemDetails();
    loadCart();
  }, [params.id]);

  const fetchItemDetails = async () => {
    try {
      const response = await fetch(`/api/menu/${params.id}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setItem(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to load item details",
          variant: "destructive",
        });
        setTimeout(() => {
          router.replace("/home");
        }, 100); // تأخير بسيط للسماح للكوكي بالظهور للميدل وير
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      router.push("/home");
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

  const addToCart = async () => {
    if (!item) return;

    setAddingToCart(true);

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = cart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity }];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    toast({
      title: "Added to cart! 🎉",
      description: `${quantity} ${item.name}${
        quantity > 1 ? "s" : ""
      } added to your cart`,
    });

    // Trigger cart animation
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 600);
    setAddingToCart(false);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-200"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-orange-500 absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading delicious details...
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Item not found
          </h2>
          <p className="text-gray-600 mb-6">
            This delicious item seems to have wandered off!
          </p>
          <Button
            onClick={() => router.push("/home")}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 pt-12 md:pt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="bg-white/90 backdrop-blur-md hover:bg-white rounded-full shadow-lg border border-white/20 transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className="bg-white/90 backdrop-blur-md hover:bg-white rounded-full shadow-lg border border-white/20 transition-all duration-200 hover:scale-105"
          >
            <Heart
              size={20}
              className={`transition-colors duration-200 ${
                isFavorited ? "text-red-500 fill-red-500" : "text-gray-700"
              }`}
            />
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 z-10"></div>
          <Image
            src={item.image || "/placeholder.svg?height=600&width=600"}
            alt={item.name}
            fill
            priority
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-[2rem] mt-[-2rem] relative z-10 shadow-2xl">
        <div className="px-6 py-8 md:px-8 lg:px-10">
          {/* Item Info */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 leading-tight">
                  {item.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < 4
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (4.8) • 125 reviews
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">
                  {item.price.toFixed(2)} EGP
                </div>
                <div className="text-sm text-gray-500 line-through">
                  {(item.price * 1.2).toFixed(2)} EGP
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                🌱 Fresh
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                🔥 Popular
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                ⭐ Chef's Special
              </span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-800">
                  Quantity:
                </span>
                <div className="flex items-center bg-gray-50 rounded-full p-1 border-2 border-gray-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="rounded-full h-10 w-10 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Minus size={18} />
                  </Button>
                  <span className="text-xl font-bold mx-4 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increaseQuantity}
                    className="rounded-full h-10 w-10 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Plus size={18} />
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={addToCart}
              disabled={addingToCart}
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
            >
              {addingToCart ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Adding to Cart...
                </div>
              ) : (
                <>
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart • {(item.price * quantity).toFixed(2)} EGP
                </>
              )}
            </Button>
          </div>
        </div>
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
