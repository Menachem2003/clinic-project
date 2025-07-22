import { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import AuthContext from "../contexts/AuthContext";

function LoginComponent() {
  const { setUser } = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
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
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", data);
      setUser(data.user);
      localStorage.setItem("token", data.token);

      setMessage("התחברת בהצלחה");
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        `שגיאת התחברות: ${
          error.response ? error.response.data.message : "נסה שוב מאוחר יותר"
        }`
      );
      setIsError(true);
    }
  };

  const { email, password } = formData;

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <h2 className="title">התחברות</h2>
        <form onSubmit={handleSubmit}>
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
            התחבר
          </button>
        </form>
        {message && (
          <p className={`message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
        <div className="forgotPassword">
          <a href="/forgot-password">שכחתי סיסמה</a>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
