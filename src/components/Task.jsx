function Task(props) {
    const {description} = props
    return(
        <div className="h-12 px-5 flex items-center">
            <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] rounded-full border border-grayish-101 dark:border-grayish-208"></div>
            <p className="text-xs text-grayish-108 ml-2 grow">{description}</p>
            <div className="scale-[.7] text-grayish-108 hover:cursor-pointer hover:text-grayish-104 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentcolor" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div>
        </div>
    )
}

export default Task