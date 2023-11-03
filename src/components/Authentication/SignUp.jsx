import { useState, useContext } from "react"
import { AuthenticationContext } from "./Authentication"
import { useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6"
import Button from "../Button"

function SignUp() {
    const {createUser} = useContext(AuthenticationContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        pass: "",
        secondPass: ""
    })
    // console.log(formData)

    function handleData(event) {
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    function handleSignUp() {
        if(formData.pass === formData.secondPass) {
            createUser(formData.email, formData.pass)
        } 
        else {
            console.log('pass wrong')
        }
    }
    function handleEnter(e) {
        if(e.key === "Enter") {
            handleSignUp()
        }
    }
    
    const selectLogin = () => navigate("/Todo-App/login/")

    const bgImage = `bg-[url("./assets/bg-auth-mobile.jpg")] bg-center bg-cover lg:bg-[url("./assets/bg-auth-desktop.jpg")]`

    return(
        // <main className="min-h-[100vh] bg-gradient-to-b from-violet-200 to-dark-sky text-white flex flex-col px-7 justify-center">

        //     <h1 className="text-3xl mb-9 mt-auto text-center flex flex-col leading-10 max-w-[500px] mx-auto w-full md:text-5xl"><span className="font-bold">Create Accout</span> <span>to get started now!</span></h1>
        //     <p className="mb-3">We are happy to see you here.</p>
        //     <input 
        //     type="email" 
        //     placeholder="Email Address" 
        //     name="email"
        //     onChange={handleData}
        //     onKeyDown={handleEnter}
        //     value={formData.email}
        //     className="mb-3 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
        //     <input 
        //     type="password" 
        //     placeholder="Password" 
        //     name="pass"
        //     onChange={handleData}
        //     onKeyDown={handleEnter}
        //     value={formData.pass}
        //     className="mb-3 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
        //     <input 
        //     type="password" 
        //     placeholder="Confirm Password" 
        //     name="secondPass"
        //     onChange={handleData}
        //     onKeyDown={handleEnter}
        //     value={formData.secondPass}
        //     className="mb-9 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
        //     <button 
        //     className="bg-white text-black font-bold p-3 rounded-md max-w-[500px] mx-auto w-full shadow-lg"
        //     onClick={handleSignUp}
        //     >Sign Up</button>
        //     <p className="mt-auto mb-12 text-center max-w-[500px] mx-auto w-full">Already have an account? <span className="font-bold hover:cursor-pointer" onClick={selectLogin}>Login Now</span></p>
        // </main>
        <main className="font-jos min-h-[100vh] bg-auth-bg text-white flex flex-col justify-center items-center">
            {/* Card */}
            <div className="flex flex-col w-[90%] max-w-[630px] min-h-[754px] max-h-[800px] h-[90vh] my-5 bg-auth-card rounded-2xl shadow-lg shadow-grayish-104 lg:flex-row-reverse lg:h-[700px] lg:min-h-[700px] lg:max-w-[1160px]">
                {/* H1 and Background image */}
                <div className={`${bgImage} h-[271px] flex items-center justify-center rounded-2xl lg:h-full lg:w-1/2`}>
                    {/* H1 only visible for small screens */}
                    <h1 className="text-white text-3xl text-center lg:hidden flex flex-col sm:text-4xl"><span className="font-bold mb-[-15px]">Create account</span><span>to get started now!</span></h1>
                </div>
                {/* Form */}
                <div className="w-5/6 max-w-[500px] self-center flex flex-col justify-center grow lg:h-full lg:w-[330px] lg:mx-auto lg:grow-0">
                    {/* H1 only visible for large screens */}
                    <h1 className="text-auth-slate text-3xl text-center hidden lg:flex flex-col mb-[20px]"><span className="font-bold mb-[-15px]">Create account</span><span>to get started now!</span></h1>
                    {/* Instruction */}
                    <p className="text-auth-slate font-bold mb-2">We are happy to see you here</p>
                    {/* Email input */}
                    <input 
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleData}
                    onKeyDown={handleEnter}
                    value={formData.email}
                    className="h-[52.8px] rounded-lg mb-4 text-auth-slate px-5 placeholder:text-auth-gray border-auth-silver border-[1px] outline-none outline-offset-0 focus:outline-auth-blue" />
                    {/* Password input */}
                    <input 
                    type="password"
                    placeholder="Password"
                    name="pass"
                    onChange={handleData}
                    onKeyDown={handleEnter}
                    value={formData.pass}
                    className="h-[52.8px] rounded-lg mb-4 text-auth-slate px-5 placeholder:text-auth-gray border-auth-silver border-[1px] outline-none outline-offset-0 focus:outline-auth-blue" />{/* Password input */}
                    <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="secondPass"
                    onChange={handleData}
                    onKeyDown={handleEnter}
                    value={formData.secondPass}
                    className="h-[52.8px] rounded-lg mb-4 text-auth-slate px-5 placeholder:text-auth-gray border-auth-silver border-[1px] outline-none outline-offset-0 focus:outline-auth-blue" />
                    {/* Sign Up Button */}
                    <Button 
                    onClick={handleSignUp}
                    className="bg-auth-blue text-white mb-4 shadow-md shadow-grayish-104 hover:bg-auth-blue-h transition-colors text-lg"
                    >Sign Up</Button>
                    {/* Login now */}
                    <p className="text-auth-gray">Already have an account? <span onClick={selectLogin} className="text-auth-blue font-bold hover:cursor-pointer hover:text-auth-blue-h transition-colors">Login now</span></p>
                    {/* Or text */}
                    <div className="flex justify-center items-center my-7 mt-6">
                        <div className="w-20 h-[2px] bg-auth-blue"></div>
                        <span className="mx-5 text-auth-gray text-base">Or</span>
                        <div className="w-20 h-[2px] bg-auth-blue"></div>
                    </div>
                    {/* Continue with Google */}
                    <Button className="flex items-center justify-center text-auth-slate border-auth-slate border-[2px] p-2.5 hover:border-auth-slate-h hover:text-auth-slate-h transition-colors font-normal text-lg" 
                    bgVoid={true}>
                        <FaGoogle className="text-xl" /> 
                        <span className="ml-2">Continue with Google</span>
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default SignUp