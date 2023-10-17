import { Routes, Route, useLocation } from "react-router-dom";
import SignInSide from "./component/login/SignIn";
import SignUp from "./component/register/SignUp";
import ForgotPassword from "./component/login/ForgotPassword";
import BlogList from "./component/blogList/BlogList";
import Header from './component/header/Header';
import Footer from "./component/footer/Footer";
import BlogPublish from "./component/blogPublish/BlogPublish";
import BlogPublishDetail from "./component/blogPublish/BlogPublishDetail";
import './App.css'
import BlogReport from "./component/blogPublish/BlogReport";


function App() {
  const location = useLocation();
  const HideHeaderAndFooter = !["/login", "/register", "/forgot"].includes(location.pathname);

  return (
    <div className="app">
      <div className="app-blog">
        {HideHeaderAndFooter && <Header />}
        <Routes>
          <Route path="/login" element={<SignInSide />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/blogpublish" element={<BlogPublish />} />
          <Route path="/articleDetail" element={<BlogPublishDetail />} />
          <Route path="/reportDetail" element={<BlogReport />} />
        </Routes>

        {HideHeaderAndFooter && <Footer />}
      </div>
    </div>
  );
}

export default App;
