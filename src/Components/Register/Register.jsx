import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';
import './Register.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
const auth = getAuth(app)

export default function Register() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }


  const handleSubmit = (event) =>{
    event.preventDefault();
    // setSuccess('')
    // setError('')
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    console.log(name,email,password);
    //validate
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

    //create user in fb
    createUserWithEmailAndPassword(auth, email,password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
      setError('');
      event.target.reset();
      setSuccess('User has been created successFully')
      sendVerificationEmail(result.user)
      updateUser(result.user, name)
    })
    .catch(error =>{
      console.error(error.message);
      setError(error.message)
      setSuccess('')
      setError('')
      
    })
  }

  const sendVerificationEmail = (user) =>{
    sendEmailVerification(user)
    .then(result =>{
      console.log(result);
      alert("please verify your email address")
    })
  }

  const updateUser = (user,name)=>{
    updateProfile(user,{
      displayName:name
    })
    .then(()=>{
      console.log("user name updated");
    })
    .catch(error =>{
      setError(error.message)
    })
  }
  return (
    <div className='w-50 mx-auto'>
        <h4 > Please Register</h4>
        <form onSubmit={handleSubmit}>
        <input className='w-50 mb-4 rounded' type="name" name='name' id='name' placeholder='Your Name' required />
            <br />
            <input className='w-50 mb-4 rounded' type="email" name='email' id='email' placeholder='Your Email' required />
            <br />


            <div className='password-input-wrapper'>
  <input className='w-50 mb-4 rounded' type={showPassword ? 'text' : 'password'} name='password' id='password' placeholder='Your Password' required />
  <i className={showPassword ? 'fa fa-eye-slash password-icon' : 'fa fa-eye password-icon'} onClick={handleShowPassword}></i>
</div>



            <br />
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
            <input className='btn btn-primary' type="submit" value="Register" />
            
        </form>
        <p><small>Already have an account? Please<Link to="/login">Login</Link></small></p>
    </div>
  )
}
