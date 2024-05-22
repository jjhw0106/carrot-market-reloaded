interface FormInputPorps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string
}

export default function FormInput({type, placeholder, required, errors=[], name}: FormInputPorps) {
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
      name={name}
    />
    {errors.map(
      (error, index)=>
        <div key={index} className="text-red-500 font-medium invisible peer-invalid:visible">
          {error}
        </div>
    )}
  </div>
}