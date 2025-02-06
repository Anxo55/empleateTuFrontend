import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import UsersList from "./pages/UsersList";
import OfferDetail from "./pages/OfferDetail";
import OfferForm from "./pages/OfferForm";
import OfferList from "./pages/OfferList";

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
          <Route path="/offers" element={<OfferList/>} />
          <Route path="/offers/:id" element={<OfferDetail/>} />
          <Route path="/offers/new" element={<OfferForm/>} />
          <Route path="/offers/edit/:id" element={<OfferForm/>} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
