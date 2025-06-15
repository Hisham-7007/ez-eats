"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear cart on successful payment
    localStorage.removeItem("cart")
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Thank you for your order! Your payment has been processed successfully. You will receive a confirmation
            email shortly.
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push("/menu")} className="w-full bg-red-500 hover:bg-red-600">
              Order Again
            </Button>
            <Button variant="outline" onClick={() => router.push("/")} className="w-full">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
