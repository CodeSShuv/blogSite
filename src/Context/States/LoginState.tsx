import { ReactNode , useState} from 'react';
import LoginContext, {LoginInput} from '../loginContext';


const LoginState = ({children}:{children: ReactNode}) => {
    const [loginInput, setLoginInput] = useState<LoginInput>({
        email:"",
        password:""
    })
  return (
    <LoginContext.Provider value={{loginInput, setLoginInput}}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginState