function SignUp() {
    return(
        <div className="min-h-[100vh] bg-gradient-to-b from-violet-200 to-dark-sky text-white flex flex-col px-7 justify-center">
            <h1 className="text-3xl mb-9 mt-auto text-center flex flex-col leading-10"><span className="font-bold">Create Accout</span> <span>to get started now!</span></h1>
            <input type="email" placeholder="Email Address" className="mb-3 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101" />
            <input type="password" placeholder="Password" className="mb-3 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101" />
            <input type="password" placeholder="Confirm Password" className="mb-9 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101" />
            <button className="bg-white text-black font-bold p-3 rounded-md">Sign Up</button>
            <p className="mt-auto mb-12 text-center">Already have an account? <span className="font-bold">Login Now</span></p>
        </div>
    )
}

export default SignUp