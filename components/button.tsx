"use client";
import { useFormStatus } from "react-dom";

interface ButtonInterface {
  text: string
  // loading: boolean -> useFormStatus훅이 로딩 상태를 알려주기 때문에 필요가 없다.
} 

function Button({text}: ButtonInterface) {
  const {pending} = useFormStatus(); // 이 훅은 반드시 form태그의 하위에서 사용되어야 한다.
  return (
    <button  
    className="primary-btn h-10 disabled:bg-neutral-200 disabled:text-gray-400 disabled:cursor-not-allowed"
    disabled={pending}
    >
      {pending ? "로딩 중...":text}
    </button>
  )
}

export default Button;