function Filter(props) {
    const {filterSettings, toggleFilterSettings} = props
    return(
        <ul className="bg-white dark:bg-slate-200 text-grayish-104 dark:text-grayish-204 text-base h-12 flex font-bold items-center justify-center rounded-md shadow-2xl shadow-black/10">
            <li 
            onClick={() => toggleFilterSettings('all')}
            className={`${filterSettings.all ? `text-blue` : `hover:cursor-pointer hover:text-grayish-108 dark:hover:text-grayish-200`}`}>All</li>
            <li 
            onClick={() => toggleFilterSettings('active')}
            className={`mx-5 ${filterSettings.active ? `text-blue` : `hover:cursor-pointer hover:text-grayish-108 dark:hover:text-grayish-200`}`}>Active</li>
            <li 
            onClick={() => toggleFilterSettings('completed')}
            className={`${filterSettings.completed ? `text-blue` : `hover:cursor-pointer hover:text-grayish-108 dark:hover:text-grayish-200`}`}>Completed</li>
        </ul>
    )
}

export default Filter