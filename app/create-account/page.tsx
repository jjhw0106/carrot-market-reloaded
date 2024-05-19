import { ChatBubbleLeftRightIcon } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftEllipsisIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { BeakerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import FormInput from "../../components/inputs/form-input";
import SocialLogin from "../../components/social-login";
import FormButton from "../../components/form-button";

function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div>
          <FormInput type="email" placeholder="Email" required errors={["필수 입력"]} name={""} />
          <FormInput type="text" placeholder="User Name" required errors={["필수 입력"]} name={""} />
          <FormInput type="password" placeholder="Password" required errors={["필수 입력"]} name={""} />
          <FormInput type="password" placeholder="Password Confirm" required errors={["필수 입력"]} name={""} />
        </div>
        <FormButton text="Create Account"></FormButton>
      </form> 
      <SocialLogin></SocialLogin>
    </div>
  )
}

export default CreateAccount;