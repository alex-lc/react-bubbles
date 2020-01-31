import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import styled from 'styled-components';

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  return (
    <Router>
      <Container>
        <header>
          <h1>color.</h1>
          <nav>
            <Link to="/bubbles">Bubbles</Link>
          </nav>
        </header>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute path="/bubbles" component={BubblePage} />
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5%;
    width: 100%;
    background: #444444;
    height: 3rem;
    line-height: 3rem;
    
    h1 {
      color: #fafafa;
      font-size: 2.4rem;
      margin-left: 15%;
      width: 20%;
    }

    nav {
      width: 70%;
      display: flex;
      justify-content: flex-end;
      padding-right: 15%;

      p {
        &:hover {
          cursor: pointer;
        }
      }

      a {
        color: #fafafa;
        text-decoration: none;
        transition: all 300ms;

        &:hover {
          transition: color 300ms;
          color: #ccc;
        }
      }
    }
  }
`;

export default App;
