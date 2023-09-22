import { useState } from "react"
import AuthenticationOption from "./AuthenticationOption"
import SignUp from "./SignUp"

function Authentication() {
    const [loginSelected, setLoginSelected] = useState(null)

    const selectLogin = () => setLoginSelected(true)
    const selectSignUp = () => setLoginSelected(false)
    const goBack = () => setLoginSelected(null)

    return(
        <div className="min-h-[100vh] bg-gradient-to-b from-violet-200 to-dark-sky text-white flex flex-col px-7 justify-center">
            {loginSelected === null ? 
            <AuthenticationOption
            selectLogin={selectLogin}
            selectSignUp={selectSignUp}
            goBack={goBack}
            /> : 
            loginSelected ? 'login' : <SignUp />

            }
        </div>
    )
}

export default Authentication