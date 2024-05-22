"use server";
import {z} from "zod";

// const accountSchema = z.string().min(5).max(10)
const accountSchema = 
z.object({
  email: z.string().email(),
  user_name: z.string().min(5).max(10),
  password: z.string().min(8, "password는 8자 이상 적어주세요").max(16, "password는 최대 16자까지 입니다."),
  password_confirm: z.string().min(8, "password가 일치하지 않습니다")})
.refine(data => data.password === data.password_confirm, {
  message: "password do not match",
  path:["password_confirm"]
})

export async function createAccount(prevState:any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    user_name: formData.get('user_name'),
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm')
  };
  accountSchema.parse(data);

  console.log(data);
  return data;
}