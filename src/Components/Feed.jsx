import { useContext,useEffect } from 'react'
import blogContext from '../Context/blogContext'
import alertContext from '../Context/alertContext'
import Card from './Card'
import axios from 'axios'


const Feed = ({publicFeed}) => {
const {showAlert} = useContext(alertContext);


    const { blogs, setBlogs } = useContext(blogContext);
    

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
            showAlert("some error occured", false);
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
  return <Card publicFeed={publicFeed} key={element._id} id={element._id} title={element.title} content={element.content} userName={element?.userId?.firstName?.charAt(0).toUpperCase() + element?.userId?.firstName?.slice(1) + ' ' + element?.userId?.lastName?.charAt(0).toUpperCase() + element?.userId?.lastName?.slice(1)} likesCount={element.likesCount} commentsCount={element?.commentsCount} visibility={false} deleteBlog={false} editBlog={false}/>
}) : <>
  <p>no blogs....... :(</p>
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