import Button from "@/components/button";
import FormButtonInterface from "@/components/button";
import Input from "@/components/inputs/input";
import SocialLogin from "@/components/social-login";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Input type="number" name="phone" placeholder="Phone number" required errors={["필수 입력"]} />
          <Input type="number" name="code" placeholder="Verification Code" required errors={["필수 입력"]} />
        </div>
        <Button text="Verify" ></Button>
      </form> 
    </div>
  )
}