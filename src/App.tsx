import "./App.css";
import BlogEditor from "./Components/BlogEditor";
import BlogsShow from "./Components/BlogsShow";
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
import "./App.css"
import Feed from "./Components/Feed";
const App = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(true);
  const { user, setUser } = useContext(userContext);
  const { setBlogs } = useContext(blogContext);
  const navigate = useNavigate();
  const location = useLocation();


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
          navigate("/blogs-show")

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
      if (location.pathname === "/login") {

        navigate("/blogs-show");
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

            {user?.userId ? <><Route path="/blogs-show" element={<BlogsShow key={0} publicFeed={false} />} /><Route path="/blog-editor" element={<BlogEditor />} />
            <Route path="/blog-feed" element={<Feed  publicFeed = {true}/>}/></> : <>
              <Route path="/login" element={<Login navigate={navigate} />} />
              <Route path="/Signup" element={<Signup />} /></>}


          </Routes>

        </SignupState>
      </LoginState>
      }

    </>
  )
}

export default App