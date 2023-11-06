import { useState, useEffect, createContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
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
        } catch(error) {
            // console.log(error)
            return error
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
            return error
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
            return res
            // console.log(res)
        } 
        catch(error) {
            // console.log(error)
            return error
        }
    }

    // Reauthenticate
    async function reauthenticateUser(pass) {
        // Gete the current user
        const user = auth.currentUser

        // Create the credential
        const credential = EmailAuthProvider.credential(user.email, pass)
        // console.log(credential)

        try {
            // Try to reauthenticate, if succeeded then return "authenticated"
            const res = await reauthenticateWithCredential(user, credential)
            // console.log(res)
            return "authenticated"
        }
        catch(error) {
            // If there is an error then return the error code

            // console.log(error)
            return error.code
        }
    }

    return(
        <>
        <AuthenticationContext.Provider 
        value={{isLogedIn, email, createUser, signInUser, signOutAccount, deleteAccount, reauthenticateUser}}>
            {children}
        </AuthenticationContext.Provider>
        </>
        
    )
}

export default Authentication
export { AuthenticationContext }