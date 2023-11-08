import { useContext } from "react"
import { useState } from "react"
import { AuthenticationContext } from "./Authentication"
import { useNavigate } from "react-router-dom"
import { FaGoogle, FaXmark } from "react-icons/fa6"
import Button from "../Button"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        pass: ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { signInUser, signInWithGoogle} = useContext(AuthenticationContext)

    const selectSignUp = () => navigate("/Todo-App/signup/")
    const selectForgetPassword = () => navigate("/Todo-App/password_reset/")

    function handleData(event) {
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    async function handleLogin() {
        const res = await signInUser(formData.email, formData.pass)
        // console.log(res)
        if(res) {
            setErrorMessage("Incorrect email or password.")
        } 
    }
    function handleEnter(e) {
        if(e.key === "Enter") {
            handleLogin()
        }
    }
    const closeErrorMessage = () => setErrorMessage("")

    const bgImage = `bg-[url("./assets/bg-auth-mobile.jpg")] bg-center bg-cover lg:bg-[url("./assets/bg-auth-desktop.jpg")]`

    return(
        <main className="font-jos min-h-[100vh] bg-auth-bg text-white flex flex-col justify-center items-center">
            {/* Card */}
            <div 
            className={`flex flex-col w-[90%] max-w-[630px] max-h-[822px] h-[90vh] my-5 bg-auth-card rounded-2xl shadow-lg shadow-grayish-104 lg:flex-row-reverse lg:h-[700px] lg:min-h-[700px] lg:max-w-[1160px]
            ${errorMessage === '' ? 'min-h-[754px]' : 'min-h-[822px]'}`}>
                {/* H1 and Background image */}
                <div className={`${bgImage} h-[271px] flex items-center justify-center rounded-2xl lg:h-full lg:w-1/2`}>
                    {/* H1 only visible for small screens */}
                    <h1 className="text-white text-3xl text-center lg:hidden flex flex-col sm:text-4xl"><span className="font-bold mb-[-15px]">Hello again,</span><span>glad to see you!</span></h1>
                </div>
                {/* Form */}
                <div className="w-5/6 max-w-[500px] self-center flex flex-col justify-center grow lg:h-full lg:w-[330px] lg:mx-auto lg:grow-0">
                    {/* H1 only visible for large screens */}
                    <h1 className="text-auth-slate text-3xl text-center hidden lg:flex flex-col mb-[20px]"><span className="font-bold mb-[-15px]">Hello again,</span><span>glad to see you!</span></h1>
                    {/* Instruction */}
                    <p className="text-auth-slate font-bold mb-2">Log in to your account</p>
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
                    className="h-[52.8px] rounded-lg mb-2 text-auth-slate px-5 placeholder:text-auth-gray border-auth-silver border-[1px] outline-none outline-offset-0 focus:outline-auth-blue" />
                    {/* Forgot password */}
                    <p 
                    className="text-right text-auth-gray text-sm mb-3 hover:cursor-pointer"
                    onClick={selectForgetPassword}>Forget password?</p>
                    {/* Show error message if there is something wrong*/}
                    {errorMessage !== "" && 
                    <div className="h-[52.8px] rounded-lg mb-4 text-auth-red-txt px-5 border-auth-red-txt border-[1px] bg-auth-red-bg flex items-center justify-between">
                        {errorMessage} 
                        <FaXmark 
                        className="hover:cursor-pointer"
                        onClick={closeErrorMessage}/>
                    </div>}
                    {/* Login Button */}
                    <Button 
                    onClick={handleLogin}
                    className="bg-auth-blue text-white mb-4 shadow-md shadow-grayish-104 hover:bg-auth-blue-h active:bg-auth-blue transition-colors text-lg"
                    >Login</Button>
                    {/* Sign Up now */}
                    <p className="text-auth-gray">Don't have an account? <span onClick={selectSignUp} className="text-auth-blue font-bold hover:cursor-pointer hover:text-auth-blue-h transition-colors">Sign up now</span></p>
                    {/* Or text */}
                    <div className="flex justify-center items-center my-7 mt-6">
                        <div className="w-20 h-[2px] bg-auth-blue"></div>
                        <span className="mx-5 text-auth-gray text-base">Or</span>
                        <div className="w-20 h-[2px] bg-auth-blue"></div>
                    </div>
                    {/* Continue with Google */}
                    <Button className="flex items-center justify-center text-auth-slate border-auth-slate border-[2px] p-2.5 hover:border-auth-slate-h hover:text-auth-slate-h active:text-auth-slate active:border-auth-slate transition-colors font-normal text-lg" 
                    bgVoid={true}
                    onClick={signInWithGoogle}>
                        <FaGoogle className="text-xl" /> 
                        <span className="ml-2">Continue with Google</span>
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default Login