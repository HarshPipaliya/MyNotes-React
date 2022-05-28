import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Signup(props) {
    let navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", rpassword: "" })
    const { name, email, password, rpassword } = credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (password !== rpassword) {
            props.showAlert("danger", "Re-password doesn't match with password");
        } else {
            const json = await response.json();
            localStorage.setItem("auth-token", json.jwtData)
            localStorage.setItem("name", json.user.name)
            localStorage.setItem("email", json.user.email)
            navigate("/");
            props.showAlert("success", "Your account has been created successfully");
        }
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="container" style={{ "marginTop": "100px" }} id="signup">
                <h1 className='text-center'>Crate a new account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input type="text" minLength="5" ref={inputRef} onChange={onChange} className="form-control" id="name" name='name' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" required minLength="5" onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input required type="password" onChange={onChange} className="form-control" id="password" name='password' minLength="5" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Re-enter Password</label>
                        <input required type="password" onChange={onChange} className="form-control" id="rpassword" name='rpassword' minLength="5" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup