import { createContext } from "react";
export interface Blog{
    _id:string,
    title:string,
    content:string
}
const blogContext = createContext<any | null>(null);

export default blogContext;