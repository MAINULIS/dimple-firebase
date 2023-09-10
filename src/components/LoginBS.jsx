import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth =getAuth(app);
const LoginBS = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        setError('');
        setSuccess('');
        // sign in
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess('Successfully logged in')
            setError('');
            event.target.reset();
        })
        .catch(error =>{
            console.log(error.message)
            setError(error.message)
        })
    }

    // if forget password
    const handleResetPassword =event =>{
        const email = emailRef.current.value;
        if(! email){
            alert('Please provide your email to reset password');
            return;
        }
    
        sendPasswordResetEmail(auth, email)
        .then( () =>{
            alert('Please check your email box')
            setError('')
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.message)
        })
    }
    return (
        <div className='w-50 mx-auto m-5'>
             <form onSubmit={handleLogin}>
                <h2 className='my-4 text-primary'>Please Sign In</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" ref={emailRef} name='email' placeholder='Your Email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name='password' placeholder='Your Password' className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" >Check me out</label>
                </div>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p><small>Forget password? Please <button className='btn btn-link' onClick={handleResetPassword} >Reset Password</button></small></p>
                <p><small>New to this website? Please</small> <Link to='/register-bs'>Sign Up</Link></p>
            </form>
        </div>
    );
};

export default LoginBS;