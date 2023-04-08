import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import './Login.css'

function login() {

  let history =useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:""})
    const host="http://localhost:5000";
    // const host="https://mynotedata.herokuapp.com";
    const handleSubmit=async(e)=>{
        e.preventDefault();
      const response=await fetch(`${host}/api/auth/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json=await response.json()
      console.log(json);
      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        history("/");
        props.showAlert("Logedin successfully","success");
      }
      else{
        props.showAlert("Invalid Details","danger");
      }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }



  return (
    <div>
      <div class="container-lg">
        <h3>Login</h3>
        <form action="/login" method="POST" onSubmit={handleSubmit}>
            <p><input type="text" id="email" name="email" placeholder="Enter emailId" onChange={onChange} required/></p>
            <p><input type="password"  placeholder="Enter password" id="password" name="password" onChange={onChange} required/></p>
            <p><button type="submit">Login</button></p>
            <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </form>
          </div>
    </div>
  )
}

export default login