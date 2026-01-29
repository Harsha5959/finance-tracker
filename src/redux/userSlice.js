import { createSlice } from "@reduxjs/toolkit";

const initialUsers = JSON.parse(localStorage.getItem("users")) || [];
const initialSession = JSON.parse(localStorage.getItem("session")) || null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: initialUsers,
    currentUser: initialSession,
  },
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;

      const alreadyExists = state.users.some(user => user.email === email);
      if (alreadyExists) {
        alert("Email already registered!");
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        transactions: []
      };

      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
      alert("Registration successful! Please login.");
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload;

      const foundUser = state.users.find(
        user => user.email === email && user.password === password
      );

      if (!foundUser) {
        alert("Invalid email or password!");
        return;
      }

      state.currentUser = foundUser;
      localStorage.setItem("session", JSON.stringify(foundUser));
    },

    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("session");
    }
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
