import React, { useState } from "react";
import "../Login.css";
import { useNavigate } from "react-router-dom";
import {users} from "../data/users"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate=useNavigate()

  const handleLogin = () =>
  {
    const user=users.find(
      (u)=> u.username==username && u.password===password
    )

    if(user)
    {
      localStorage.setItem("role",user.role)
      localStorage.setItem("username",user.username)
      navigate("/dashboard");
    }
    else{
      alert("Invalidusername or password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
<h1>Loan Origination System</h1>
        </div>
        

        <div className="form-row">
          <label>Username</label>
          <input type="text" value={username} 
          onChange={(e)=> setUsername(e.target.value)}
          placeholder="Enter Username" />
        </div>

        <div className="form-row">
          <label>Password</label>

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"} value={password}
              onChange={(e)=> setPassword(e.target.value)}
              placeholder="Enter Password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;