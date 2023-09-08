import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.init';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

const auth = getAuth(app);
const RegisterRBS = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = event =>{
        // 1. prevent page refresh
        event.preventDefault();
        setError('');
        setSuccess('');

        // 2.get data from form
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(email, password)
        // validation check
        if(!/(?=.*[a-z].*[a-z])/.test(password)){
            setError('Please use at least 2 letter in you password')
            return;
        }
        else if(!/(?=.*\d.*\d.*\d)/.test(password)){
            setError('Please use at least 3 number in your password')
            return;
        }
        else if(password.length < 6){
            setError('Password should be at least 6 characters')
        }
        // 3. create firebase auth
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            event.target.reset();
            setSuccess('user has been successfully signed up');
        })
        .then(error =>{
            console.error(error.message);
            setError(error.message);
        })
    }
     return (
        <div className='m-4 w-50 mx-auto'>
            <h3 className='text-secondary my-4'>Please Register</h3>
            <Form onSubmit={handleRegister} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept Terms And Conditions" />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default RegisterRBS;