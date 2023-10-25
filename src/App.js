import { Routes, Route, useLocation } from "react-router-dom";
import SignInSide from "./component/login/SignIn";
import SignUp from "./component/register/SignUp";
import ForgotPassword from "./component/login/ForgotPassword";
import BlogList from "./component/blogList/BlogList";
import HomePage from "./component/home/HomePage";
import Header from "./component/header/Header";

import ManageUser from "./component/adminManage/ManageUser.js";
import ManageTopic from "./component/adminManage/ManageTopic";
import EditBlog from "./component/EditBlog/EditBlog.jsx";
import Navbar from "./component/navBar/NavBar";
import DashBoard from "./component/dashBoard/DashBoard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogDetail from "./component/blogDetail/BlogDetail";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
function App() {
  const location = useLocation();
  const HideHeaderAndFooter = !["/login", "/register", "/forgot"].includes(location.pathname);
  //axios.baseURL = 'http://localhost:5000';

  return (
    <div className="app">
      <div className="app-blog">
        {HideHeaderAndFooter && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<SignInSide />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/blogl" element={<BlogList />} />
          <Route path="/edit" element={<EditBlog />} />
          <Route path="/blogdetail/:blogid" element={<BlogDetail />} />
          <Route path="/admin" element={<Navbar />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="users" element={<ManageUser />} />
            <Route path="topics" element={<ManageTopic />} />
          </Route>
        </Routes>

        {/* {HideHeaderAndFooter && <Footer />} */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
