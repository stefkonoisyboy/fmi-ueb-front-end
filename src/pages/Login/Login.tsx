import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";

import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { getCurrentUser } from "../../utils/auth";
import { messageError } from "../../utils/notifications";

const defaultValues = {
  password: "",
  username: "",
};

const Login = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [inputModel, setInputModel] = useState({
    ...defaultValues,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      ...inputModel,
    };

    try {
      await axios.post(
        `${BASE_URL}/users/login?username=${user.username}&password=${user.password}`
      );
      console.log("Login");
      localStorage.setItem("user", JSON.stringify({ username: user.username }));
      navigate("/");
    } catch (error) {
      messageError((error as AxiosError).response?.data as string);
      console.log((error as AxiosError).response?.data);
    }
  };

  return (
    <div className="login-box">
      {user && <Navigate to="/" />}
      <h2>Login</h2>
      <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({ ...inputModel, username: e.target.value })
            }
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({ ...inputModel, password: e.target.value })
            }
          />
          <label>Password</label>
        </div>
        <button type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
      <Link style={{ textDecoration: "none", color: "#03e9f4" }} to="/register">
        Don't have an account? Sign up here!
      </Link>
    </div>
  );
};

export default Login;
