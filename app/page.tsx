import Image from "next/image";
import TailwindCard from "../components/card";
import Search from "../components/search";
import List from "../components/list";
import Button from "../components/form-button";
import Login from "./login/page";
import CreateAccount from "./create-account/page";
import Link from "next/link";
import SocialLogin from "@/components/social-login";

export default function Home() {
  return (
    <main className = "h-screen items-center dark:justify-center py-10 dark:bg-gray-700">
      {
        <div>
          <p><Link href="/login">로그인</Link></p>
          <p><Link href="/create-account">계정생성</Link></p>
          <Login></Login>
          <CreateAccount></CreateAccount>
        </div>
      }
    </main>
  )
}
