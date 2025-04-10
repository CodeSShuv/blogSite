import {   useState} from 'react';
import LoginContext from '../loginContext';


const LoginState = ({children}) => {
    const [loginInput, setLoginInput] = useState({
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