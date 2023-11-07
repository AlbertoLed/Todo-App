import { useState, useContext } from "react"
import Button from "../Button"
import { FaXmark } from "react-icons/fa6"
import { AuthenticationContext } from "./Authentication"

export default function PasswordReset() {
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { resetPassword } = useContext(AuthenticationContext)

    const handleEmail = (event) => setEmail(event.target.value)

    const handleSendResetPasswordEmail = async () => {
        const res = await resetPassword(email)
        // console.log(res)
        
        // If res is undefined then the email was sended
        // If not there is an error with the email
        if(typeof res !== 'undefined') {
            setErrorMessage("Incorrect email.")
        }
    }

    const closeErrorMessage = () => setErrorMessage("")

    return(
        <main className="font-jos min-h-[100vh] bg-auth-bg text-white flex flex-col justify-center items-center">
            {/* H1 only visible for large screens */}
            <h1 className="text-auth-slate text-6xl text-center flex flex-col mb-[60px] font-bold uppercase">Todo</h1>
            {/* Card  */}
            <div className="flex flex-col w-[90%] max-w-[430px] p-8 bg-auth-card rounded-2xl shadow-lg shadow-grayish-104">
                <h2 className="text-auth-slate text-2xl text-center flex flex-col mb-[20px] font-bold">Reset your password</h2>
                <p className="text-auth-slate mb-2">Enter your email address and we will send you a password reset link. </p>
                {/* Email input */}
                <input 
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleEmail}
                    // onKeyDown={handleEnter}
                    value={email}
                    className="h-[52.8px] rounded-lg mb-4 text-auth-slate px-5 placeholder:text-auth-gray border-auth-silver border-[1px] outline-none outline-offset-0 focus:outline-auth-blue" />
                {/* Show error message if there is something wrong*/}
                {errorMessage !== "" && 
                <div className="h-[52.8px] rounded-lg mb-4 text-auth-red-txt px-5 border-auth-red-txt border-[1px] bg-auth-red-bg flex items-center justify-between">
                    {errorMessage} 
                    <FaXmark                         
                    className="hover:cursor-pointer"
                    onClick={closeErrorMessage}/>
                </div>}
                {/* Reset button */}
                <Button 
                onClick={handleSendResetPasswordEmail}
                className="bg-auth-blue text-white mb-4 shadow-md shadow-grayish-104 hover:bg-auth-blue-h transition-colors text-lg"
                >Send password reset email</Button>
            </div>
        </main>
    )
}