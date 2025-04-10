import { useState , useContext} from "react";
import signupContext from "../Context/signupContext";
import axios from "axios";
const Signup = () => {
  const {signupInputState, setSignupInputState} = useContext(signupContext)
  

  const handleChange = (e) => {
    setSignupInputState({ ...signupInputState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const  res = await axios.post("http://localhost:8080/auth/signup", signupInputState, {withCredentials:true})
    console.log(res.data) ;
    setSignupInputState({firstName:"", lastName:"",email:"", password:""})
    
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {/* <label className="form-label">Enter your first name:</label> */}
            <input 
              type="text" 
              name="firstName" 
              className="form-control" 
              placeholder="Enter your first name" 
              value={signupInputState.firstName} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            {/* <label className="form-label">Enter your last name:</label> */}
            <input 
              type="text" 
              name="lastName" 
              className="form-control" 
              placeholder="Enter your last name" 
              value={signupInputState.lastName} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            {/* <label className="form-label">Email address</label> */}
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              placeholder="Enter your email" 
              value={signupInputState.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            {/* <label className="form-label">Password</label> */}
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              placeholder="Enter your password" 
              value={signupInputState.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
