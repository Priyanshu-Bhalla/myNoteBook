import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoginLogo from '../img/login.svg';
import Wave from '../img/wave.svg';
import '../CSS/LoginCss.css';

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/authen/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });


        const json = await response.json();
        console.log(json)
        if (json.success) {
            //take the auth token and redirect
            localStorage.setItem('token', json.authenToken);
            props.showAlert("You are logged in", "success");
            history.push('/');
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1 className=" headingL" >Welcome To myNoteBook.</h1>
            <p className="subtitle ">Your Notes are safe with us.</p>

            <img src={Wave} alt="" className="svgup" style={{ marginLeft: "-300px", height: "100px", width: "86vw", marginTop: "20px" }} />
            <div className="login">

                <div><img src={LoginLogo} alt="img not found" className="login_img" /></div>
                <div className="login_card">
                    <h3 >Login To Your Account</h3>
                    <form onSubmit={handleSubmit} className="my-3">
                        <div className="form-group">

                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={handleOnChange} aria-describedby="emailHelp" placeholder="Email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">

                            <input type="password" className="form-control" name="password" onChange={handleOnChange} id="exampleInputPassword1" placeholder="Password" />

                        </div>

                        <button type="submit" className="btn btn-primary btn_login">Login In</button>
                    </form>
                </div>

            </div>

        </>
    )
}
