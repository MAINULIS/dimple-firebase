import React from 'react';
import app from '../firebase/firebase.init';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

 const auth = getAuth(app);
const RegisterBS = () => {
    const handleRegisterBS = event =>{
        event.preventDefault ();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
        // create firebase auth
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const newUser = result.user;
            console.log(newUser);
        })
        .catch(error =>{
            console.error(error)
        })
    }
    return (
        <div className='w-50 mx-auto m-5'>
            <form onSubmit={handleRegisterBS}>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default RegisterBS;