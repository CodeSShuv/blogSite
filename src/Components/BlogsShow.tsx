
import blogContext, { Blog } from '../Context/blogContext'
import Card from './Card'
import axios from 'axios'
import  { useContext, useEffect } from 'react'

const BlogsShow = ({publicFeed}:{publicFeed:boolean}) => {

  const { blogs, setBlogs } = useContext<{ blogs: Blog[] | [], setBlogs: Function }>(blogContext);



  // for fetching the notes as soon as the component is rendered
  
  const fetchBlogs = async () => {
    const res = publicFeed? await axios.get("http://localhost:8080/blogs/feed", { withCredentials: true }):await axios.get("http://localhost:8080/blogs", { withCredentials: true })
    

    if (blogs.length != res.data.blogs) {


      try {

        if (!res.data.blogs){
          setBlogs([])
          return
        }
        res.data.blogs?.reverse()
        
        setBlogs(res.data.blogs)

      } catch (err) {
        console.log(err)
      }
    }

  }

  const deleteBlog = async (id: string) => {
    if (id != "defaultKey") {
 
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
    <div style={style.blogsCards} className= "blogsCardContainer">

      {blogs.length != 0 ? blogs.map((element) => {
        if (element.title === "" || element.content === "") return
        return <Card publicFeed={publicFeed}deleteBlog={deleteBlog} key={element._id} id={element._id} title={element.title} content={element.content} visibility= {element.visibility}  />
      }) : <>
        <Card publicFeed={publicFeed} deleteBlog={deleteBlog} key={"defaultKey"} id={"defaultKey"} title={"no blogs yet"} content={"Create a blog... express your thought."}  />
      </>}
    </div>
  )
}

export default BlogsShow

const style = {
  blogsCards :{
    padding: "4rem"
  }
}