import { useState, useContext } from "react"
import { db } from '../firebase'
import { deleteDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { AuthenticationContext } from './Authentication/Authentication'
import { FaXmark } from "react-icons/fa6"

export default function DeleteAccountDialogue({toggleDeleteDialogue, currentDocId}) {
    const [pass, setPass] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { deleteAccount, reauthenticateUserWithPassword, providerId, reauthenticateUserWithGoogle } = useContext(AuthenticationContext)

    // Handle the password input
    const handlePass = (event) => setPass(event.target.value)

    // Delete Account
    async function handleDeleteAccountWithPassword() {
        // Reauthenticate the user
        const reauthenticateRes = await reauthenticateUserWithPassword(pass)
        // console.log(res)
        
        if(reauthenticateRes === "authenticated") {
            // If succeeded then continue with delete account

            // Get the doc ref
            const docRef = doc(db, 'todo', currentDocId)

            // Delete the user's doc with the notes
            const deleteDocRes = await deleteDoc(docRef)
            // console.log(deleteDocRes)

            // Delete the account
            const deleteAccountRes = await deleteAccount()
            // console.log(deleteAccountRes)
        }
        else {
            // If not, then show an error message
            setErrorMessage("Incorrect password.")
            // console.log(reauthenticateRes)
        }
    }
    async function handleDeleteAccountWithGoogle() {
        // Reauthenticate the user
        const reauthenticateRes = await reauthenticateUserWithGoogle()
        // console.log(reauthenticateRes)

        if(reauthenticateRes === "authenticated") {
            // If succeeded then continue with delete account

            // Get the doc ref
            const docRef = doc(db, 'todo', currentDocId)

            // Delete the user's doc with the notes
            const deleteDocRes = await deleteDoc(docRef)
            // console.log(deleteDocRes)

            // Delete the account
            const deleteAccountRes = await deleteAccount()
            // console.log(deleteAccountRes)
        }
        else {
            // Something went wrong, show an error message
            setErrorMessage("Something went wrong. Please try again.")
        }
    }

    // Close the error message
    const closeErrorMessage = () => setErrorMessage("")

    return(
        <div className='bg-black bg-opacity-40 w-full min-h-[100vh] fixed top-0 left-0 flex items-center justify-center z-20'>
            {/* Card */}
            <div className='grid grid-cols-2 gap-x-2 w-80 p-5 rounded-lg overflow-hidden bg-grayish-100 text-slate-100 dark:bg-slate-200 dark:text-grayish-200'>
                {/* Title */}
                <h1 className="col-span-2 mb-4 text-2xl font-bold">Delete account</h1>
                {/* Instructions */}
                <p className='col-span-2 mb-4'>Are you sure you want to delete your account? This action can't be undone.</p>
                {providerId !== "google.com" ?
                    <div className="col-span-2">
                        <p className="mb-4">Please type your password to confirm deletion of your account.</p>
                        {/* Password input */}
                        <input 
                        type="password" 
                        placeholder="Password"
                        onChange={handlePass}
                        value={pass}
                        className="w-full mb-4 py-2 px-4 rounded-lg outline-none outline-offset-0 focus:outline-violet-200 bg-white text-slate-100 dark:bg-grayish-200 dark:text-grayish-209" />
                    </div>
                : <p className="col-span-2 mb-4">A Pop-up will appear to confirm your google account.</p>
                }
                {/* Show error message if there is something wrong*/}
                {errorMessage !== "" && 
                    <div className="col-span-2 py-2 px-4 rounded-lg mb-4 text-red-500 border-red-500 border-[1px] bg-red-200 flex items-center justify-between">
                        {errorMessage} 
                        <FaXmark 
                        className="hover:cursor-pointer"
                        onClick={closeErrorMessage}/>
                    </div>}
                {/* Cancel button */}
                <button 
                className='p-2 rounded-lg transition-colors bg-slate-100 bg-opacity-10 hover:bg-opacity-20 dark:bg-grayish-200 dark:bg-opacity-5 dark:hover:bg-opacity-20'
                onClick={toggleDeleteDialogue}
                >Cancel</button>
                {/* Delete button */}
                <button 
                className='p-2 rounded-lg transition-colors text-grayish-100 bg-red-500 bg-opacity-100 hover:bg-opacity-80 dark:bg-red-600 dark:bg-opacity-75 dark:hover:bg-opacity-50'
                onClick={providerId !== "google.com" ? handleDeleteAccountWithPassword : handleDeleteAccountWithGoogle}
                >Delete</button>           
            </div>
        </div>
    )
}