function Button({children, bgVoid, className, ...props}) {
    const bg = bgVoid ? 'bg-transparent border-[1px] border-white text-white' : 'bg-white text-black shadow-lg'

    return(
        <button 
            className={`${bg} font-bold p-3 rounded-md max-w-[500px] mx-auto w-full ${className}`}
            {...props}
            >{children}</button>
    )
}

export default Button