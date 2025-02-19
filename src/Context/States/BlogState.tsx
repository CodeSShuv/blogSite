import { useState } from "react";
import BlogContext, {Blog} from "../blogContext"

const BlogState = (props: any) => {
  const [blogs, setBlogs] = useState<Blog[] |[] >([])
 
  return (
    <>
      <BlogContext.Provider value={{ blogs, setBlogs }} >
        {props.children}
      </BlogContext.Provider>
    </>
  )
}

export default BlogState;