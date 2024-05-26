'use server';
import {z} from 'zod';

const formSchema = z.object({
  phone: z.string().min(10).max(11),
  token: z.string().length(6)
})
async function validateToken(prevState:any, formData: FormData) {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token")
  }

  const result = formSchema.safeParse(data);
  if(!result.success) {
    return result.error.flatten();
  }
}

export {validateToken}