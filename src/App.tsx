import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import UsersList from "./pages/UsersList";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container mx-auto px-8 py-30">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/usersList" element={<UsersList/>} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
