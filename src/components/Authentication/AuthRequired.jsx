import { useContext } from "react"
import { AuthenticationContext } from "./Authentication"
import AuthenticationOption from "./AuthenticationOption"
import { Outlet } from "react-router-dom"

function AuthRequired() {
    const {isLogedIn} = useContext(AuthenticationContext)
    return isLogedIn ? <Outlet /> : isLogedIn === false ? <AuthenticationOption /> : null
}

export default AuthRequired