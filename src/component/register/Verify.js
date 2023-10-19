import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Verify.css'


const Verify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    // Xác nhận mã verify
    axios.post("http://localhost:5000/accounts/verify", { code })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        } else {
          alert("Invalid verification code");
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="auth">
      <h1>Verify</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Enter your verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button>Verify</button>
      </form>
    </div>
  );
};

export default Verify;
