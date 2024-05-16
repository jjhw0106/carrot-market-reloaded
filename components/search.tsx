function Search() {
  return (
    <div className = "flex items-center justify-center dark:bg-transparent m-5 dark:sm:bg-transparent">
      <div className="bg-white shadow-lg 
      flex flex-col p-5 
      rounded-3xl w-full 
      max-w-screen-sm 
      dark:bg-white gap-2 justify-center
      *:outline-none
      has-[:invalid]:ring
      has-[:invalid]:ring-red-600
      "
      >
        <input className="w-full rounded-full h-10 
        bg-gray-200 pl-2 
         
        focus:ring-blue-500 focus:ring-offset-2 focus:ring-4 transition-shadow 
        placeholder:text-red-600 placeholder:font-semibold
        invalid:focus:ring-red-600 peer
        " 
        type="text" required placeholder="Search here..." />
        <span className="peer-invalid:text-red-500 font-medium peer-invalid:block hidden">Email is required</span>
        <button className="bg-black bg-opacity-80 text-white py-2 rounded-full 
        active:scale-90 transition-transform 
        peer-invalid:bg-red-100
        ">Log In</button>
      </div>
    </div>
  )
}
// bg-gradient-to-tr from-cyan-400 to-purple-700 => 그라데이션, 그라데이션일 경우 peer-invalid가 안먹힌다. 이유 모름

export default Search;