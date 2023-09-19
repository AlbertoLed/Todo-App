function SignUp() {
    return(
        <div className="min-h-[100vh] bg-gradient-to-b from-violet-200 to-sky text-white flex flex-col px-7 justify-center">
            <h1 className="text-2xl mb-5"><span className="font-bold">Create Accout</span> to get started now!</h1>
            <input type="email" className="mb-3 p-2 bg-violet-100" />
            <input type="password" className="mb-3 p-2 bg-violet-100" />
            <input type="password" className="mb-5 p-2 bg-violet-100" />
            <button className="bg-white text-black font-bold p-2">Sign Up</button>

            <p>Already have an account? <span>Login Now</span></p>
        </div>
    )
}

export default SignUp