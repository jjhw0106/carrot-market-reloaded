function List() {
  return (
    <div className = "flex items-center justify-center dark:bg-transparent m-5 dark:sm:bg-transparent">
      <div className="bg-white shadow-lg 
      flex flex-col p-5 
      rounded-3xl w-full 
      max-w-screen-sm 
      dark:bg-white gap-3 justify-center
      ">
        {["Nico","Mike","Paul",""].map(
          (person, index)=>{
            return <div key={index} className="flex item-center group gap-3
              odd:bg-gray-50 items-center p-2.5 pb-5
              border-b-2 border-gray-400 
              last:border-none last:pb-2.5">
              <div className="size-7 bg-blue-100 rounded-full "/>
              <span className="text-lg font-medium group-hover:text-red-500">{person}</span>
              <div className="size-5 bg-red-500 text-white flex items-center justify-center rounded-full relative">
                <span className="z-30">{index}</span>
                <div className="size-5 bg-red-500 text-white flex items-center justify-center rounded-full absolute animate-ping"></div>
              </div>
            </div>
          }
        )}
      </div>
    </div>
  )
}
// bg-gradient-to-tr from-cyan-400 to-purple-700 => 그라데이션, 그라데이션일 경우 peer-invalid가 안먹힌다. 이유 모름

export default List;