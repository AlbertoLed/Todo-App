import Button from "../Button"
import { useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6"

function AuthenticationOption() {
    const navigate = useNavigate()

    const selectLogin = () => navigate("/Todo-App/login/")
    const selectSignUp = () => navigate("/Todo-App/signup/")

    const bgImage = `bg-[url("./assets/bg-auth-mobile.jpg")] bg-center bg-cover lg:bg-[url("./assets/bg-auth-desktop.jpg")]`
 
    return(
        <main className="font-jos min-h-[100vh] bg-auth-bg text-white flex flex-col justify-center items-center">
            {/* Card */}
            <div className="flex flex-col w-[90%] max-w-[630px] min-h-[640px] max-h-[754px] h-[90vh] my-5 bg-auth-card rounded-2xl shadow-lg shadow-grayish-104 lg:flex-row-reverse lg:h-[700px] lg:max-w-[1160px]">
                {/* H1 and Background image */}
                <div className={`${bgImage} h-1/2 flex items-center justify-center rounded-2xl lg:h-full lg:w-1/2`}>
                    {/* H1 only visible for small screens */}
                    <h1 className="uppercase text-white text-7xl font-bold tracking-[.1em] text-center lg:hidden">Todo</h1>
                </div>
                {/* Form */}
                <div className="w-5/6 h-1/2 self-center flex flex-col justify-center lg:h-full lg:w-[330px] lg:mx-auto">
                    {/* H1 only visible for large screens */}
                    <h1 className="uppercase text-auth-slate text-7xl font-bold tracking-[.1em] text-center mb-[60px] hidden lg:block">Todo</h1>
                    {/* Login Button */}
                    <Button 
                    className="bg-auth-blue text-white mb-4 shadow-md shadow-grayish-104 hover:bg-auth-blue-h transition-colors text-lg"
                    onClick={selectLogin}>Login</Button>
                    {/* Sign Up button */}
                    <Button 
                    className="border-auth-blue text-auth-blue border-[2px] p-2.5 hover:border-auth-blue-h hover:text-auth-blue-h transition-colors text-lg" 
                    bgVoid={true}
                    onClick={selectSignUp}>Sign Up</Button>
                    {/* Or text */}
                    <div className="flex justify-center items-center my-7">
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

export default AuthenticationOption