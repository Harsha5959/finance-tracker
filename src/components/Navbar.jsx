import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  // Hide navbar if not logged in
  if (!currentUser) return null;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div style={nav}>
      <h3 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        Finance Tracker
      </h3>

      <div style={links}>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/analytics")}>Analytics</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

/* STYLES */
const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  background: "#ffffff",
  borderBottom: "1px solid #ddd",
  position: "sticky",
  top: 0,
  zIndex: 100
};

const links = {
  display: "flex",
  gap: "10px"
};
