import { useState,useContext } from "react";
import blogContext,{Blog} from "../Context/blogContext";
import axios from "axios";

const BlogEditor = () => {
  const {setBlogs} = useContext(blogContext)
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [blogPrivacy , setBlogPrivacy] = useState<string>("Public");

  const handleSubmit = async(e:any) => {
    e.preventDefault();
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <select value={blogPrivacy}  onChange={(event)=> {setBlogPrivacy(event.target.value);}}name="privacy" id="access">
  <option value="Public">Public</option>
  <option value="Private">Private</option>
  
</select>
        <div>
          <label className="block font-semibold">Blog Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Blog Content:</label>
          <textarea
            className="w-full p-2 border rounded-md h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your blog here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Publish
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
