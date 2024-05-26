'use server';
import {z} from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';


// const phoneSchema = z.string().trim().refine(validator.isMobilePhone) // = phone => validator.isMobilePhone(phone), zod가 추가한 것
const phoneSchema = z.string().trim().refine(phone => validator.isMobilePhone(phone, 'ko-KR'), "this is wrong number") 

// FormData를 통해 넘어오는 애들은 모두 string으로 넘어온다. coerce => string을 다른 타입으로 캐스팅 해주는 메소드
const tokenSchema = z.coerce.number().min(100000).max(999999);

const formSchema = z.object({
  phone: z.string().min(10).max(11),
  token: z.string().length(6)
})
interface ActionState {
  token: boolean
}

async function renewToken(prevState:ActionState, formData: FormData) {
  const phone = formData.get("phone");
  if(!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false
      }
    } else {
      return {
        token: true,
      }
    }
  } else {
    const result = phoneSchema.safeParse(phone)
  }
}

async function validateToken(prevState:ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if(!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten()
      }
    } else {
      return {
        token: true,
      }
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if(!result.success) {
      return {
        token: true,
        error: result.error.flatten()
      }
    } else {
      redirect('/')
    }
  }
}

export {validateToken, renewToken}