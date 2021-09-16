import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function SignUp() {
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
                localStorage.setItem('token', json.authenToken)
                history.push('/');
            }
            else {
                alert('please enter valid credentials');
            }
        }
        else {
            alert('Passwords dont match')
        }
    }
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Enter Name:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleOnChange} aria-describedby="emailHelp" required />

                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleOnChange} aria-describedby="emailHelp" minLength={5} required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" onChange={handleOnChange} id="password" minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password:</label>
                    <input type="password" className="form-control" name="cpassword" onChange={handleOnChange} id="exampleInputPassword1" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}
