import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
import { useEffect, useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);

  const [darkMode, setDarkMode] = useState(false);

  // Load theme on app start
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  if (!currentUser) return null;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3 onClick={() => navigate("/dashboard")}>
        Finance Tracker
      </h3>

      <div className="nav-links">
        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/analytics")}>
          Analytics
        </button>

        {/* 🌙 Dark Mode Toggle */}
        <button onClick={toggleTheme} title="Toggle theme">
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
