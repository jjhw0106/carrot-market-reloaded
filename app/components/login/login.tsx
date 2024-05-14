import Link from "next/link";

function Login() {
  return(
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto gap-2 flex flex-col items-center *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서 오세요!</h2>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Link href="/create-account" className="primary-btn py-2.5">시작하기 </Link>
        <div className="flex gap-3">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className=" hover:underline">로그인</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;