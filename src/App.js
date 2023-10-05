
import { Routes, Route } from "react-router-dom";
import SignInSide from "./component/login/SignIn";
import SignUp from "./component/register/SignUp";
import ForgotPassword from "./component/login/ForgotPassword";
import BlogList from "./component/blogList/BlogList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/blogl" element={<BlogList />} />
      </Routes>
    </div>
  );
}

export default App;
