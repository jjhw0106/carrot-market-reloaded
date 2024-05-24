"use server";
import {z} from "zod";

function validateUsername(username:string) {
  return !username.includes("potato");
}

function validatePassword(object: { password:string, password_confirm:string}) {
  return object.password === object.password_confirm ? true : false;
}

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
  );

const accountSchema = 
z.object({
  email: z.string({}).email(),
  user_name: z.string()
    .toLowerCase()
    .trim()
    .min(5).max(10) 
    .refine(validateUsername, "no potato")
    .transform(username=>`${username}fuck`),
  password: z.string().min(6, "password는 6자 이상 적어주세요").regex(passwordRegex, "대소문자 및 특수문자 포함해야돼"),
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