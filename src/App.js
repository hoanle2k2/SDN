import { Routes, Route, useLocation } from "react-router-dom";
import SignInSide from "./component/login/SignIn";
import SignUp from "./component/register/SignUp";
import ForgotPassword from "./component/login/ForgotPassword";
import BlogList from "./component/blogList/BlogList";
import Header from './component/header/Header';
import './App.css'
import HomePage from "./component/home/HomePage";
import EditBlog from "./component/editBlog/EditBlog";


function App() {
  const location = useLocation();
  const HideHeaderAndFooter = !["/login", "/register", "/forgot"].includes(location.pathname);

  return (
    <div className="app">
      <div className="app-blog">
        {HideHeaderAndFooter && <Header />}
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/edit" element={<EditBlog />} />
        </Routes>

    
      </div>
    </div>
  );
}

export default App;