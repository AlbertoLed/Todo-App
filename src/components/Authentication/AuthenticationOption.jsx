function AuthenticationOption(props) {
    const {selectLogin, selectSignUp, goBack} = props
    return(
        <>
            <h1 className="uppercase text-white text-2xl md:text-4xl font-bold tracking-[.3em]">Todo</h1>
            <button 
            className="bg-white text-black font-bold p-3 rounded-md max-w-[500px] mx-auto w-full shadow-lg"
            onClick={selectLogin}
            >Login</button>
            <button 
            className="bg-white text-black font-bold p-3 rounded-md max-w-[500px] mx-auto w-full shadow-lg"
            onClick={selectSignUp}
            >Sign Up</button>
        </>
        
    )
}

export default AuthenticationOption