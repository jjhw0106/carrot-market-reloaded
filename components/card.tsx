function TailwindCard() {
  return (
    <div className = "bg-gray-100 m-5 flex items-center justify-center  dark:bg-gray-700">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm dark:bg-gray-500">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-400">In transit</span>
            <span className="text-4xl font-semibold dark:text-white">Coolblue</span>
          </div>
          <div className="size-12 rounded-full bg-orange-400"></div>
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="
          bg-green-400 text-white uppercase text-xs font-medium rounded-full
          px-2.5 py-1.5
          transition hover:bg-green-500 hover:scale-125">
            Today
          </span>
          <span className="dark:text-gray-300">9:30-10:30</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 absolute w-full h-2 rounded-full"></div>
          <div className="bg-green-400 absolute w-3/4 h-2 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center mt-5 text-gray-300">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400">Delivered</span>
        </div>
      </div>
    </div>
  )
}

export default TailwindCard;