import Button from "../Button"

function AuthenticationOption(props) {
    const {selectLogin, selectSignUp} = props
    return(
        <>
            <h1 className="uppercase text-white text-4xl md:text-4xl font-bold tracking-[.3em] mb-[70px] text-center">Todo</h1>
            <Button 
            className="mb-5"
            onClick={selectLogin}
            >Login</Button>
            <Button
            onClick={selectSignUp} bgVoid={true}
            >Sign Up</Button>
        </>
        
    )
}

export default AuthenticationOption