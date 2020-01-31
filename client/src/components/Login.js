import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const log = (user) => {
    axios.post(`http://localhost:5000/api/login`, user)
      .then((res) => {
        // console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push(`/bubbles`);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        log(user);
      }}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
