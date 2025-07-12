"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Logo1 } from "@/components/ui/LogoShowcase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      console.log(data.token);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast({
          title: "Login successful",
          description: "Welcome to EZ EATS!",
        });
        setTimeout(() => {
          router.replace("/home");
        }, 100);
      } else {
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Branding Section */}
      <div className="md:w-1/2 bg-gradient-to-br from-red-400 to-pink-500 text-white flex flex-col items-center justify-center px-6 py-12">
        <Logo1 />
        <h1 className="text-4xl font-bold mb-2 pt-4">Welcome Back</h1>
        <p className="text-lg text-white/90 text-center">
          Login for a contactless dining experience
        </p>
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-12">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              📧 Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-gray-100 border border-gray-300 h-12 px-4 placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              🔒 Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-100 border border-gray-300 h-12 px-4 pr-12 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold rounded-lg transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-lg text-gray-400 mt-4">
            Demo Login: <span className="font-mono">admin@hisham.com</span> /{" "}
            <span className="font-mono animate-pulse text-pink-600 font-semibold">
              password123
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
