import React, { useState } from 'react'
import axios from "axios";

import './login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let data={
      email,
      password
    }
    
    

    function submit(){
       
        axios.post("http://localhost:3000/checkuser",data).then((res)=>{
         
          if(res.data){
			
           
  
          }
          else{
            alert("wrong username or password");
          }
        
      
        })
      }
    
    

	return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" >
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
                            onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
                            onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="input"
						/>
						
						<button  className="green_btn"  onClick={submit}>
							Login
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					
						<button type="button" className= "white_btn" >
							Sign Up
						</button>
				
				</div>
			</div>
		</div>
	);
};

export default Login