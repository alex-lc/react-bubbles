import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';

const Login = (props) => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [err, setErr] = useState('');

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
        // console.log(err);
        setErr(err.response.data.error);
        // console.log(err.response);
      })
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <LoginCont>
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

      {err && <p className="error">{err}</p>}
    </LoginCont>
  );
};

const LoginCont = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p.error {
    color: #d64749;
    margin: 1rem 0;
  }

  h1 {
    margin: 0;
    padding: 0;
  }

  form {
    background: #ccc;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    box-shadow: 0 0.5px 4px 0 #444444;

    input {
      padding: 1rem;
      margin: 1rem 0;
      color: #fafafa;
      width: 80%;
      height: 1.5rem;
      border: none;
      border-radius: 0.3rem;
      background: #333333;
      font-size: 1rem;
    }
    
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      border: none;
      border-radius: 0.3rem;
      margin-bottom: 1rem;
      padding: 1rem 0;
      font-size: 1rem;
      transition: all 300ms;
      background: #259955;
      color: #fafafa;

      &:hover {
        transition: background 300ms;
        background: #444444;
        cursor: pointer;
      }
    }
  }
`;

export default Login;
