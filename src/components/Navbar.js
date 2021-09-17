import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'

export default function Navbar() {
    let history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }
    let location = useLocation();
    React.useEffect(() => {

    }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ boxShadow: "0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%), 0px 2px 4px -1px rgb(0 0 0 / 20%)" }}>
                <Link className="navbar-brand" to="/">myNoteBook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="form-inline my-2 my-lg-0">
                        <Link className="btn btn-primary mx-2 btn-sm" to="/login" role="button" style={{ backgroundColor: "#5b52fc" }}>Login</Link>
                        <Link className="btn btn-primary btn-sm" to="/signup" role="button" style={{ backgroundColor: "#5b52fc" }}>Sign Up</Link>
                    </form> : <Link onClick={handleLogout} className="btn btn-primary mx-2 btn-sm" to="/login" role="button" style={{ backgroundColor: "#5b52fc" }}>Logout</Link>}
                </div>
            </nav>
        </div>
    )
}
