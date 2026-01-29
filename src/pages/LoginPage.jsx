import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
    if(currentUser) navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        
        <input type="email" placeholder="Email" required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input type="password" placeholder="Password" required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Login</button>
      </form>
      <p onClick={() => navigate("/register")}>Create an account</p>
    </div>
  );
}
