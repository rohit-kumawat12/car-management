import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {

    const [crad, setCrad] = useState({uemail:"", upass:""});
    const [msg, setMsg] = useState("");

    const onChange = (e) => {
        setCrad({...crad, [e.target.name]:e.target.value});
    }

    let navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const lowercaseEmail = crad.uemail.toLowerCase();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : lowercaseEmail, password:crad.upass})
        });

        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.authToken);
            setCrad({uemail:"", upass:""});

            navigate("/");
        }else{
            setMsg(json.result[0].msg);
        }
    }

    return(
        <div className="loginContainer">
        <div className="addnote-box">
            <form onSubmit={handleClick}>
                <h4>Login</h4>
                <div className="user-box">
                <input type="email" id="uemail" name="uemail" onChange={onChange} value={crad.uemail} required/>
                <label>Email</label>
                </div>
                <div className="user-box">
                <input type="password" id="upass" name="upass" onChange={onChange} value={crad.upass} required/>
                <label>Password</label>
                </div>
                <span className="warningmsg">{msg}</span>
                <center style={{display:"flex", flexDirection:'column'}}>
                <button type="submit">Login<span></span></button>
                <span>Don't have an account <Link to='/signup'>Signup</Link></span>
                </center>
            </form>
        </div>
        </div>
    );
}

export default Login;