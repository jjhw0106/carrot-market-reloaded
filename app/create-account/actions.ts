"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MSG } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import {z} from "zod";

function validateUsername(username:string) {
  return !username.includes("potato");
}

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
  console.log(password);
  return
}

const accountSchema = 
z.object({
  email: z.string({}).email()
    .refine(checkDuplicateEmail, "중복된 이메일입니다."),
  user_name: z.string()
    .toLowerCase()
    .trim()
    .min(5).max(10)  
    .refine(validateUsername, "no potato")
    .refine(checkDuplicateUsername, "존재하는 아이디입니다.")
    .transform(username=>`${username}`),
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

  const result = await accountSchema.safeParseAsync(data);
  // validation 통과하지 못했을 경우
  if(!result.success) {
    
    return result.error.flatten();
  }
  // validation 통과했을 경우 
  else {
    console.log(result);
    const inputPassword = result.data.password;
    encryptPassword(inputPassword);
    // userEmail 중첩 여부 확인
    // 둘 다 통과되면 비밀번호 hashing
    // save to db
  }

  /* parse는 에러를 던져주지만, safeParse를 사용할 경우 throw없이 result로 받을 수 있다. */
  // try {
  //   accountSchema.parse(data);
  // } catch(e) {
  //   console.log(e);
  // }
}