import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Signup.css";

function Signup(props) {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const host = "http://localhost:5000";
  // const host="https://mynotedata.herokuapp.com";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Account created Successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div class="container-sg">
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <p>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter a username"
              onChange={onChange}
              minLength={3}
              required
            />
          </p>
          <p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email ID"
              onChange={onChange}
              required
            />
          </p>
          <p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              onChange={onChange}
              minLength={5}
              required
            />
          </p>
          <p>
            <button type="submit">Sign Up</button>
          </p>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
