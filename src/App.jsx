import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
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
        // console.log('NOT login')
      }
    })
  }, [])

  // Create user in firebase
  async function createUser(email, password) {
    try {
      console.log('try create account')
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
    } catch(error) {
      console.log(error)
    }
  }
  // Login user
  async function signInUser(email, password) {
    try {
      console.log('try sign in')
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log(res)
    }
    catch(error) {
      console.log(error)
    }
  }

  return isLogedIn ?
      <Homepage />
    : <Authentication createUser={createUser} signInUser={signInUser} />
} 

export default App
