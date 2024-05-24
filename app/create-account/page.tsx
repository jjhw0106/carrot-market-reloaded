"use client";

import Input from "../../components/inputs/input";
import SocialLogin from "../../components/social-login";
import Button from "../../components/button";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  console.log("state");
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
        {/* state 확인 */}
        {/* { state?.email && typeof state.email === 'string' 
          ? <h2 className="text-xl">{state.email}</h2> 
          : null } */}
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <div>
          <Input 
            type="email" 
            placeholder="Email" 
            required 
            name={"email"} 
            errors={state?.fieldErrors.email} 
          />
          <Input 
            type="text" 
            placeholder="User Name" 
            required 
            name={"user_name"} 
            errors={state?.fieldErrors.user_name} 
            minLength={5}
            maxLength={10}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            required 
            name={"password"} 
            errors={state?.fieldErrors.password} 
          />
          <Input 
            type="password"
            placeholder="Password Confirm" 
            required 
            name={"password_confirm"} 
            errors={state?.fieldErrors.password_confirm} 
          />
        </div>
        <Button text="Create Account"></Button>
      </form> 
      <SocialLogin></SocialLogin>
    </div>
  )
}

export default CreateAccount;