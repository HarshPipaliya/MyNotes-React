import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from '../images/notesLogo.png'

function Navbar(props) {
    const location = useLocation();
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        navigate('/login')
        props.showAlert("success","Logout successfully")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark" style={{ overflow: "hidden", zIndex: "1000" }} >
                <div className="container-fluid">
                    {/* <Link className="navbar-brand" to="/" style={{ fontSize: "35px" }}>MyNotes</Link> */}
                    <Link to="/" ><img src={image} alt=""  style={{"filter": "invert(100%)","width": "33px","margin": "15px"}} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('auth-token') ? <form className="d-flex">
                            {/* <i className="fa-solid fa-user"></i> */}
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form> :
                            <form className="d-flex">
                                <button className="btn btn-danger" onClick={handleLogout} >Logout</button>
                            </form>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar