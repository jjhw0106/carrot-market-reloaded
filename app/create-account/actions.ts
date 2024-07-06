"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import {z} from "zod";
import bcrypt from 'bcrypt'
import { userAgentFromString } from "next/server";
import { emitWarning, env } from "process";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";


function validatePassword(object: { password:string, password_confirm:string}) {
  return object.password === object.password_confirm ? true : false;
}

async function prismaDynamicCondition(field: keyof Prisma.UserWhereUniqueInput, value: any) {
  const whereClause: Prisma.UserWhereUniqueInput = { [field]: value } as Prisma.UserWhereUniqueInput;
  const result = await db.user.findUnique({
    select: {
      id: true
    },
    where: whereClause
  });
  return result;
} 

// checkDuplicateByField로 합칠까 고민중 => 메소드 간 의존성이 너무 높아지는 건 아닌지?
// username 중첩 여부 확인
async function checkDuplicateUsername(username: string) {
  const condition = 'username';
  const result = await prismaDynamicCondition(condition, username);
  
  return Boolean(!result);
}

async function checkDuplicateEmail(email: string) {
  const condition = 'email';
  const result = await prismaDynamicCondition(condition, email);
  
  return Boolean(!result)
}

async function encryptPassword(password: string) {
  const salt = parseInt('asdflkj');
  const hashedBcrypt = await bcrypt.hash(password, salt);
  return hashedBcrypt;
}

const accountSchema = 
z.object({
  email: z.string({}).email(),
    // .refine(checkDuplicateEmail, "중복된 이메일입니다."),
  user_name: z.string()
    .toLowerCase()
    .trim()
    .min(5).max(10)  
    // .refine(checkDuplicateUsername, "존재하는 아이디입니다.")
    .transform(username=>`${username}`),
  password: z.string().min(PASSWORD_MIN_LENGTH, "password는 4자 이상 적어주세요").regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG),
  password_confirm: z.string()
})
.superRefine(async ({email}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      
    }
  })
})
.superRefine(async ({user_name}, ctx)=> {
  const user = await db.user.findUnique({
    where: {
      username: user_name
    },
    select: {
      id: true,
    }
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "이미 사용중인 유저명입니다.",
      path: ['user_name'],
      fatal: true
    });
    return z.NEVER;
  }
})
.refine(validatePassword, {
  message:"both should be same",
  path: ["password_confirm"]
})
// 인자1 : zod object, 인자2 : refinementCtx(에러메시지 리스트)

export async function createAccount(prevState:any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    user_name: formData.get('user_name'),
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm')
  };

  const result = await accountSchema.safeParseAsync(data);
  // validation 통과하지 못했을 경우
  if(!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
  // validation 통과했을 경우 
  else {
    const inputPassword = await encryptPassword(result.data.password);
    // userEmail 중첩 여부 확인
    // 둘 다 통과되면 비밀번호 hashing
    // save to db
    const savedData = {
      username: result.data.user_name,
      password: inputPassword,
      email: result.data.email,
    }

    const user = await db.user.create({
      data: savedData,
      select: { id: true }
    })
    
    const session = await getSession();
    session.id = user.id
    await session.save();
    redirect("/profile");
  }

  /* parse는 에러를 던져주지만, safeParse를 사용할 경우 throw없이 result로 받을 수 있다. */
  // try {
  //   accountSchema.parse(data);
  // } catch(e) {
  //   console.log(e);
  // }
}