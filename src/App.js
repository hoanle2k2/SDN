
import { Routes, Route } from "react-router-dom";
import SignInSide from "./component/login/SignIn";
import SignUp from "./component/register/SignUp";
import ForgotPassword from "./component/login/ForgotPassword";
import BlogList from "./component/blogList/BlogList";
import EditBlog from "./component/editBlog/EditBlog";
import HomePage from "./component/home/HomePage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}  />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/blogl" element={<BlogList />} />
        <Route path="/edit" element={<EditBlog />} />
      </Routes>
    </div>
  );
}

export default App;
