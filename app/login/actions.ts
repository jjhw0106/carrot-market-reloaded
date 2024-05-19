"use server";

import { redirect } from "next/navigation";

export const handleForm = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  redirect('/')
  return { 
    errors:['wrong password', 'password too short']
  }
}