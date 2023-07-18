import {useState} from 'react'
import Task from './components/Task'
import moonIcon from '../public/images/icon-moon.svg'
import sunIcon from '../public/images/icon-sun.svg'

function App() {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(true)

  const data = [
    {
      id: 1,
      description: 'Jog around the park 3x'
    },
    {
      id: 2,
      description: '10 minutes meditation'
    },
    {
      id: 3,
      description: 'Read for 1 hour'
    }
]
  const tasks = data.map(task => (
    <Task 
      key={task.id}
      description={task.description}
    />
  ))

  function toggleDarkTheme () {
    setIsDarkThemeOn(prev => !prev)
  }

  const backgroundImage = 
    'bg-[url("public/images/bg-mobile-light.jpg")] ' +
    'md:bg-[url("public/images/bg-desktop-light.jpg")] ' + 
    'dark:bg-[url("public/images/bg-mobile-dark.jpg")] ' +
    'dark:md:bg-[url("public/images/bg-desktop-dark.jpg")]'

  return (
    <div className={`font-jos ${isDarkThemeOn && `dark`}`}>
      <main className='bg-grayish-100 dark:bg-slate-202 min-h-[100vh] grid grid-cols-1 grid-rows-1'>

        {/* background image */}
         <div className={`bg-cover bg-center h-[200px] md:h-[300px] w-[100%] col-start-1 col-end-1 row-start-1 row-end-1 ${backgroundImage}`}>
        </div>

        {/* container for all the content */}
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 self-start justify-self-center w-[87%] max-w-[550px] mt-10 md:mt-[65px]">

          {/* container for title and button */}
          <div className='flex justify-between mb-7'>
            
          {/* title */}
            <h1 className="uppercase text-white text-2xl md:text-4xl font-bold tracking-[.3em]">Todo</h1>

          {/* button to toggle theme */}
            <button className='self-center rounded-full'>
              <img 
              onClick={toggleDarkTheme}
              src={isDarkThemeOn ? sunIcon : moonIcon} alt="" />
            </button>
          </div>
          

          {/* notes input */}
          <div className="bg-white dark:bg-slate-200 flex items-center px-5 md:p-6 h-12 md:h-16 rounded-md">
            
            {/* circle */}
            <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] rounded-full border border-grayish-101 dark:border-grayish-208"></div>

            {/* input */}
            <input type="text" placeholder="Create a new todo..." className="text-xs md:text-lg w-[100%] h-[100%] ml-2 outline-none text-grayish-108 placeholder-grayish-104 dark:placeholder-grayish-204 dark:bg-slate-200"/>
          </div>

          {/* todo notes */}
          <div className="bg-white dark:bg-slate-200 rounded-md my-4 shadow-2xl shadow-black/25 divide-y divide-grayish-101">
            {tasks}

            <div className="h-12 flex items-center justify-between text-xs text-grayish-104 dark:text-grayish-204 px-5 md:p-6 ">
              <p>5 items left</p>
              <p>Clear Completed</p>
            </div>
          </div>

          {/* filter options */}
          <ul className="bg-white dark:bg-slate-200 text-grayish-104 dark:text-grayish-204 text-base h-12 flex font-bold items-center justify-center rounded-md shadow-2xl shadow-black/10">
            <li className="text-blue">All</li>
            <li className="mx-5">Active</li>
            <li>Completed</li>
          </ul>

          {/* bottom text */}
          <p className="text-sm text-center text-grayish-104 dark:text-grayish-204 mt-11">Drag and drop to reorder list</p>
        </div>
      </main>
    </div>
  )
} 

export default App
