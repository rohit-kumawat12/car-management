import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {

    let navigate = useNavigate();

    const [crad, setCrad] = useState({sname:"", semail:"", spass:"", confirmPass:""});

    const [msg, setMsg] = useState("");

    const onChange=(e)=>{
        setCrad({...crad, [e.target.name]:e.target.value});
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if(crad.spass===crad.confirmPass){
            const lowercaseEmail = crad.semail.toLowerCase();
            const response = await fetch(`https://car-management-u0su.onrender.com/api/auth/newuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name : crad.sname, email : lowercaseEmail, password:crad.spass})
            });
            const json = await response.json();
            if(json.success){
                setCrad({sname:"",  semail:"", spass:"", confirmPass:""});
                localStorage.setItem('token',json.authToken);
                navigate("/");
            }else{
                setMsg(json.result[0].msg);
            }

        }else{
            setMsg("Password and Confirm password must be same");
        }
    }

    return(
        <div className="loginContainer">
        <div className="addnote-box">
            <form onSubmit={handleClick}>
                <h4>Create Account</h4>
                <div className="user-box">
                <input type="text" id="sname" name="sname" onChange={onChange} value={crad.sname} required/>
                <label>Full Name</label>
                </div>
                <div className="user-box">
                <input type="email" id="semail" name="semail" onChange={onChange} value={crad.semail} required/>
                <label>Email</label>
                </div>
                <div className="user-box">
                <input type="password" id="spass" name="spass" onChange={onChange} value={crad.spass} required/>
                <label>Password</label>
                </div>
                <div className="user-box">
                <input type="password" id="confirmPass" name="confirmPass" onChange={onChange} value={crad.confirmPass} required/>
                <label>Confirm password</label>
                </div>
                <span className="warningmsg">{msg}</span>
                <center style={{display:"flex", flexDirection:'column'}}>
                <button type="submit">SignUp<span></span></button>
                <span>Already have an account <Link to='/login'>Login here</Link></span>
                </center>
            </form>
        </div>
        </div>
    );
}

export default Signup;