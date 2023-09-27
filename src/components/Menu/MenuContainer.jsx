import { useContext } from "react"
import { UserMenuContext } from "./Menu"

function UserMenuContainer({children}) {
    const {isMenuOpen} = useContext(UserMenuContext)

    return isMenuOpen ? children : null
}

export default UserMenuContainer