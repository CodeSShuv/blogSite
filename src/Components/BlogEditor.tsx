import { useState,useContext } from "react";
import blogContext,{Blog} from "../Context/blogContext";
import axios from "axios";
import "./Css/blogeditor.css"
const BlogEditor = ({blogTitle,blogContent,visibility,isEditing, blogId,setIsEditing}:{blogTitle?:string,blogContent?:string, visibility?:string, isEditing?:boolean, blogId?:string, setIsEditing?:any}) => {
  const {blogs,setBlogs} = useContext(blogContext)
  const [title, setTitle] = useState<string>(blogTitle??"");
  const [content, setContent] = useState<string>(blogContent??"");
  const [blogPrivacy , setBlogPrivacy] = useState<string>(visibility??"Public");

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    if(isEditing){
      const model ={
        
        title:title,
        content:content,
        visibility:blogPrivacy
        
      }
      
      try{
        // {id, title, content, privacy}
        await axios.post(`http://localhost:8080/blogs/update/${blogId}`,model, {withCredentials:true} );
        setBlogs(blogs.map((e:any)=>{
       
          if(blogId?.trim() === e._id){
            e.title = title;
            e.content = content;
            e.visibility = blogPrivacy
            
            return{
              ...e
  
            }
            
          }return e;
        }));
      }catch(e){
        alert("Error: ")

      }
     
      

      setIsEditing(false);
      return;
    
      // try{
      //   await axios.post("http://localhost:8080/blogs/update", model, {withCredentials:true});
        
      //   alert("The blog has been posted:)");
      // }catch{

      // }
      // setIsEditing(false)
    }


    
    if(title === "" || content === "") return 
    const model ={
      title:title,
      content:content,
      visibility:blogPrivacy
    }
   
    try{
      const  res= await axios.post("http://localhost:8080/blogs/publish", model, {withCredentials:true});
      setBlogs((prev:Blog[])=>[...prev,{title:title,content:content}]);
      alert("The blog has been posted:)");

    }catch(err:any){
      alert("There was an error while posting the blog.")
    }    

  };

  return (
    <div className="blogEditor">
      <h2 className="text-2xl font-bold mb-2 mt-4">{isEditing? "Update a Blog Post":"Create a Blog Post"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <select value={blogPrivacy}  onChange={(event)=> {setBlogPrivacy(event.target.value);}}name="privacy" id="access">
  <option value="Public">Public</option>
  <option value="Private">Private</option>
  
</select>
        <div>
          <div>

          <label className="block font-semibold">Blog Title:</label>
          </div>
          <input
          id="inputTitle"
            type="text"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <div>

          <label className="block font-semibold">Blog Content:</label>
          </div>
          <textarea
          id="inputContent"
            className="p-2 border rounded-md h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your blog here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full" id="publish-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
