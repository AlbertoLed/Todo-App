import Button from "../Button"
import { useNavigate } from "react-router-dom"

function AuthenticationOption() {
    const navigate = useNavigate()

    const selectLogin = () => navigate("/Todo-App/login/")
    const selectSignUp = () => navigate("/Todo-App/signup/")

    return(
        <main className="min-h-[100vh] bg-gradient-to-b from-violet-200 to-dark-sky text-white flex flex-col px-7 justify-center">
            <h1 className="uppercase text-white text-4xl md:text-4xl font-bold tracking-[.3em] mb-[70px] text-center">Todo</h1>
            <Button 
            className="mb-5"
            onClick={selectLogin}
            >Login</Button>
            <Button
            onClick={selectSignUp} 
            bgVoid={true}
            >Sign Up</Button>
        </main>
        
    )
}

export default AuthenticationOption