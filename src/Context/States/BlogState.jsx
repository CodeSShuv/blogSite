import { useState } from "react";
import BlogContext from "../blogContext"

const BlogState = (props) => {
  const [blogs, setBlogs] = useState([])
 
  return (
    <>
      <BlogContext.Provider value={{ blogs, setBlogs }} >
        {props.children}
      </BlogContext.Provider>
    </>
  )
}

export default BlogState;