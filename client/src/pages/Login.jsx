import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedOut, SignInButton } from '@clerk/clerk-react';

const Login = () => {
    const [userType, setUserType] = useState('student');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (userType === 'counsellor') {
            navigate('/counsellor-login');
        }
        // No need for manual handling for student as Clerk handles MetaMask login
    };

    return (
        <div className='text-white flex gap-2 '>
            <div className=''>
                <label className='mr-2'>Login as:</label>
                <select 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className='text-white rounded-full pl-2 bg-black border border-white'>
                    <option value="student">Student</option>
                    <option value="counsellor">Counsellor</option>
                </select>
            </div>

            {userType === 'student' ? (
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            ) : (
                <button onClick={handleLogin} className='btn-primary'>
                    Login as Counsellor
                </button>
            )}
        </div>
    );
};

export default Login;
