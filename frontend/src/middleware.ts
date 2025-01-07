import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "./lib/utils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (token) {
    const response = await axiosInstance.post("/auth/is-valid-token", {
      token: token.value,
    });
    if (response?.status !== 200) {
      request.cookies.delete("token");
    }
  }

  try {
    return NextResponse.next();
  } catch (error) {
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)", // Protect all routes except static files
  ],
};
