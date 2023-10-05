import BlogList from './component/BlogList';
import ForgotPassword from './component/ForgotPassword';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/blogl" element={<BlogList />} />
      </Routes>
    </div>
  );
}

export default App;
