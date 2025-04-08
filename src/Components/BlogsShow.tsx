
import blogContext, { Blog } from '../Context/blogContext'
import BlogEditor from './BlogEditor'
import Card from './Card'
import axios from 'axios'
import  { useContext, useEffect,useState } from 'react'

const BlogsShow = ({publicFeed}:{publicFeed:boolean}) => {

  const { blogs, setBlogs } = useContext<{ blogs: Blog[] | [], setBlogs: Function }>(blogContext);
  const [blogContent, setBlogContent] = useState({
    title:"",
    content:"",
    privacy:"",
    blogId:""
  });
  //Helps to checks if the person is editing the content or not.
  const [isEditing, setIsEditing] = useState(false);

  //for editing the user's own blogs.
  const editBlog = (title:string ,content:string,privacy:string,id:string)=>{
    console.log(id)
    setBlogContent({
      title:title ,
      content:content,
      privacy:privacy,
       blogId:id
    })
    setIsEditing(true);
  }
  
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
    <>
   {isEditing? <BlogEditor blogTitle={blogContent.title}blogContent={blogContent.content}visibility = {blogContent.privacy} isEditing = {isEditing} blogId={blogContent.blogId} setIsEditing = {setIsEditing}/>:<></>}
   {publicFeed? <div style={style.blogsCards} className= "blogsCardContainer">

      {blogs.length != 0 ? blogs.map((element) => {
        if (element.title === "" || element.content === "") return
        return <Card publicFeed={publicFeed}deleteBlog={deleteBlog} key={element._id} id={element._id} title={element.title} content={element.content} visibility= {element.visibility} editBlog = {editBlog}  />
      }) : <>
       <p>No Blogs yet..</p>
      </>}
    </div>:(!isEditing?<div style={style.blogsCards} className= "blogsCardContainer">

{blogs.length != 0 ? blogs.map((element) => {
  if (element.title === "" || element.content === "") return
  return <Card publicFeed={publicFeed}deleteBlog={deleteBlog} key={element._id} id={element._id} title={element.title} content={element.content} visibility= {element.visibility} editBlog = {editBlog} likesCount = {element.likesCount}  />
}) : <>
 <p>No Blogs yet..</p>
</>}
</div>:"")  }
      </>
  )
}

export default BlogsShow

const style = {
  blogsCards :{
    padding: "4rem"
  }
}