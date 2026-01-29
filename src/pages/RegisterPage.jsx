import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
    navigate("/");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        
        <input type="text" placeholder="Name" required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input type="email" placeholder="Email" required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input type="password" placeholder="Password" required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate("/")}>Already have an account? Login</p>
    </div>
  );
}
