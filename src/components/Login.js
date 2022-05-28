import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Login(props) {

    let navigate = useNavigate();
    const inputRef = useRef();

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();        
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("auth-token", json.jwtData)
            localStorage.setItem("name",json.user.name)
            localStorage.setItem("email",json.user.email)
            navigate("/");
            props.showAlert("success","Logged in successfully")
        }
        else{
            props.showAlert("danger","Invalid username or password")
        }
    }

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
      inputRef.current.focus();
    }, [])
    
    return (
        <>
            <div className="container" style={{ "marginTop": "100px" }} id="login">
                <h1 className='text-center'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" ref={inputRef} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={onChange} className="form-control" id="password" name='password' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login