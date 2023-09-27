import { useContext } from "react"
import { UserMenuContext } from "./Menu"

function UserMenuButton({children}) {
    const {toggleMenu} = useContext(UserMenuContext)

    return(
        <div onClick={toggleMenu}>{children}</div>
    )
}

export default UserMenuButton