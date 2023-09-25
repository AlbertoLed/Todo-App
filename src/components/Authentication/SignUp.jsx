import { useState } from "react"
import { IconContext } from "react-icons"
import { FaAngleLeft } from "react-icons/fa6"

function SignUp({createUser, goBack}) {
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
        secondPass: ""
    })
    console.log(formData)

    function handleData(event) {
        const {name, value} = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    function handleSignUp() {
        if(formData.pass === formData.secondPass) {
            createUser(formData.email, formData.pass)
        } 
        else {
            console.log('pass wrong')
        }
    }

    return(
        <>
            <IconContext.Provider value={{size:"35px", className:"mt-7 hover:cursor-pointer"}}>
                <FaAngleLeft onClick={goBack} />
            </IconContext.Provider>

            <h1 className="text-3xl mb-9 mt-auto text-center flex flex-col leading-10 max-w-[500px] mx-auto w-full md:text-5xl"><span className="font-bold">Create Accout</span> <span>to get started now!</span></h1>
            <input 
            type="email" 
            placeholder="Email Address" 
            name="email"
            onChange={handleData}
            value={formData.email}
            className="mb-3 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
            <input 
            type="password" 
            placeholder="Password" 
            name="pass"
            onChange={handleData}
            value={formData.pass}
            className="mb-3 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
            <input 
            type="password" 
            placeholder="Confirm Password" 
            name="secondPass"
            onChange={handleData}
            value={formData.secondPass}
            className="mb-9 p-3 bg-violet-100 border-white border-[1px] rounded-md outline outline-transparent outline-1 focus:outline-white placeholder:text-grayish-101 max-w-[500px] mx-auto w-full" />
            <button 
            className="bg-white text-black font-bold p-3 rounded-md max-w-[500px] mx-auto w-full shadow-lg"
            onClick={handleSignUp}
            >Sign Up</button>
            <p className="mt-auto mb-12 text-center max-w-[500px] mx-auto w-full">Already have an account? <span className="font-bold">Login Now</span></p>
        </>
    )
}

export default SignUp