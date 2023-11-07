import { useState, useEffect, createContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, reauthenticateWithCredential, reauthenticateWithPopup, EmailAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const AuthenticationContext = createContext()

function Authentication({children}) {
    const [isLogedIn, setIsLogedIn] = useState(null)
    const [email, setEmail] = useState('')
    const [providerId, setProviderId] = useState("")
    const navigate = useNavigate()

    // Check login
    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
        if(data) {
            // console.log('login')
            setIsLogedIn(true)
            setEmail(data.reloadUserInfo.email)
            setProviderId(data.reloadUserInfo.providerUserInfo[0].providerId)
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

    // Sign in with google 
    async function signInWithGoogle() {
        // Get the google auth provider
        const provider = new GoogleAuthProvider()

        try {
            // Sign in with popup
            const res = await signInWithPopup(auth, provider)
            navigate("/Todo-App/")

            // console.log(res)
            return res
        }
        catch(error) {
            // If there is an error then return the error
            return(error)
        }
    }

    // Reauthenticate
    async function reauthenticateUserWithPassword(pass) {
        // Get the current user
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
    async function reauthenticateUserWithGoogle() {
        // Get the current user
        const user = auth.currentUser

        // Get the google auth provider
        const provider = new GoogleAuthProvider()

        try {
            // Try to reauthenticate, if succeeded then return "authenticated"
            const res = await reauthenticateWithPopup(user, provider)
            // console.log(res)

            return "authenticated"
        }
        catch(error) {
            // If there is an error then return the error

            // console.log(error)
            return error
        }
    }

    return(
        <>
        <AuthenticationContext.Provider 
        value={{isLogedIn, email, providerId, createUser, signInUser, signOutAccount, deleteAccount, reauthenticateUserWithPassword, signInWithGoogle, reauthenticateUserWithGoogle}}>
            {children}
        </AuthenticationContext.Provider>
        </>
        
    )
}

export default Authentication
export { AuthenticationContext }