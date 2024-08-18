import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAPIPost } from "../apis/apis";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await handleAPIPost('/login',{email,password})
      alert(response.msg)
      dispatch({type: "account_authenticate",userInfo :{}})
      navigate("/")
     }
     catch(error){
     alert(error.message)
     }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="p-4 border rounded" onSubmit={handleSubmit}>
        <h2 className="mb-4">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-4">
          Login
        </button>
        <p className="mt-3">
          Don&apos;t have an account?{" "}
          <Link to="/registration">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
