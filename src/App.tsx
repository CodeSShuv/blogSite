import "./App.css"
import BlogsShow from "./Components/BlogsShow";
import BlogEditor from "./Components/BlogEditor";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import LoginState from "./Context/States/LoginState";
import SignupState from "./Context/States/SignupState";
import userContext from "./Context/userContext";
import blogContext from "./Context/blogContext";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import Cookies from 'js-cookie';

import Feed from "./Components/Feed";
import Blog from "./Components/Blog";
import Profile from "./Components/Profile";
const App = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(true);
  const { user, setUser } = useContext(userContext);
  const { setBlogs } = useContext(blogContext);
  const navigate = useNavigate();
  const location = useLocation();
//for post Only. Might want to use it by maintaining a seperatefile in the future but this time its fine. 


  // This is used to fetch the blogs from the  server. This is done after the signin process is completed. 

  /// this function checks cookies and send a req to server for verifying the token
  const checkUser = async () => {
    if (!user) {
      const token = Cookies.get("token")

      if (!token) {
        navigate('/login');
        setIsLoading(false)
        return
      }
      try {

        const res = await axios.get("http://localhost:8080/profile", { withCredentials: true });

        setIsLoading(false)

        setUser(
          () => {
            return res.data
          }


        );

        if (location.pathname === "/login") {
          navigate("/blog-feed")

        }

        setIsLoading(false);
        //catching the problem
      } catch (error: any) {
        if (error.status = 404) {
          alert("User Not found");
          Cookies.remove('token');
        }
        else if (error.status === 401) {
          Cookies.remove('token'); // this is a special error that is caused by expired token. so the token is removed.
          setIsLoading(false)
          navigate("/login")
        }
        setIsLoading(false)
        navigate("/login")// This is for all the other problems apart from expired token.

      }

    }
  }
  // resets the whole webpage and goes back to login page.
  const logOut = () => {
    setUser(null)
    setBlogs([])

    navigate("/login")

    Cookies.remove('token');

  }
  //This is for re rendering the component after each change.
  useEffect(() => {

    checkUser()
    // if user is logged in the blogs show if url is given /login

    if (user?.userId != undefined) {
      if (location.pathname === "/login" || location.pathname === "/") {

        navigate("/feed");
      }
      // fetchBlogs()
    }

  }, [user])

  return (
    <>

      {!isLoading && <LoginState>

        <SignupState>


          <Navbar user={user} logOut={logOut} />
          <Routes>

            {user?.userId ? <><Route path="/profile" element={<Profile key={0}  />} /><Route path="/blog-editor" element={<BlogEditor />} />
            <Route path="/feed" element={<Feed key={1}  publicFeed = {true}/>}/></> : <>
              <Route path="/login" element={<Login  />} />
              <Route path="/Signup" element={<Signup />} />
              
              </>}
              <Route path = "/blog"element={<Blog/>}/>


          </Routes>

        </SignupState>
      </LoginState>
      }

    </>
  )
}

export default App