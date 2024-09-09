import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import Login from '../pages/Login';
import useStore from '../store/useStore';
import logo from '../assets/logo.png'
import { useAuth } from '@clerk/clerk-react'
import { SignOutButton, UserButton } from '@clerk/clerk-react'



const Navbar = () => {
    const { getToken, isLoaded, isSignedIn } = useAuth()

    const isCounsellorLoggedIn = useStore((state) => state.isCounsellorLoggedIn);
    const setIsCounsellorLoggedIn = useStore((state) => state.setIsCounsellorLoggedIn)




    const handleLogout = () => {
        localStorage.removeItem('counsellorAuthToken');
        setIsCounsellorLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <nav className='bg-blue-500 py-1 px-8 flex flex-row items-center text-end justify-between w-full '>
            <Link to="/" className="text-white hover:text-gray-300">
                <img src={logo} alt="Logo" className="w-[70px] " />
            </Link>

            <div className="flex items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                    </li>
                    {isCounsellorLoggedIn && (
                        <li>
                            <Link to="/counsellor-profile" className="text-white hover:text-gray-300">
                                Counsellor Profile
                            </Link>
                        </li>
                    )}
                    {isCounsellorLoggedIn && (
                        <li>
                            <Link
                                to="/"
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </Link>
                        </li>
                    )}

                    {isSignedIn && (
                        <div className='text-white'>
                            <UserButton />
                        </div>

                    )}

                    {(!isCounsellorLoggedIn && !isSignedIn) && (
                        <li>
                            <Login />
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
