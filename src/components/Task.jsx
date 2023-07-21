import checkIcon from '../../public/images/icon-check.svg'

function Task(props) {
    const {description, isCompleted, deleteTodo, toggleIsCompleted} = props
    return(
        <div className="h-12 md:h-16 px-5 md:px-6 flex items-center">

            {/* cirlce */}
            <div className={`w-[20px] h-[20px] md:w-[26px] md:h-[26px] rounded-full border border-grayish-101 dark:border-grayish-208 hover:cursor-pointer  from-sky to-purple flex items-center justify-center ${isCompleted ? `border-0 bg-gradient-to-br hover:opacity-75` :`hover:bg-gradient-to-br hover:border-0`}`}
            onClick={toggleIsCompleted}>
                <div className={`w-[18px] h-[18px] md:w-[24px] md:h-[24px] rounded-full flex items-center justify-center ${isCompleted ? `bg-transparent` : `bg-white dark:bg-slate-200`}`}>

                    {/* check icon */}
                    { isCompleted && <img src={checkIcon} alt="" />}
                </div>
            </div>

            {/* text */}
            <p className={`text-xs md:text-lg ml-2 grow ${isCompleted ? `text-grayish-102 dark:text-grayish-208 line-through` : `text-grayish-108 dark:text-grayish-202`}`}>{description}</p>

             {/* cross icon */}
            <div 
            onClick={deleteTodo}
            className="scale-[.7] text-grayish-108 hover:cursor-pointer hover:text-grayish-104 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentcolor" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div>
        </div>
    )
}

export default Task