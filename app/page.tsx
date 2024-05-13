import Image from "next/image";
import TailwindCard from "./components/card";
import Search from "./components/search";

export default function Home() {
  return (
    <main className = "h-screen items-center dark:justify-center py-10 dark:bg-gray-700">
      <Search></Search>
      <TailwindCard></TailwindCard>
    </main>
  )
}
