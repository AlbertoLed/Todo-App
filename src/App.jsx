import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentication from './components/Authentication/Authentication'
import Login from './components/Authentication/Login'
import SignUp from './components/Authentication/SignUp'
import Homepage from './components/Homepage'
import AuthRequired from './components/Authentication/AuthRequired'

function App() {
  return (
    <BrowserRouter>
      <Authentication>
          <Routes> 
            <Route  element={<AuthRequired />} > 
              <Route path="/Todo-App/" element={<Homepage />} />
            </Route>
            <Route path="/Todo-App/login/" element={<Login />} />
            <Route path="/Todo-App/signup/" element={<SignUp />} />
          </Routes>
      </Authentication>
    </BrowserRouter>
  )
} 

export default App
