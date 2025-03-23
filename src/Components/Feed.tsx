import blogContext, { Blog } from '../Context/blogContext'
import Card from './Card'
import axios from 'axios'
import  { useContext, useEffect } from 'react'

const Feed = ({publicFeed}:{publicFeed:boolean}) => {



    const { blogs, setBlogs } = useContext<{ blogs: Blog[] | [], setBlogs: Function }>(blogContext);


    const fetchBlogs = async () => {
        const res =  await axios.get("http://localhost:8080/blogs/feed", { withCredentials: true })
        
    
        if (blogs.length != res.data.blogs) {
    
    
          try {
    
            if (!res.data.blogs) {
                setBlogs([])
                return
            }
            setBlogs(res.data.blogs.reverse())
    
          } catch (err) {
            console.log(err)
          }
        }
    
      }
      useEffect(()=>{
        fetchBlogs()
      },[])

  return (
    <>
    <div style={style.blogsCards} className= "blogsCardContainer">

{blogs.length != 0 ? blogs.map((element, index) => {
  if (element.title === "" || element.content === "") return
  return <Card publicFeed={publicFeed} key={element._id} id={element._id} title={element.title} content={element.content}   userName ={element?.userId?.firstName?.charAt(0).toUpperCase() + element?.userId?.firstName?.slice(1) +' '  +element?.userId?.lastName?.charAt(0).toUpperCase() + element?.userId?.lastName?.slice(1)} />
}) : <>
  <Card publicFeed={publicFeed}  key={"defaultKey"} id={"defaultKey"} title={"no blogs yet"} content={"Create a blog... express your thought."}  />
</>}
</div>
    </>
  )
}

export default Feed
const style = {
    blogsCards :{
      padding: "4rem",
      
    }
  }