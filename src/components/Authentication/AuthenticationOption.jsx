import Button from "../Button"

function AuthenticationOption(props) {
    const {selectLogin, selectSignUp, goBack} = props
    return(
        <>
            <h1 className="uppercase text-white text-2xl md:text-4xl font-bold tracking-[.3em]">Todo</h1>
            <Button 
            onClick={selectLogin}
            >Login</Button>
            <Button
            onClick={selectSignUp} bgVoid={true}
            >Sign Up</Button>
        </>
        
    )
}

export default AuthenticationOption