import { useContext, useState } from "react"
import loginContext from "../Context/loginContext.jsx"
import userContext from "../Context/userContext.jsx";
import axios from "axios";
import './Css/login.css'
import React from "react";

const Login = () => {
  const { loginInput, setLoginInput } = useContext(loginContext);
  const { setUser } = useContext(userContext);
  const [error, setError] = useState("");
  const typing = (e) => {
    switch (e.target.name) {
      case "email":
        setLoginInput({ ...loginInput, email: e.target.value });
        break;
      case "password":
        setLoginInput({ ...loginInput, password: e.target.value });
        break
    }
  }
  const login = async () => {
    if (!loginInput.email || !loginInput.password) return setError("Fields cannot be empty");
    try {
      if (error.length !== 0) setError("")
      const res = await axios.post("http://localhost:8080/auth/login", loginInput, { withCredentials: true });
      console.log(res)

       setUser({
        userId: res.data.userId,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email
      });
      setLoginInput({ email: "", password: "" })

    } catch (error) {

      alert(error.message)
    }


  }

  return (
    <>
      <div className="Login">
      <div className="image-container">
        {/* <img src={image} alt="" /> */}
      </div>
      {/* ------card design */}
        <div className="login-card">

          <div className="Login-heading">
            <h2>Login</h2>
          </div>

          <div className="input-box">
            {/* <span className="input-group-text">Email and Password</span> */}
            <input type="email" aria-label="First name" placeholder="Email" onChange={typing} value={loginInput.email} name="email" className="" />
          </div>
          <span className="erroBox">{error}</span>
          <div className="input-box">

            <input type="password" aria-label="Last name" name="password" onChange={typing} value={loginInput.password} placeholder="Password" className="" />
          </div>
          <div className="btn-holder">
            <button type="submit" onClick={login} className="btn mb-3 mt-2">Login</button>
          </div>
        </div>
      
      </div>
    </>
  )
}

export default Login