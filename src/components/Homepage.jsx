import { useState, useEffect } from 'react'
import { DndContext, closestCenter, TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { onSnapshot, addDoc, doc, setDoc, writeBatch } from 'firebase/firestore'
import { todoCollection, db } from '../firebase'
import Task from './Task'
import Filter from './Filter'
import moonIcon from '../../public/images/icon-moon.svg'
import sunIcon from '../../public/images/icon-sun.svg'
import { FaCircleUser , FaRightToBracket, FaXmark, FaSun, FaMoon } from "react-icons/fa6"
import { IconContext } from "react-icons"
import Menu from './Menu/index'
import UserMenuContainer from './Menu/MenuContainer'


function Homepage({signOutAccount, deleteAccount}) {
    const [isDarkThemeOn, setIsDarkThemeOn] = useState((/true/).test(localStorage.getItem("todoDarkTheme")) || false)
    const [todoItems, setTodoItems] = useState([])
    const [currentInput, setCurrentInput] = useState('')
    const [filterSettings, setFilterSettings] = useState({all: true, active: false, completed: false})
    const [activeId, setActiveId] = useState(null)
    const touchSensor = useSensor(TouchSensor)
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
        setTodoItems(todoList.sort((a, b) => b.order - a.order))
        })

        return unsubscribe
    }, [])
    // Save dark theme setting in local storage
    useEffect(() => {
        localStorage.setItem("todoDarkTheme", isDarkThemeOn)
    }, [isDarkThemeOn])

    // Set a new todo item in firebase
    async function createNewTodoItem() {
        const todo = {
        description: currentInput,
        isCompleted: false,
        order: todoItems.length
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
    function toggleFilterSettings(filterValue) {
        switch(filterValue) {
        case 'all': setFilterSettings({all: true, active: false, completed: false})
        break
        case 'active': setFilterSettings({all: false, active: true, completed: false})
        break
        case 'completed': setFilterSettings({all: false, active: false, completed: true})
        }
    }
    // Delete all completed todos
    async function clearCompleted() {
        const completedItems = todoItems.filter(item => item.isCompleted)
        if(completedItems.length !== 0) {
        const batch = writeBatch(db)

        // Delete completed todos
        const completedDocRefs = completedItems.map(item => doc(db, 'todo', item.id))
        completedDocRefs.forEach(docRef => batch.delete(docRef))

        // Reorder uncompleted todos
        const uncompletedItems = todoItems.filter(item => !item.isCompleted)
        const uncompletedDocRefs = uncompletedItems.map(item => doc(db, 'todo', item.id))
        let order = uncompletedDocRefs.length - 1;
        uncompletedDocRefs.forEach(docRef => {
            batch.update(docRef, {order: order})
            order--
        })

        await batch.commit()
        }
    }
    // Delte todo item in firebase
    async function deleteTodo(todoId) {
        const batch = writeBatch(db)

        const deletedItemIndex = todoItems.findIndex(item => item.id === todoId)
        const reorderItems = todoItems.slice(0, deletedItemIndex + 1)
        const docRefs = reorderItems.map(item => doc(db, 'todo', item.id))
        for(let i = 0; i < docRefs.length; i++) {
        if(i + 1 === docRefs.length) {
            batch.delete(docRefs[i])
        }
        else {
            batch.update(docRefs[i], { order: reorderItems[i].order - 1 })
        }
        }
        await batch.commit()
    }
    // Toggle isCompleted property in firebase
    async function toggleIsCompleted(todoId, isCompleted) {
        const docRef = doc(db, 'todo', todoId)
        await setDoc(docRef, { isCompleted: !isCompleted }, { merge: true })
    }
    // Reorder with Drag n Drop
    async function handleDragEnd(e) {
        const {active, over} = e

        if(active.id !== over.id) {
        const oldIndex = todoItems.findIndex(item => item.id === active.id)
        const newIndex = todoItems.findIndex(item => item.id === over.id)

        // This part updates the todo items state 
        // Without this the animation effect is ugly, son don't remove
        setTodoItems(prevTodoItems => {
            return arrayMove(prevTodoItems, oldIndex, newIndex)
        })

        // This part updates the firabes
        const batch = writeBatch(db)
        if(oldIndex < newIndex) {
            const reorderItems = todoItems.slice(oldIndex, newIndex + 1)
            const docRefs = reorderItems.map(item => doc(db, 'todo', item.id))

            for(let i = 0; i <= newIndex - oldIndex; i++) {
            if(i === 0) {
                batch.update(docRefs[i], { order: todoItems[newIndex].order })
            }
            else {
                batch.update(docRefs[i], { order: todoItems[oldIndex + i - 1].order })
            }
            }
        }
        else {
            const reorderItems = todoItems.slice(newIndex, oldIndex + 1)
            const docRefs = reorderItems.map(item => doc(db, 'todo', item.id))

            for(let i = 0; i <= oldIndex - newIndex; i++) {
            if(i === oldIndex - newIndex) {
                batch.update(docRefs[i], { order: todoItems[newIndex].order })
            }
            else {
                batch.update(docRefs[i], { order: todoItems[newIndex + i + 1].order })
            }
            }
        }
        await batch.commit()
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
        <div className={`font-jos overflow-hidden ${isDarkThemeOn && `dark`}`}>
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
                                    <p>alberto@gmail.com</p>
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
                                    onClick={deleteAccount}>
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
        </div>
    )
}

export default Homepage