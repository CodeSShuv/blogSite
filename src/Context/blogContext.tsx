import { createContext } from "react";
export interface Blog{
    // _id:string,
    // title:string,
    // content:string,
    // visibility:string,
    _id: string,
    userId: {_id:string, firstName:string,lastName:string},
    title: string,
    content: string,
    visibility: string,
    likesCount:number,
    commentsCount:number,
    createdAt: Date,
    updatedAt: Date,
}

const blogContext = createContext<any | null>(null);

export default blogContext;