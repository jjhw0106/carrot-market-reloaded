import Image from "next/image";
import TailwindCard from "./components/card";
import Search from "./components/search";
import List from "./components/list";
import Button from "./components/button";
import Login from "./components/login/login";
import CreateAccount from "./components/login/create-account";

export default function Home() {
  return (
    <main className = "h-screen items-center dark:justify-center py-10 dark:bg-gray-700">
      {/* <Button></Button>
      <Search></Search>
      <TailwindCard></TailwindCard>
      <List></List> */}
      <Login></Login>
      <CreateAccount></CreateAccount>
    </main>
  )
}
