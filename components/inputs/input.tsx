import { InputHTMLAttributes } from 'react';
import {z} from 'zod';

interface FormInputPorps {
  errors?: string[];
  name: string

}
// & InputHTMLAttributes<> : html input태그가 갖는 속성들을 변수로 전달 받을 수 있게 해준다.
export default function Input({name, errors=[], ...rest}: FormInputPorps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(rest);
  return <div className="p-1">
    <input className="
      bg-transparent
      rounded-md 
      w-full h-10 border-none placeholder:text-neutral-400 focus:outline-none 
      ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 
      invalid:ring-red-500 peer" 
      name={name}
      {...rest}
    />
    {errors.map(
      (error, index)=>
        <div key={index} className="text-red-500 font-medium peer-invalid:visible">
          {error}
        </div>
    )}
  </div>
}