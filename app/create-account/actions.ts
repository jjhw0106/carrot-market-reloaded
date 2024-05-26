"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG } from "@/lib/constants";
import {z} from "zod";

function validateUsername(username:string) {
  return !username.includes("potato");
}

function validatePassword(object: { password:string, password_confirm:string}) {
  return object.password === object.password_confirm ? true : false;
}

const accountSchema = 
z.object({
  email: z.string({}).email(),
  user_name: z.string()
    .toLowerCase()
    .trim()
    .min(5).max(10) 
    .refine(validateUsername, "no potato")
    .transform(username=>`${username}fuck`),
  password: z.string().min(PASSWORD_MIN_LENGTH, "password는 4자 이상 적어주세요").regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG),
  password_confirm: z.string()
})
  .refine(validatePassword, {
    message:"both should be same",
    path: ["password_confirm"]
  })

export async function createAccount(prevState:any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    user_name: formData.get('user_name'),
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm')
  };
  const result = accountSchema.safeParse(data);
  if(!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data)
  }


  /* parse는 에러를 던져주지만, safeParse를 사용할 경우 throw없이 result로 받을 수 있다. */
  // try {
  //   accountSchema.parse(data);
  // } catch(e) {
  //   console.log(e);
  // }
}