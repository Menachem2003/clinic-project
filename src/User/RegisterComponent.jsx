import React, { useState } from "react";
import "./Register.css";
import { api } from "../utils/api";

function RegisterComponent() {
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    try {
      const { data } = await api.post("auth/signup", {
        name,
        email,
        password,
      });

      console.log("Registration successful:", data);
      setMessage("נרשמת בהצלחה");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        `שגיאת הרשמה: ${
          error.response ? error.response.data.message : "נסה שוב מאוחר יותר."
        }`
      );
      setIsError(true);
    }
  };

  const { name, email, password } = formData;

  return (
    <div className="registerContainer">
      <div className="loginForm">
        <h2 className="title">הרשמה</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="name" className="label">
              שם משתמש
            </label>
            <input
              className="inputField"
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="email" className="label">
              אימייל
            </label>
            <input
              className="inputField"
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password" className="label">
              סיסמה
            </label>
            <input
              className="inputField"
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submitButton">
            הירשם
          </button>
        </form>
        {message && (
          <p className={`message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default RegisterComponent;
