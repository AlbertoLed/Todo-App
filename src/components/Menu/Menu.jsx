import { useState, createContext } from "react"

const UserMenuContext = createContext()

function UserMenu({children}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(prev => !prev)


    return(
        <>
            <UserMenuContext.Provider value={{isMenuOpen, toggleMenu}}>{children}</UserMenuContext.Provider>
        </>
    )
}

export default UserMenu
export { UserMenuContext }