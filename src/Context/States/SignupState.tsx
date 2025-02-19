import { useState } from "react"
import SignupContext from "../signupContext.tsx"
interface SignpuInputState{
  firstName:string,
  lastName:string,
  email:string,
  password:string
}
const SignupState = (props: any) => {
    const [signupInputState, setSignupInputState] = useState<SignpuInputState>({
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