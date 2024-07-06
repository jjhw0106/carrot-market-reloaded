import db from "@/lib/db";
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if(session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id
      }
    });
    return user;
  }
  // 404 페이지 띄움, session 없을 경우 404로 라우팅
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    // inline server action
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/")
  }
  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      {/* button에 onClick을 사용하면 client 페이지로 만들어야 하며, form을 이용해서 서버컴포넌트로 유지할 수 있다.  */}
      <form action={logOut}>
        <button>Log out</button> 
      </form>
    </div>

  )
}