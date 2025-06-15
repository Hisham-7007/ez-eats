import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Paymob configuration
const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY || "your-paymob-api-key";
const PAYMOB_INTEGRATION_ID =
  process.env.PAYMOB_INTEGRATION_ID || "your-integration-id";

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);
    if (!authResult.success) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items, total } = await request.json();

    // Step 1: Get authentication token from Paymob
    const authResponse = await fetch(
      "https://accept.paymob.com/api/auth/tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: PAYMOB_API_KEY,
        }),
      }
    );

    const authData = await authResponse.json();
    const authToken = authData.token;

    // Step 2: Create order
    const orderResponse = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_token: authToken,
          delivery_needed: false,
          amount_cents: Math.round(total * 100), // Convert to cents
          currency: "EGP",
          items: items.map((item: any) => ({
            name: item.name,
            amount_cents: Math.round(item.price * item.quantity * 100),
            description: item.description,
            quantity: item.quantity,
          })),
        }),
      }
    );

    const orderData = await orderResponse.json();

    // Step 3: Get payment key
    const paymentKeyResponse = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_token: authToken,
          amount_cents: Math.round(total * 100),
          expiration: 3600,
          order_id: orderData.id,
          billing_data: {
            apartment: "NA",
            email: authResult.user?.email || "customer@example.com",
            floor: "NA",
            first_name: "Customer",
            street: "NA",
            building: "NA",
            phone_number: "NA",
            shipping_method: "NA",
            postal_code: "NA",
            city: "NA",
            country: "NA",
            last_name: "User",
            state: "NA",
          },
          currency: "EGP",
          integration_id: PAYMOB_INTEGRATION_ID,
        }),
      }
    );

    const paymentKeyData = await paymentKeyResponse.json();

    // Return payment URL for redirect
    const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/930456?payment_token=${paymentKeyData.token}`;

    return NextResponse.json({
      paymentUrl,
      orderId: orderData.id,
      paymentToken: paymentKeyData.token,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { message: "Failed to create payment" },
      { status: 500 }
    );
  }
}
