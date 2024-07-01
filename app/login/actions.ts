"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from 'bcrypt';
import getSession from "@/lib/session";
import { redirect } from "next/navigation";


const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(
    findEmail, "존재하지 않는 이메일입니다."
  ),
  password: z
    .string({
      required_error: "Password is required"
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG)
})


async function findEmail(email: string) {
  console.log("check email");
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true }
  })
  return Boolean(user);
}

export async function login(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {

    return result.error.flatten()
  } else {
    // pw 체크
    const user = await db.user.findUnique({
      where: { email : result.data.email },
      select: { id: true, password : true }
    });

    const success = await bcrypt.compare(result.data.password, user!.password ?? "");
    if(success) {
      const session = await getSession();
      session.id = user!.id
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ["비밀번호가 틀렸습니다"]
        }
      }
    }
  }
}