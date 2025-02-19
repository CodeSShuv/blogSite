
import blogContext, { Blog } from '../Context/blogContext'
import Card from './Card'
import axios from 'axios'
import { useContext, useEffect } from 'react'

const BlogsShow = () => {

  const { blogs, setBlogs } = useContext<{ blogs: Blog[] | [], setBlogs: Function }>(blogContext);



  // for fetching the notes as soon as the component is rendered
  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:8080/blogs", { withCredentials: true });

    if (blogs.length != res.data.blogs) {


      try {

        if (!res.data.blogs) return
        setBlogs(res.data.blogs)

      } catch (err) {
        console.log(err)
      }
    }

  }
  const deleteBlog = async (id: string) => {
    if (id != "defaultKey") {
      console.log(id)
      try {
        await axios.delete(`http://localhost:8080/blogs/items/${id}`, { withCredentials: true });
      } catch (error) {
        alert("Failed to delete the item");
      }
    }

    const newArray = blogs.filter((ele) => {
      if (ele._id != id) {
        return ele;
      }
    });
    setBlogs(newArray);
  }
  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <div>

      {blogs.length != 0 ? blogs.map((element, index) => {
        if (element.title === "" || element.content === "") return
        return <Card deleteBlog={deleteBlog} key={element._id} id={element._id} title={element.title} content={element.content} index={index} />
      }) : <>
        <Card deleteBlog={deleteBlog} key={"defaultKey"} id={"defaultKey"} title={"no blogs yet"} content={"Create a blog... express your thought."} index={-1} />
      </>}
    </div>
  )
}

export default BlogsShow