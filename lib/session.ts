import { cookies } from 'next/headers';
import { getIronSession } from "iron-session";

interface SessionCookie {
  id?: number,
}

export default async function getSession() {
  return await getIronSession<SessionCookie> (cookies(), {
    cookieName: "cookies_name2",
    password: process.env.COOKIE_PASSWORD!
  });
}