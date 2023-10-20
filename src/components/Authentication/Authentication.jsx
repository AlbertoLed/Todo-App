import { useState, useEffect, createContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const AuthenticationContext = createContext()

function Authentication({children}) {
    const [isLogedIn, setIsLogedIn] = useState(null)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    // Check login
    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
        if(data) {
            // console.log('login')
            setIsLogedIn(true)
            setEmail(data.reloadUserInfo.email)
        }
        else {
            setIsLogedIn(false)
            // console.log('NOT login')
        }
        })
    }, [])

    // Create user in firebase
    async function createUser(email, password) {
        try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        navigate("/Todo-App/")
        // console.log(res)
        } catch(error) {
        // console.log(error)
        }
    }
    // Login user
    async function signInUser(email, password) {
        try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        navigate("/Todo-App/")
        // console.log(res)
        }
        catch(error) {
        // console.log(error)
        }
    }

    // Sign out
    function signOutAccount() {
        signOut(auth)
    }

    // Delete user
    async function deleteAccount() {
        const user = auth.currentUser
        try {
        const res = await deleteUser(user)
        console.log(res)

        } 
        catch(error) {
        console.log(error)
        }
    }

    return(
        <>
        <AuthenticationContext.Provider 
        value={{isLogedIn, email, createUser, signInUser, signOutAccount, deleteAccount}}>
            {children}
        </AuthenticationContext.Provider>
        </>
        
    )
}

export default Authentication
export { AuthenticationContext }