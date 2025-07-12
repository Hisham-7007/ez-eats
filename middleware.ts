import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // ✅ إذا كان لديه توكن وحاول الدخول إلى /login → نحوله للصفحة الرئيسية
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ إذا لم يكن لديه توكن وحاول الدخول لأي صفحة غير /login → نحوله إلى صفحة /login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ باقي الحالات مسموحة
  return NextResponse.next();
}

// ✅ مطابقة جميع الصفحات التي تريد حمايتها
export const config = {
  matcher: ["/", "/checkout", "/login"], // أضف هنا أي صفحة محمية
};
