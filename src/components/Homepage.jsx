import { useState, useEffect, useContext } from 'react'
import { DndContext, closestCenter, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'
import { onSnapshot, addDoc, doc, setDoc, writeBatch, query, where, QueryConstraint } from 'firebase/firestore'
import { todoCollection, db } from '../firebase'
import Task from './Task'
import Filter from './Filter'
import { FaCircleUser , FaRightToBracket, FaXmark, FaSun, FaMoon } from "react-icons/fa6"
import { IconContext } from "react-icons"
import Menu from './Menu/index'
import { AuthenticationContext } from './Authentication/Authentication'


function Homepage() {
    const [isDarkThemeOn, setIsDarkThemeOn] = useState((/true/).test(localStorage.getItem("todoDarkTheme")) || false)
    const [todoItems, setTodoItems] = useState([])
    const [currentInput, setCurrentInput] = useState('')
    const [filterSettings, setFilterSettings] = useState({all: true, active: false, completed: false})
    const [activeId, setActiveId] = useState(null)
    const [deleteDialogue, setDeleteDialogue] = useState(false)
    const [currentDocId, setCurrentDocId] = useState(null)
    const touchSensor = useSensor(TouchSensor)
    const mouseSensor = useSensor(MouseSensor)
    const sensors = useSensors(
        touchSensor,
        mouseSensor
        )
    const {signOutAccount, deleteAccount, email} = useContext(AuthenticationContext)

    console.log(todoItems)

    // Get the todo items from firebase
    useEffect(() => {
        // Set query settings
        const q = query(todoCollection, where("email", "==", email))

        // Set realtime snapshot
        const unsubscribe = onSnapshot(q, snapshot => {

            if(typeof snapshot.docs[0] === 'undefined') {
                // If snapshot.docs[0] is undefined that means this is a new user
                // So create the doc with the array of notes
                const doc = {
                    email: email,
                    todo: "",
                }
                addDoc(todoCollection, doc)
                // console.log("docs is undefined")
            } 
            else if(snapshot.docs[0].data().todo !== '') {
                // Whether the data is not an empty string
                // We get de doc with the array of notes

                // Get the todo items
                const todoList = JSON.parse(snapshot.docs[0].data().todo)
                console.log()

                // Save the todo items in an state
                setTodoItems(todoList)  
                
                // console.log("everything is fine")
            }
            else {
                // console.log("doc is an empty string")
            } 
            
            // Set the ID of the current doc
            setCurrentDocId(snapshot.docs[0].id)  
        })

        return unsubscribe
    }, [])
    // Save dark theme setting in local storage
    useEffect(() => {
        localStorage.setItem("todoDarkTheme", isDarkThemeOn)
    }, [isDarkThemeOn])

    // Set a new todo item in firebase
    async function createNewTodoItem() {
        // Get the doc ref
        const docRef = doc(db, 'todo', currentDocId)

        // Create the note object
        const note = {
        description: currentInput,
        isCompleted: false,
        id: nanoid()
        }

        // Create a new todoItems array with the new note
        const newTodoItems = [note, ...todoItems]

        // Add the new array to the collection's doc
        await setDoc(docRef, { todo: JSON.stringify(newTodoItems) }, { merge: true })
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
    function toggleFilterSettings(filterValue) {
        switch(filterValue) {
        case 'all': setFilterSettings({all: true, active: false, completed: false})
        break
        case 'active': setFilterSettings({all: false, active: true, completed: false})
        break
        case 'completed': setFilterSettings({all: false, active: false, completed: true})
        }
    }
    const toggleDeleteDialogue = () => setDeleteDialogue(prev => !prev)
    // Delete all completed todos
    async function clearCompleted() {
        // Get the doc ref
        const docRef = doc(db, 'todo', currentDocId)

        // Get the an array without the completed items
        const activeTodoItems = todoItems.filter(item => !item.isCompleted)

        // Add the new array to the collection's doc
        await setDoc(docRef, { todo: JSON.stringify(activeTodoItems) }, { merge: true })
    }
    // Delte todo item in firebase
    async function deleteTodo(todoID) {
        // Get the doc ref
        const docRef = doc(db, 'todo', currentDocId)

        // Get the index of the item to delete
        const itemToDeleteIndex = todoItems.findIndex(item => item.id === todoID)

        // Create a copy of the todoItems without the deleted item
        const splicedTodoItems = todoItems.toSpliced(itemToDeleteIndex, 1)

        // Add the new array to the collection's doc
        await setDoc(docRef, { todo: JSON.stringify(splicedTodoItems) }, { merge: true })
    }
    // Toggle isCompleted property in firebase
    async function toggleIsCompleted(todoID, isCompleted) {
        // Get the doc ref
        const docRef = doc(db, 'todo', currentDocId)

        // Get the index of the item to delete
        const itemToModify = todoItems.findIndex(item => item.id === todoID)
        
        // Mark as complete the todo item
        const newTodoItems = todoItems
        newTodoItems[itemToModify] = {...newTodoItems[itemToModify], isCompleted: !isCompleted}

        // Add the new array to the collection's doc
        await setDoc(docRef, { todo: JSON.stringify(newTodoItems) }, { merge: true })
    }
    // Reorder with Drag n Drop
    async function handleDragEnd(e) {
        const {active, over} = e

        if(active.id !== over.id) {
            // Get the doc ref
            const docRef = doc(db, 'todo', currentDocId)

            const oldIndex = todoItems.findIndex(item => item.id === active.id)
            const newIndex = todoItems.findIndex(item => item.id === over.id)

            const newTodoItems = arrayMove(todoItems, oldIndex, newIndex)

            // This part updates the todo items state 
            // Without this the animation effect is ugly, son don't remove
            setTodoItems(newTodoItems)

            // Add the new array to the collection's doc
            const res = await setDoc(docRef, { todo: JSON.stringify(newTodoItems) }, { merge: true })
            // console.log(res)
        }
        setActiveId(null)
    }
    function handleDragStart(e) {
        setActiveId(e.active.id)
    }

    // Background files
    const backgroundImage = 
        'bg-[url("./assets/bg-mobile-light.jpg")] ' +
        'md:bg-[url("./assets/bg-desktop-light.jpg")] ' + 
        'dark:bg-[url("./assets/bg-mobile-dark.jpg")] ' +
        'dark:md:bg-[url("./assets/bg-desktop-dark.jpg")]'

    return(
        <main className={`font-jos overflow-hidden ${isDarkThemeOn && `dark`}`}>
            <main className='bg-grayish-100 dark:bg-slate-202 min-h-[100vh] grid grid-cols-1 grid-rows-1'>

            {/* background image */}
            <div className={`bg-cover bg-center h-[200px] md:h-[300px] w-[100%] col-start-1 col-end-1 row-start-1 row-end-1 ${backgroundImage}`}>
            </div>

            {/* container for all the content */}
            <div className="col-start-1 col-end-1 row-start-1 row-end-1 self-start justify-self-center w-[87%] max-w-[550px] mt-10 md:mt-[65px]">

                {/* container for title and button */}
                <div className='flex justify-between mb-7'>
                
                {/* title */}
                <h1 className="uppercase text-white stext-2xl md:text-4xl font-bold tracking-[.3em]">Todo</h1>

                {/* button to toggle theme */}
                <div className='self-center flex space-x-3 relative'>
                    <Menu>
                        <Menu.Button>
                            <IconContext.Provider value={{color: 'white', size: '26px', className: 'hover:cursor-pointer'}}>
                                <FaCircleUser />
                            </IconContext.Provider>
                        </Menu.Button>
                        <Menu.Container>
                            <div className='absolute z-20 right-0 top-10 w-[270px] flex flex-col bg-white text-grayish-108 text-base rounded-lg shadow-lg shadow-grayish-104 dark:shadow-slate-202 dark:bg-slate-200 dark:text-grayish-202'>
                                <div className='flex items-end space-x-2 p-2 mt-3 mx-3 rounded-md'>
                                    <FaCircleUser className='text-[26px]' />
                                    <p>{email}</p>
                                </div>
                                <div className='h-px w-full my-2 bg-grayish-102 dark:bg-grayish-208'></div>
                                <div 
                                className='flex items-end space-x-2 p-2 mx-3 rounded-md hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-slate-100'
                                onClick={toggleDarkTheme}>
                                    {isDarkThemeOn ?
                                    <FaSun className='text-[26px]' /> :
                                    <FaMoon className='text-[26px]' /> }
                                    <p>{isDarkThemeOn ? 'Light theme' : 'Dark theme'}</p>
                                </div>
                                <ul>
                                    <li 
                                    className='flex items-end space-x-2 p-2 mx-3 rounded-md hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-slate-100'
                                    onClick={signOutAccount}>
                                        <FaRightToBracket className='text-[26px]' />
                                        <p>Sign out</p>
                                    </li>
                                    <li 
                                    className='flex items-end space-x-2 p-2 mb-3 mx-3 rounded-md hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-slate-100'
                                    onClick={toggleDeleteDialogue}>
                                        <FaXmark className='text-[26px]' />
                                        <p>Delete account</p>
                                    </li>
                                </ul>
                            </div>
                            
                        </Menu.Container>
                    </Menu>
                    
                    
                    
                </div>
                
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
                <div className="bg-white dark:bg-slate-200 rounded-md my-4 shadow-2xl shadow-black/25 ">
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    sensors={sensors}
                >
                    <SortableContext
                    items={todoItems}
                    strategy={verticalListSortingStrategy}
                    >
                    {todoItems.filter(task => {
                        // If filter settings is on 'All'
                        if(filterSettings.all) {
                        return true
                        }
                        // If filter settings is on 'Active'
                        else if(filterSettings.active) {
                        return !task.isCompleted
                        }
                        // If filter settings is on 'Completed'
                        else if(filterSettings.completed) {
                        return task.isCompleted
                        }
                    })
                    .map(task => (
                        // Render task components
                        <Task 
                        key={task.id}
                        id={task.id}
                        description={task.description}
                        isCompleted={task.isCompleted}
                        deleteTodo={() => deleteTodo(task.id)}
                        toggleIsCompleted={() => toggleIsCompleted(task.id, task.isCompleted)}
                        isActived={activeId === task.id ? true : false}
                        />
                    ))}
                    </SortableContext>
                </DndContext>

                <div className="h-12 flex items-center justify-between text-xs text-grayish-104 dark:text-grayish-204 px-5 md:p-6 ">
                    {/* Calculate how many items are left */}
                    <p>{`${todoItems.filter(task => !task.isCompleted).length} items left`}</p>
                    
                    {/* filter options */}
                    <div className='hidden md:block'>
                    <Filter 
                        filterSettings={filterSettings}
                        toggleFilterSettings={toggleFilterSettings}
                    />
                    </div>
                    <p className='hover:cursor-pointer hover:text-grayish-108 dark:hover:text-grayish-200'
                    onClick={clearCompleted}>Clear Completed</p>
                </div>
                </div>

                {/* filter options */}
                <div className='block md:hidden'>
                <Filter 
                    filterSettings={filterSettings}
                    toggleFilterSettings={toggleFilterSettings}
                />
                </div>

                {/* bottom text */}
                <p className="text-sm text-center text-grayish-104 dark:text-grayish-204 mt-11">Drag and drop to reorder list</p>
            </div>
            </main>
            {/* Are you sure you want to delete your acconte message */}
            {deleteDialogue && <div className='bg-black bg-opacity-40 w-full min-h-[100vh] fixed top-0 left-0 flex items-center justify-center z-20'>
                <div className='grid grid-cols-2 gap-x-2 w-80 p-5 rounded-lg overflow-hidden bg-grayish-100 text-slate-100 dark:bg-slate-200 dark:text-grayish-200'>
                    <p className='col-span-2 mb-4'>Are you sure you want to delete your account? This action can't be undone.</p>
                    <button 
                    className='p-2 rounded-lg transition-colors bg-slate-100 bg-opacity-10 hover:bg-opacity-20 dark:bg-grayish-200 dark:bg-opacity-5 dark:hover:bg-opacity-20'
                    onClick={toggleDeleteDialogue}
                    >Cancel</button>
                    <button 
                    className='p-2 rounded-lg transition-colors text-grayish-100 bg-red-500 bg-opacity-100 hover:bg-opacity-80 dark:bg-red-600 dark:bg-opacity-75 dark:hover:bg-opacity-50'
                    onClick={deleteAccount}
                    >Delete</button>
                </div>
                
            </div>}
        </main>
    )
}

export default Homepage