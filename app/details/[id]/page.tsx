"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem, CartItem } from "@/lib/types";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function ItemDetailsPage() {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartAnimation, setCartAnimation] = useState(false);
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
        router.push("/menu");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      router.push("/menu");
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

  // const addToCart = () => {
  //   if (!item) return;

  //   const existingItem = cart.find((cartItem) => cartItem._id === item._id);
  //   let newCart: CartItem[];

  //   if (existingItem) {
  //     newCart = cart.map((cartItem) =>
  //       cartItem._id === item._id
  //         ? { ...cartItem, quantity: cartItem.quantity + quantity }
  //         : cartItem
  //     );
  //   } else {
  //     newCart = [...cart, { ...item, quantity }];
  //   }

  //   setCart(newCart);
  //   localStorage.setItem("cart", JSON.stringify(newCart));
  //   toast({
  //     title: "Added to cart",
  //     description: `${quantity} ${item.name}${
  //       quantity > 1 ? "s" : ""
  //     } added to your cart`,
  //   });
  // };
  const addToCart = () => {
    if (!item) return;

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
      title: "Added to cart",
      description: `${quantity} ${item.name}${
        quantity > 1 ? "s" : ""
      } added to your cart`,
    });

    // 🔥 Trigger cart animation
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const goBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Item not found
          </h2>
          <Button onClick={() => router.push("/menu")}>Back to Menu</Button>
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
    <div className="min-h-screen bg-gradient-to-b from-pink-400 to-pink-200 pb-0">
      <div className="relative p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          className="absolute top-4 left-4 z-10 bg-white/80 hover:bg-white rounded-full shadow-lg"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      {/* <div className="relative h-80 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
        <Image
          src={item.image || "/placeholder.svg?height=300&width=300"}
          alt={item.name}
          width={600}
          height={600}
          className="object-cover max-h-64 drop-shadow-2xl"
        />
      </div> */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg?height=300&width=300"}
          alt={item.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="bg-white rounded-t-3xl mt-[-20px] relative z-10 pt-6 min-h-[50vh]">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.name}</h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {item.description}
          </p>

          <div className="flex items-center gap-4 mb-8 pt-20">
            <div className="flex items-center border-2 border-gray-200 rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="rounded-full h-10 w-10"
              >
                <Minus size={16} />
              </Button>
              <span className="text-xl font-semibold mx-4 min-w-[2rem] text-center">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
                className="rounded-full h-10 w-10"
              >
                <Plus size={16} />
              </Button>
            </div>
            <Button
              onClick={addToCart}
              className="h-10 w-60 bg-red-500 hover:bg-red-600 text-white font-semibold py-6 rounded-full text-lg shadow-lg"
            >
              Add Item • {(item.price * quantity).toFixed(2)} EGP
            </Button>
          </div>
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
