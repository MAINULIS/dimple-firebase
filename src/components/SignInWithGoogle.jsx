import React from 'react';
import { useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.init'



const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignInWithGoogle = () => {
    const [user, setUser] = useState(null)

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);
                setUser(loggedUser)
            })

            .catch(error => {
                console.log(error)
            })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
                    .catch((error) => {
                        console.log('error', error)
                    })
            })
    }
    return (
        <div className='m-5  text-center'>
            <h1>Firebase + React</h1>
            <div>
                {/* user ? logOut : sign Out */}
                {
                    user ?
                        <button className='btn btn-success' onClick={handleSignOut}>Sing out</button> :

                        <button className='btn btn-success' onClick={handleGoogleSignIn}>Google Sign In</button>
                }

            </div>
            {
                user &&
                <div>
                    <h3>User: {user.displayName}</h3>
                    <p><strong>Email</strong> {user.email}</p>
                </div>
            }



        </div>
    )

};

export default SignInWithGoogle;