
import { Routes, Route } from "react-router-dom";
import SignInSide from "./component/login/SignIn";
import SignUp from "./component/register/SignUp";
import ForgotPassword from "./component/login/ForgotPassword";
import BlogList from "./component/blogList/BlogList";
import Header from './component/header/Header';
import Footer from "./component/footer/Footer";


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/blogl" element={<BlogList />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
