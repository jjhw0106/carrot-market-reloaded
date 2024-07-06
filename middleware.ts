import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import { boolean } from "zod";


// index signature
interface Routes {
  [key: string]: boolean
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true
}

// middlewre는 페이지 마다 한번 실행이 아닌, 매 요청마다 실행이 된다.
export async function middleware(request: NextRequest) {
  console.log("this is middleware!!");
  // const pathname = request.nextUrl.pathname;
  // if(pathname ==="/") {
  //   // .next()는 User에게 전달할 response를 줌
  //   const response = NextResponse.next();
  //   response.cookies.set("middleware-cookie", "hello");
  //   console.log(response);
  //   return response;
  // }
  // console.log("!!!!!!!!!")
  // if(pathname ==="/profile") {
  //   console.log(1);
  //   return Response.redirect(new URL("/test", request.url));
  // }
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname]
  if(!session.id) {
    if(!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } 
  else {
    if(exists) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

// 원하는 페이지에서만 미들웨어를 호출하고 싶을 경우 config 사용
// 명칭은 반드시 config여야 한다.
export const config = {
  matcher: [/* "/","/profile","/create-account", "/user/:path*", */ "/((?!api|_next/static|_next/image|favicon.ico).*)"]
}