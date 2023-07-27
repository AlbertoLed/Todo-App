import { useState, useEffect } from 'react'
import { DndContext, closestCenter, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { todoCollection, db } from './firebase'
import Task from './components/Task'
import moonIcon from '../public/images/icon-moon.svg'
import sunIcon from '../public/images/icon-sun.svg'

function App() {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)
  const [todoItems, setTodoItems] = useState([])
  const [currentInput, setCurrentInput] = useState('')

  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor)
  const sensors = useSensors(
    touchSensor,
    mouseSensor
    )


  // Get the todo items from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(todoCollection, snapshot => {
      const todoList = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setTodoItems(todoList)
    })

    return unsubscribe
  }, [])

  // Set a new todo item in firebase
  async function createNewTodoItem() {
    const todo = {
      description: currentInput,
      isCompleted: false
    }

    await addDoc(todoCollection, todo)
  }

  // Handle events
  function toggleDarkTheme () {
    setIsDarkThemeOn(prev => !prev)
  }
  function updateCurrentInput(e) {
    // console.log(e.target.value)
    setCurrentInput(e.target.value)
  }
  function handleEnter(e) {
    // console.log(e.key)
    if(e.key === 'Enter') {
      createNewTodoItem()
      setCurrentInput('')
    }
  }
  async function deleteTodo(todoId) {
    const docRef = doc(db, 'todo', todoId)
    await deleteDoc(docRef)
  }
  async function toggleIsCompleted(todoId, isCompleted) {
    const docRef = doc(db, 'todo', todoId)
    await setDoc(docRef, { isCompleted: !isCompleted }, { merge: true })
  }
  function handleDragEnd(e) {
    const {active, over} = e
    // console.log(active.id)
    // console.log(over.id)

    if(active.id !== over.id) {
      setTodoItems(prevTodoItems => {
        const oldIndex = prevTodoItems.findIndex(item => item.id === active.id)
        const newIndex = prevTodoItems.findIndex(item => item.id === over.id)
        return arrayMove(prevTodoItems, oldIndex, newIndex)
      })
    }
  }

  // Background files
  const backgroundImage = 
    'bg-[url("./assets/bg-mobile-light.jpg")] ' +
    'md:bg-[url("./assets/bg-desktop-light.jpg")] ' + 
    'dark:bg-[url("./assets/bg-mobile-dark.jpg")] ' +
    'dark:md:bg-[url("./assets/bg-desktop-dark.jpg")]'

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
          <div 
          className="bg-white dark:bg-slate-200 flex items-center px-5 md:px-6 h-12 md:h-16 rounded-md">
            
            {/* circle */}
            <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] rounded-full border border-grayish-101 dark:border-grayish-208"></div>

            {/* input */}
            <input 
            type="text" 
            placeholder="Create a new todo..." 
            onChange={updateCurrentInput}
            onKeyDown={handleEnter}
            value={currentInput}
            className="text-xs md:text-lg w-[100%] h-[100%] ml-2 outline-none text-grayish-108 dark:text-grayish-202 placeholder-grayish-104 dark:placeholder-grayish-204 dark:bg-slate-200"/>
          </div>

          {/* todo notes */}
          <div className="bg-white dark:bg-slate-200 rounded-md my-4 shadow-2xl shadow-black/25 divide-y divide-grayish-101 dark:divide-grayish-209">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={todoItems}
                strategy={verticalListSortingStrategy}
              >
                {todoItems.map(task => (
                  <Task 
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    isCompleted={task.isCompleted}
                    deleteTodo={() => deleteTodo(task.id)}
                    toggleIsCompleted={() => toggleIsCompleted(task.id, task.isCompleted)}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="h-12 flex items-center justify-between text-xs text-grayish-104 dark:text-grayish-204 px-5 md:p-6 ">
              <p>5 items left</p>
              {/* filter options */}
              <ul className="hidden md:flex bg-white dark:bg-slate-200 text-grayish-104 dark:text-grayish-204 text-base h-12 font-bold items-center justify-center rounded-md shadow-2xl shadow-black/10">
                <li className="text-blue">All</li>
                <li className="mx-5">Active</li>
                <li>Completed</li>
              </ul>
              <p>Clear Completed</p>
            </div>
          </div>

          {/* filter options */}
          <ul className="md:hidden bg-white dark:bg-slate-200 text-grayish-104 dark:text-grayish-204 text-base h-12 flex font-bold items-center justify-center rounded-md shadow-2xl shadow-black/10">
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
