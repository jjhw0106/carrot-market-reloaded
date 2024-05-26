"use client";

import Button from "@/components/button";
import FormButtonInterface from "@/components/button";
import Input from "@/components/inputs/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { renewToken, validateToken } from "./actions";



const initialState = {
  token:false,
  error: undefined
}
export default function SMSLogin() {
  const [state, dispatch] = useFormState(
    validateToken, initialState
  )
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <div className="flex flex-col gap-3">
          {state?.token ? 
          <Input 
            type="number" 
            name="token" 
            key={"token"} // key를 입력 안하면 phone component의 값이 그대로 남아있게 된다
            placeholder="Verification Code"
            required 
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          /> : 
          <Input 
            type="text" 
            name="phone"
            key={"phone"} 
            placeholder="Phone number" 
            required 
            errors={state.error?.formErrors}
          />}
        </div>
        <Button text={state.token ? "Verify" : "Send Verification SMS"} ></Button>
      </form> 
    </div>
  )
}