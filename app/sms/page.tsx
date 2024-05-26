"use client";

import Button from "@/components/button";
import FormButtonInterface from "@/components/button";
import Input from "@/components/inputs/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { validateToken } from "./actions";


export default function SMSLogin() {
  const [state, dispatch] = useFormState(
    validateToken, null
  )
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <div className="flex flex-col gap-3">
          <Input type="number" 
            name="phone" 
            placeholder="Phone number" 
            required 
          />
          <Input type="number" 
            name="token" 
            placeholder="Verification Code" 
            required 
          />
        </div>
        <Button text="Verify" ></Button>
      </form> 
    </div>
  )
}