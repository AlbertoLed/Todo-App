import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser } from 'firebase/auth'
import { auth } from './firebase'
import Authentication from './components/Authentication/Authentication'
import Homepage from './components/Homepage'

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false)

  // Check login
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if(data) {
        // console.log('login')
        // console.log(data)
        setIsLogedIn(true)
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
      // console.log(res)
    } catch(error) {
      // console.log(error)
    }
  }
  // Login user
  async function signInUser(email, password) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
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
      // console.log(error)
    }
  }

  return isLogedIn ?
      <Homepage signOutAccount={signOutAccount} deleteAccount={deleteAccount} />
    : <Authentication createUser={createUser} signInUser={signInUser} />
} 

export default App
