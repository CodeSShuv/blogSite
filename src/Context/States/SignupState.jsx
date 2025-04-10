import { useState } from "react"
import SignupContext from "../signupContext.jsx"

const SignupState = (props) => {
    const [signupInputState, setSignupInputState] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
  return (
    <SignupContext.Provider value = {{signupInputState, setSignupInputState}}>
      {props.children}
    </SignupContext.Provider>
  )
}

export default SignupState