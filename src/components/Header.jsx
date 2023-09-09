import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='d-flex bg-info py-3 justify-content-around fs-5 '>
            <NavLink  to='/'
            className='mx-5 '
            >Home</NavLink>
            
            <NavLink  to='/sign-in-google'
            className='mx-5'
            >Sign In With Google</NavLink>

            <NavLink to='/register-rbs'
            className='mx-5'
            >Register RBS</NavLink>
            
            <NavLink to='/register-bs'
            className='mx-5'
            >Register BS</NavLink>

            <NavLink to='/login'
            className='mx-5'
            >Sign In</NavLink>
            
        </div>
    );
};

export default Header;