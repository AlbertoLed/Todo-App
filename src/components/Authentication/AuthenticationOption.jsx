import Button from "../Button"
import { useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6"

function AuthenticationOption() {
    const navigate = useNavigate()

    const selectLogin = () => navigate("/Todo-App/login/")
    const selectSignUp = () => navigate("/Todo-App/signup/")

    const bgImage = `bg-[url("./assets/bg-auth-mobile.jpg")] bg-center`

    return(
        <main className="min-h-[100vh] bg-auth-bg text-white flex flex-col justify-center items-center">
            {/* Card */}
            <div className="flex flex-col w-[90%] min-h-[640px] max-h-[754px] h-[90vh] my-5 bg-auth-card rounded-2xl">
                {/* H1 and Background image */}
                <div className={`${bgImage} h-1/2 flex items-center justify-center rounded-2xl`}>
                    <h1 className="uppercase text-white text-6xl font-bold tracking-[.1em] text-center md:text-4xl">Todo</h1>
                </div>
                {/* Form */}
                <div className="w-5/6 h-1/2 self-center flex flex-col justify-center">
                    {/* Login Button */}
                    <Button 
                    className="bg-auth-blue text-white mb-4"
                    onClick={selectLogin}>Login</Button>
                    {/* Sign Up button */}
                    <Button 
                    className="border-auth-blue text-auth-blue border-[2px] p-2.5" 
                    bgVoid={true}
                    onClick={selectSignUp}>Sign Up</Button>
                    {/* Or text */}
                    <div className="flex justify-center items-center">
                        <div className="w-20 h-[2px] bg-auth-blue"></div>
                        <span className="mx-5 my-7 text-auth-gray text-xs">Or</span>
                        <div className="w-20 h-[2px] bg-auth-blue"></div>
                    </div>
                    {/* Continue with Google */}
                    <Button className="flex items-center justify-center text-auth-slate border-auth-slate border-[2px] p-2.5" bgVoid={true}>
                        <FaGoogle className="text-xl" /> 
                        <span className="ml-2">Continue with Google</span>
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default AuthenticationOption