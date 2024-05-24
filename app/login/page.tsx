"use client";
import Button from "@/components/button";
import FormButtonInterface from "@/components/button";
import Input from "@/components/inputs/input";
import SocialLogin from "@/components/social-login";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { handleForm } from "./actions";

function Login() {

  /* 
    기존의 api를 활용한 routing,
    클라이언트 컴포넌트("use client")로 만든 후, 
    데이터 패칭 이벤트를 만들어서 자식 컴포넌트에 전달 해야 한다. 
  */
  // const onClick = async () => {
  //   const response = await fetch("/api/users", {
  //     method:"POST", 
  //     body: JSON.stringify({username:"nico", password:"1234"})
  //   })
  //   console.log(await response)
  // };
  const [state, action] = useFormState(handleForm, {msg: 'error'} as any)

  return(
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Input type="email" name="email" placeholder="Email" required/>
          <Input type="password" name="password" placeholder="Password Confirm" required />
        </div>
        <Button text="Log In"></Button>
      </form> 
      <SocialLogin></SocialLogin>
    </div>
  )
}

export default Login;