import React, { useState } from 'react';
import app from '../firebase/firebase.init';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

 const auth = getAuth(app);

const RegisterBS = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegisterBS = event =>{
        // 1. prevent page refresh
        event.preventDefault ();
        setSuccess('');
        setError('');
        // 2. get data from form
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        // Validation
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please add at least 2 character in uppercase')
            return;
        }
        else if(!/(?=.*\d.*\d.*\d)/.test(password)){
            setError('Please use at least 3 number in you password')
            return;
        }
        else if(password.length <6){
            setError('Password should be at least 6 characters ')
            return;
        }
        // 3. create firebase auth
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const newUser = result.user;
            console.log(newUser);
            setError('')
            event.target.reset();
            setSuccess('User has been successfully sign up')
        })
        .catch(error =>{
            console.error(error.message)
            setError(error.message)
        })
    }
    return (
        <div className='w-50 mx-auto m-5'>
            <form onSubmit={handleRegisterBS}>
                <h2 className='my-4 text-warning'>Please Sign Up</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' placeholder='Your Email' id="exampleInputEmail1" aria-describedby="emailHelp" />
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
            </form>
        </div>
    );
};

export default RegisterBS;