import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app)
export default function Login() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const emailRef = useRef();

  const handleLogin =(event)=>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);
      //validate
      setError('')
      setSuccess('')
      if(!/(?=.*[A-Z])/.test(password)){
        setError("Please add at least one uppercase");
        return;
      }
      else if (!/(?=.*[0-9].*[0-9])/.test(password)){
        setError("Please add at least Two number");
        return;
      }
      else if (password.length<6){
        setError("Please add at least 6 characters in your password");
        return;
      }

      signInWithEmailAndPassword(auth,email,password)
      .then(result=>{
        const loggedUser = result.user;
        console.log(loggedUser);
        if(!loggedUser.emailVerified){
          alert("Please verified your email")
        }
        setSuccess("User login successful")
        setError('')
      })
      .catch(error=>{
        setError(error.message);
        setSuccess('')
        setError('')
      })

  }
  const handleResetPassword = event =>{
    const email = emailRef.current.value;
    if(!email){
      alert('please provide your email address to reset password');
      return;
    }
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert('please chaeck your email')
    })
    .catch(error =>{
      console.log(error);
      setError(error.message)
    })
  }
  return (
    <div className='w-25 mx-auto'>
      <h2>Please login</h2>
        <Form onSubmit={handleLogin} >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" ref={emailRef} placeholder="Enter email" required />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" required />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <p className='text-danger'>{error}</p>
        <p className='text-success'>{success}</p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'> Reset Password</button></small></p>
    <p><small>New to this website?Please <Link to="/register">Regiser</Link></small></p>
    </div>
  )
}
