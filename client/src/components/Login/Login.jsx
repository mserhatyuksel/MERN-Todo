import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLogin } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import axios from "axios";
import styles from "./Login.module.css";
const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/auth/login", {
        username,
        password,
      })
      .then(() => {
        dispatch(setUser(username));
        dispatch(setLogin(true));
        localStorage.setItem("logged", username);
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  };
  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.container} onSubmit={loginHandler}>
        <FormControl className={styles.input}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FormControl>
        <FormControl className={styles.input}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>

        <Button variant="contained" className={styles.login_btn} type="submit">
          <LoginIcon />
          Login
        </Button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
