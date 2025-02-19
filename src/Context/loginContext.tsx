import { createContext, Dispatch, SetStateAction } from "react";
export interface  LoginInput{
    email:string,
    password:string
}
interface LoginContextType {
    loginInput: LoginInput,
    setLoginInput: Dispatch<SetStateAction<LoginInput>>;
  }
const loginContext = createContext<LoginContextType>( {loginInput: { email: "", password: "" }, // Default values for loginInput
    setLoginInput: () => {}});
export default loginContext;