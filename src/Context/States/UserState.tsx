import  {useState} from 'react'
import UserContext from '../userContext'
export interface User{
    userId:string,
    firstName:string,
    lastName:string,
    email:string
};
const UserState = (props:any) => {
    
const [user,setUser] = useState<User | null>(null);
  return (
    <>
    <UserContext.Provider value={{user,setUser}}>
{props.children}
    </UserContext.Provider>
    </>
  )
}

export default UserState