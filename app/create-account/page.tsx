"use client";

import FormInput from "../../components/inputs/form-input";
import SocialLogin from "../../components/social-login";
import FormButton from "../../components/form-button";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
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
          <FormInput type="email" placeholder="Email" required name={"email"} />
          <FormInput type="text" placeholder="User Name" required name={"user_name"} />
          <FormInput type="password" placeholder="Password" required name={"password"} />
          <FormInput type="confirm" placeholder="Password Confirm" required name={"password_confirm"} />
        </div>
        <FormButton text="Create Account"></FormButton>
      </form> 
      <SocialLogin></SocialLogin>
    </div>
  )
}

export default CreateAccount;