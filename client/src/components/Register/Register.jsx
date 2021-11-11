import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import styles from "./Register.module.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/auth/register", {
        username,
        password,
      })
      .then((data) => {
        if (data) {
          setMessage("You have successfully registered.");
        }
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  return (
    <div>
      <h1 className={styles.title}>Register</h1>
      <form className={styles.container} onSubmit={registerHandler}>
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

        <Button variant="contained" type="submit" className={styles.logout_btn}> 
          Register
        </Button>
        <span>{message}</span>
        <Link to="/">
          Homepage
        </Link>
      </form>
    </div>
  );
};

export default Register;
