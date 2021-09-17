import React, { useState } from 'react'
import { useHistory } from 'react-router';
import SignLogo from '../img/Signin.svg';
import '../CSS/SignCss.css';
import Wave2 from '../img/wave2.svg';
export default function SignUp(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();
    const handleSubmit = async (e) => {
        const { name, email, password, cpassword } = credentials;
        e.preventDefault();
        if (password === cpassword) {
            const response = await fetch('http://localhost:5000/api/authen/createuser', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
            });


            const json = await response.json();
            console.log(json)
            if (json.success) {
                //take the auth token and redirect
                localStorage.setItem('token', json.authenToken);
                props.showAlert("Sign Up Successfull", "success");
                history.push('/');
            }
            else {
                props.showAlert("Invalid Credentials", "danger")
            }
        }
        else {
            props.showAlert("Password Dont Match", "danger")
        }
    }
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1 className="headingS" >Welcome To myNoteBook.</h1>
            <p className="subtitle ">Your Notes are safe with us.</p>
            <div className="Signin">
                <div><img src={SignLogo} alt="img not found" className="signin_img" /></div>
                <div className="sign_card">
                    <h3 >Create a New Account</h3>
                    <form onSubmit={handleSubmit} className="my-3">
                        <div className="form-group">
                            <input type="text" className="form-control" id="name" name="name" onChange={handleOnChange} aria-describedby="emailHelp" required placeholder="Name" />
                        </div>
                        <div className="form-group">

                            <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange} aria-describedby="emailHelp" minLength={5} required placeholder="Email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">

                            <input type="password" className="form-control" name="password" onChange={handleOnChange} id="password" minLength={5} required placeholder="Password" />
                        </div>
                        <div className="form-group">

                            <input type="password" className="form-control" name="cpassword" onChange={handleOnChange} id="exampleInputPassword1" minLength={5} required placeholder="Confirm Password" />
                        </div>
                        <button type="submit" className="btn btn-primary btn_sign my-2">Sign Up</button>
                    </form>
                </div>
            </div>
            <img src={Wave2} alt="" className="svgdn" style={{ marginTop: "-80px", height: "130px" }} />
        </>
    )
}
