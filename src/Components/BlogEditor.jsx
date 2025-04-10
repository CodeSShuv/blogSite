import { useState, useContext } from "react";
import blogContext from "../Context/blogContext";
import alertContext from "../Context/alertContext";
import axios from "axios";
import "./Css/blogeditor.css"
import Title from "./Title";
import Paragraph from "./Paragraph"

const BlogEditor = ({ blogTitle, blogContent, visibility, isEditing, blogId, setIsEditing }) => {
  const { blogs, setBlogs } = useContext(blogContext)
  const [title, setTitle] = useState(blogTitle ?? "");
  const [content, setContent] = useState(blogContent ?? "");
  const [blogPrivacy, setBlogPrivacy] = useState(visibility ?? "Public");
  const { showAlert } = useContext(alertContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const model = {

        title: title,
        content: content,
        visibility: blogPrivacy

      }

      try {
        // {id, title, content, privacy}
        await axios.post(`http://localhost:8080/blogs/update/${blogId}`, model, { withCredentials: true });
        setBlogs(blogs.map((e) => {

          if (blogId?.trim() === e._id) {
            e.title = title;
            e.content = content;
            e.visibility = blogPrivacy

            return {
              ...e

            }

          } return e;
        }));
      } catch (e) {
        showAlert(e, false)

      }



      setIsEditing(false);
      return;

    }



    if (title === "" || content === "") return
    const model = {
      title: title,
      content: content,
      visibility: blogPrivacy
    }

    try {
      const res = await axios.post("http://localhost:8080/blogs/publish", model, { withCredentials: true });
      setBlogs((prev) => [...prev, { title: title, content: content }]);
      showAlert("The blog has been posted:)", true);
      setTitle("");setContent("");setBlogPrivacy("Public")
    } catch (err) {
      showAlert("There was an error while posting the blog.", false)
    }
  };


  const changeTitleContent = (e) => {
    if (e.target.innerText === "") {
      setTitle('');
    }
    const value = e.target.innerText;

    setTitle(value);

  }
  const changeParagraphContent = (e) => {
    if (e.target.innerText === "") {
      setContent('');
    }
    const value = e.target.innerText;

    setContent(value);

  }






  return (
    <div className="blogEditor">
      <h2 autoFocus className="text-2xl font-bold mb-2 mt-4">{isEditing ? "Update a Blog Post" : "Create a Blog Post"}</h2>
      <div className="selections">

      <select name="visibility" onChange={(e)=>{
        setBlogPrivacy(e.target.value)
      }} id="visibility-select">
        {/* <opti on value="">--Choose a color--</option> */}
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        
      </select>
      </div>
      <Title
        changeTitleContent={changeTitleContent}
        titleContent={title}
      />
      <Paragraph
        changeParagraphContent={changeParagraphContent}
        paragraphContent={content}
      />
      
      <button onClick={handleSubmit} className="btn btn-publish">Publish</button>
    </div>
  );
};

export default BlogEditor;
