interface FormButton {
  text: string
  loading: boolean
}

function FormButton({text, loading}: FormButton) {
  return (
    <button  
    disabled={loading}
    className="primary-btn h-10 disabled:bg-neutral-200 disabled:text-gray-400 disabled:cursor-not-allowed">
      {loading?"Loading...":text}
    </button>
  )
}

export default FormButton;