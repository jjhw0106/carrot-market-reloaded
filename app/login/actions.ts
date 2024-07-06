"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from 'bcrypt';
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

// Q. zod에서 핸들링하는 범위를 뭘 기준으로 정해야하나?
// 내 생각 -> DB를 거치는 경우 (이메일 중복검사 / 비밀번호 검증)등은 로직으로
// 그 외 form에서 검증하는 경우는 zod를 사용하는게 어떤지?
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
    // email 여부 체크 => zod에서 실행
    // pw 체크
    const user = await db.user.findUnique({
      where: { email : result.data.email },
      select: { id: true, password : true }
    });

    const success = await bcrypt.compare(result.data.password, user!.password ?? "");
    if(success) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
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