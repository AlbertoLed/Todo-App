import { useContext } from "react"
import { useState } from "react"
import { AuthenticationContext } from "./Authentication"
import { useNavigate } from "react-router-dom"

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        pass: ""
    })
    const navigate = useNavigate()
    const {signInUser} = useContext(AuthenticationContext)

    const selectSignUp = () => navigate("/Todo-App/signup/")

    function handleData(event) {
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    function handleLogin() {
        signInUser(formData.email, formData.pass)
    }
    function handleEnter(e) {
        if(e.key === "Enter") {
            handleLogin()
        }
    }


    return(
        <main className="min-h-[100vh] bg-gradient-to-b from-violet-200 to-dark-sky text-white flex flex-col px-7 justify-center">
            <h1 className="text-3xl mb-9 mt-auto text-center flex flex-col leading-10 max-w-[500px] mx-auto w-full md:text-5xl"><span className="font-bold">Hello again,</span> <span>glad to see you!</span></h1>
            <p className="mb-3">Login in to your account.</p>
            <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            onChange={handleData}
            onKeyDown={handleEnter}
            value={formData.email}
            className="mb-3 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
            <input 
            type="password" 
            placeholder="Password" 
            name="pass"
            onChange={handleData}
            onKeyDown={handleEnter}
            value={formData.pass}
            className="mb-9 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
            
            <button 
            className="bg-white text-black font-bold p-3 rounded-md max-w-[500px] mx-auto w-full shadow-lg"
            onClick={handleLogin}
            >Login</button>
            <p className="mt-auto mb-12 text-center max-w-[500px] mx-auto w-full">Don't have an account? <span className="font-bold hover:cursor-pointer" onClick={selectSignUp}>Sign Up Now</span></p>
        </main>
    )
}

export default Login