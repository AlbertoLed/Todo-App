import Button from "../Button"
import { useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6"

function AuthenticationOption() {
    const navigate = useNavigate()

    const selectLogin = () => navigate("/Todo-App/login/")
    const selectSignUp = () => navigate("/Todo-App/signup/")

    const bgImage = `bg-[url("./assets/bg-auth-mobile.jpg")] bg-center`

    return(
        <main 
        className="min-h-[100vh] bg-auth-bg text-white flex flex-col justify-center items-center"
        // className="min-h-[100vh] bg-gradient-to-b from-violet-200 to-dark-sky text-white flex flex-col px-7 justify-center"
        >
            {/* <h1 className="uppercase text-white text-4xl md:text-4xl font-bold tracking-[.3em] mb-[70px] text-center">Todo</h1>
            <Button 
            className="mb-5"
            onClick={selectLogin}
            >Login</Button>
            <Button
            onClick={selectSignUp} 
            bgVoid={true}
            >Sign Up</Button> */}
            <div className="w-[90%] min-h-[90vh] h-[90vh] bg-auth-card rounded-2xl">
                <div className={`${bgImage} h-1/2 min-h-[290px] flex items-center justify-center rounded-2xl`}>
                    <h1 className="uppercase text-white text-6xl font-bold tracking-[.1em] text-center md:text-4xl">Todo</h1>
                </div>
                <div>
                    <Button>Login</Button>
                    <Button>Sign Up</Button>
                    <div>
                        Or
                    </div>
                    <Button className="flex items-center justify-center">
                        <FaGoogle /> 
                        <span className="ml-2">Continue with Google</span>
                    </Button>
                </div>
            </div>
        </main>
        
    )
}

export default AuthenticationOption