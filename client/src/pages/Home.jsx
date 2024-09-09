import React from 'react';
import useStore from '../store/useStore';
import StudentHome from './StudentHome';
import MainHome from './MainHome';
import CounsellorHome from './CounsellorHome';
import { useAuth } from '@clerk/clerk-react'

const Home = () => {
    const { getToken, isLoaded, isSignedIn } = useAuth()

    const isCounsellorLoggedIn = useStore((state) => state.isCounsellorLoggedIn);

    return (
        <div className=''>
            {isSignedIn && <StudentHome />}
            {isCounsellorLoggedIn && <CounsellorHome />}
            {(!isSignedIn && !isCounsellorLoggedIn) && <MainHome />}
        </div>
    );
};

export default Home;
