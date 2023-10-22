
import { Routes, Route, useLocation } from "react-router-dom";
import SignInSide from "./component/login/SignIn";
import SignUp from "./component/register/SignUp";
import ForgotPassword from "./component/login/ForgotPassword";
import BlogList from "./component/blogList/BlogList";
import EditBlog from "./component/EditBlog/EditBlog";
import HomePage from "./component/home/HomePage";
import Header from "./component/header/Header";
import DashBoard from "./component/dashBoard/dashBoard";
import Navbar from "./component/navBar/navBar";
import ManageUser from "./component/manageUser/manageUser";

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
          <Route path="/blogl" element={<BlogList />} />
          <Route path="/edit" element={<EditBlog />} />
          <Route path="/admin" element={<Navbar/>}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="users" element={<ManageUser />} />
          </Route>
        </Routes>

        {/* {HideHeaderAndFooter && <Footer />} */}
      </div>
    </div>
  );
}


export default App;