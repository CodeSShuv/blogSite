import {  createContext } from "react";
import {User} from "./States/UserState";
interface  UserContext  {
   user:User | null;
   setUser:Function  ;
};
const defaultContext:UserContext = {
    user:{
        userId:'',
        firstName:'',
        lastName:'',
        email:''
    },
    setUser:()=>{}
}
const userContext = createContext<UserContext >(defaultContext);
export default userContext;