interface FormInputPorps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({type, placeholder, required, errors}: FormInputPorps) {
  return <div>
    <input className="
      bg-transparent
      rounded-md 
      w-full h-10 border-none placeholder:text-neutral-400 focus:outline-none 
      ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 
      invalid:ring-red-500 peer" 
      type={type} 
      placeholder={placeholder} 
      required={required} 
    />
    {errors.map(
      (error, index)=>
        <span key={index} className="text-red-500 font-medium hidden peer-invalid:block">{error}</span>
    )}
  </div>
}