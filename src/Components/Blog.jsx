import React, { useEffect, useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import "./Css/blog.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import userContext from "../Context/userContext"
import CommentCard from "./CommentCard"

const Blog = () => {
    const [blog, setBlog] = useState({ blogId: null, title: null, content: null, firstName: null, lastName: null, userId:null });
    const { user } = useContext(userContext);
    const location = useLocation();
    const [commentList, setCommentList] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    ///This liked list store all the users that have liked a blog. This  is also used for showing the number of likes a blog has got by using its size. 
    //This can be replaced by likedCount which is also available but right now i have not done it yet.
    const [likedList, setLikedList] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(false);
    const getLikeList = async () => {
        // console.log("fetching in getLikeList")
        if (!blog.blogId) return
        // console.log('...')
        const likeRes = await axios.get(`http://localhost:8080/like/get-list/${blog.blogId}`, { withCredentials: true });
        setLikedList(likeRes.data.likes);
        likeRes.data.likes.map((e) => {

            if (e.likedBy === user?.userId) {
                // console.log(likeRes)
                setLike(true);
            }
        })


    }
    const fetchLikeCount = async () => {
        //this function helps to fetch the like count of a blog post 
        try {

            const res = await axios.get(`http://localhost:8080/like/get-total/${blog.blogId}`, { withCredentials: true });
            setLikeCount(res.data.totalLikes)
        } catch (error) {
            alert("Something went wrong : unable to get like count");
        }

    }
    const handelLike = async (e) => {
        try {
            await axios.put(`http://localhost:8080/like/${blog.blogId}`, {}, { withCredentials: true });
            // console.log("Liked");

            if (!like) {


                setLike(true);

                getLikeList();
                fetchLikeCount();

                return;

            }

            fetchLikeCount();
            getLikeList()
            setLike(false);

        } catch {
            alert("An error Occured..");
        }

    }


    const fetchBlogData = async () => {
        if (blog.blogId) return

        try {
            

            const res = await fetch(`http://localhost:8080/blogs/${window.location.href.split("=")[1]}`, {
                method: "GET",
                credentials: "include", // ← this is important for cookies
            });

            const data = await res.json()

            const blogContent = {
                blogId: data.blog._id,
                title: data.blog.title,
                content: data.blog.content,
                firstName: data.blog.userId.firstName,
                lastName: data.blog.userId.lastName,
                userId: data.blog.userId._id

            }
            setBlog(blogContent)


        } catch (e) {
            console.log(e)
            alert("Something went wrong.")
        }
    }
    const fetchCommentCount = async () => {
        try {
            const res = await axios.get("http://localhost:8080/comment/count/" + `${blog.blogId}`, { withCredentials: true });
            console.log(res.data.commentCount)
            setCommentCount(res.data.commentCount);
        } catch {
            alert("Something went wrong ");
        }
    }

    const fetchComments = async () => {
        try {

            const res = await axios.get("http://localhost:8080/comment/" + `${blog.blogId}`, { withCredentials: true });
            setCommentList(res.data.comments.reverse())
            return true;
        } catch (error) {
            alert("Something went wrong. In client side");
            return null
        }
    }

    const postComments = async () => {
        try {
            const res = await axios.post("http://localhost:8080/comment/" + `${blog.blogId}`, { comment: commentInput }, { withCredentials: true });
            console.log(res.status)
            if (res.status === 200) {

                let value = await fetchComments();
                if (value) {
                    
                    fetchCommentCount()
                    setCommentInput("")
                }

            }

        } catch {

        }
    }

    useEffect(() => {
        if (!blog.blogId) {

            fetchBlogData()
            

        }
        // console.log(likedList)
        if (likedList[0] !== undefined) return //If Likedlist is completely empty then only it can try to getLikeList else it cannot. This has been done for stoping uncontrolled re renders.
        getLikeList(); //This is the function that fetching the liked list.
        if (blog.blogId) {
            //This condition helps to control the function about when to fetch the like counts 
            //The main reason that I need to add this because initially blog.blogId = null so, to prevent any internal server error it was used .
            fetchLikeCount();
            fetchCommentCount();
            console.log("fetching ")
            console.log(blog)
        }


    }, [blog,commentList])





    return (
        <div className='blogContainer'>
            <div className="blog-heading">
                <h1 style={{ color: "black" }}>{blog?.title}</h1>

            </div>

            <div className="author">
                <span>-</span>{blog?.firstName + " " + blog?.lastName}
            </div>
            <div className="blog-content">
                <p className=''>{blog?.content}</p>
            </div>

            {/* <footer></footer> */}
            <div className="blog-footer">
                <div className="like">
                    <button onClick={handelLike}>

                        <FontAwesomeIcon icon={like ? solidHeart : faHeart} size="xl" style={{ color: `#ea445a`, }} />

                    </button>
                    <span className="likesCount">{likeCount}</span>
                </div>
                <div className="comment">
                    <button
                        onClick={() => {
                            !comment ? fetchComments() : "";
                            comment ? setComment(false) : setComment(true);

                        }}
                    >

                        <FontAwesomeIcon icon={faComment} size="xl" style={{ color: "#ea445a", }} />
                    </button>
                    <span className="commentCount">{commentCount}</span>
                </div>

            </div>
            <div className="commentShow" style={{ display: comment ? "block" : "none" }}>
                <div className="aurthorComment viewComment">
                {commentList.map((e, index) => {
                    // console.log(user?.userId,e.commentedBY._id);
                        if(e.commentedBY._id === blog.userId){
                        if (typeof (e.comment) == undefined) {

                            return ""

                        }
                        return <CommentCard key={index} firstName={e.commentedBY.firstName} lastName={e.commentedBY.lastName} comment={e.comment} />
                   }})}
                </div>
                <div className="loggedInUserComment viewComment">
                {commentList.map((e, index) => {
                    // console.log(user?.userId,e.commentedBY._id);
                        if(e.commentedBY._id === user?.userId){
                        if (typeof (e.comment) == undefined) {

                            return ""

                        }
                        if(e.commentedBY._id === blog.userId) return"";
                        return <CommentCard key={index} firstName={e.commentedBY.firstName} lastName={e.commentedBY.lastName} comment={e.comment} />
                   }})}
                </div>
                <div className="viewComment">
                    {commentList.map((e, index) => {
                        if(e.commentedBY._id !== user?.userId){
                            
                        if (typeof (e.comment) == undefined) {

                            return ""

                        }
                        // if(e.commentBY._id === )
                        if(e.commentedBY._id === blog.userId

                        ) return""; 
                        return <CommentCard key={index} firstName={e.commentedBY.firstName} lastName={e.commentedBY.lastName} comment={e.comment} />
                   }})}

                </div>
                <div className="commentInputBox">
                    <textarea name="" value={commentInput} onChange={(e) => {
                        setCommentInput(e.target.value);
                        // console.log(e.target.value)
                    }} id="" placeholder="Add a comment"></textarea>
                    <button onClick={postComments} className="btn commetBtn">Comment</button>
                </div>
            </div>
        </div>
    )
}

export default Blog