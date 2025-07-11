"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { CartItem } from "@/lib/types";
import Image from "next/image";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   router.push("/");
    //   return;
    // }

    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }

    const newCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total: total,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("cart");
        setCart([]);

        window.location.href = data.paymentUrl;
      } else {
        toast({
          title: "Payment Error",
          description: data.message || "Failed to process payment",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => router.push("/home")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-lg opacity-90">Review your order</p>
      </header>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg"
                >
                  <Image
                    src={item.image || "/placeholder.svg?height=80&width=80"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1 w-full">
                    <div className="flex justify-between w-full">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="font-semibold text-right sm:text-left mt-2 sm:mt-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <Plus size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item._id)}
                        className="ml-2 text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-12 bg-red-500 hover:bg-red-600 text-lg"
          >
            {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/home")}
            className="w-full"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
