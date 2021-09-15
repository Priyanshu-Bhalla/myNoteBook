import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login() {
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
            localStorage.setItem('token', json.authenToken)
            history.push('/');
        }
        else {
            alert('please enter valid credentials');
        }
    }
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={handleOnChange} aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleOnChange} id="exampleInputPassword1" />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
