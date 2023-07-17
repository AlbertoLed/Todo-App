function App() {


  return (

    <div className="font-jos">
      <main className='bg-grayish-100 dark:bg-slate-202 min-h-[100vh] grid grid-cols-1 grid-rows-1'>

        {/* background image */}
         <div className='bg-[url("public/images/bg-mobile-light.jpg")] md:bg-[url("public/images/bg-desktop-light.jpg")] dark:bg-[url("public/images/bg-mobile-dark.jpg")] dark:md:bg-[url("public/images/bg-desktop-dark.jpg")] bg-cover bg-center h-[200px] md:h-[300px] w-[100%] col-start-1 col-end-1 row-start-1 row-end-1'>
        </div>


        <div className="col-start-1 col-end-1 row-start-1 row-end-1 self-start justify-self-center w-[87%] max-w-[550px] mt-10 md:mt-[80px]">

          {/* title */}
          <h1 className="uppercase text-white text-2xl font-bold tracking-[.3em] mb-7">Todo</h1>

          {/* notes input */}
          <div className="bg-white flex items-center px-5 h-12 rounded-md">
            <div className="bg-white w-[20px] h-[20px] rounded-full border border-grayish-104"></div>
            <input type="text" placeholder="Create a new todo..." className="text-xs w-[100%] h-[100%] ml-2 outline-none text-grayish-108 placeholder-grayish-104"/>
          </div>

          {/* todo notes */}
          <div className="bg-white rounded-md my-4">
            <div className="h-12 flex items-center justify-between text-xs text-grayish-104 px-5">
              <p>5 items left</p>
              <p>Clear Completed</p>
            </div>
          </div>

          {/* filter options */}
          <ul className="bg-white text-grayish-104 text-base h-12 flex font-bold items-center justify-center rounded-md">
            <li className="text-blue">All</li>
            <li className="mx-5">Active</li>
            <li>Completed</li>
          </ul>

          <p className="text-sm text-center text-grayish-104 mt-11">Drag and drop to reorder list</p>
        </div>
      </main>
    </div>
  )
} 

export default App
