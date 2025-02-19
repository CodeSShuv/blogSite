import { useContext } from "react"
import loginContext from "../Context/loginContext"
import userContext from "../Context/userContext";
import axios from "axios";

const Login = (navigate: any) => {
  const { loginInput, setLoginInput } = useContext(loginContext);
  const { setUser } = useContext(userContext);

  const typing = (e: any) => {
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
    if (!loginInput.email && !loginInput.password) return alert("Fields are empty")
    try {
      const res = await axios.post("http://localhost:8080/auth/login", loginInput, { withCredentials: true });

      await setUser({
        userId: res.data.userId,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email
      });
      setLoginInput({ email: "", password: "" })
      
    } catch (error: any) {
      console.log("error")
    }


  }

  return (
    <>
      <div className="Login p-3">
        <div className="Login-heading">
          <h2>Login</h2>
        </div>

        <div className="input-group mt-2 p-1">
          {/* <span className="input-group-text">Email and Password</span> */}
          <input type="email" aria-label="First name" placeholder="Email" onChange={typing} value={loginInput.email} name="email" className="form-control" />
          <input type="password" aria-label="Last name" name="password" onChange={typing} value={loginInput.password} placeholder="Password" className="form-control" />
        </div>
        <div className="col-auto p-1">
          <button type="submit" onClick={login} className="btn btn-primary mb-3 mt-2">Login</button>
        </div>
      </div></>
  )
}

export default Login