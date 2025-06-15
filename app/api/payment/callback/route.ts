import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify payment callback from Paymob
    if (body.success === "true") {
      // Payment successful - redirect to success page
      return NextResponse.redirect(new URL("/success", request.url));
    } else {
      // Payment failed - redirect to checkout with error
      return NextResponse.redirect(
        new URL("/checkout?error=payment_failed", request.url)
      );
    }
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json(
      { message: "Callback processing failed" },
      { status: 500 }
    );
  }
}
