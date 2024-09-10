import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CounsellorForm from './pages/CounsellorForm';
import CounsellorProfile from './pages/CounsellorProfile';
import useStore from './store/useStore';
import AllCounsellors from './pages/AllCounsellors';
import ErrorBoundary from './ErrorBoundary';
import Footer from './components/Footer';
import { useAuth, useUser } from '@clerk/clerk-react';
import { loginStudent } from './apiClient';
import StudentProfile from './pages/StudentProfile';


function App() {
    const { isSignedIn } = useAuth()
    const { user } = useUser();
    const setStudentData = useStore((state) => state.setStudentData);
    const {studentData} = useStore();
    console.log(JSON.stringify(studentData));

    useEffect(() => {
        if (isSignedIn) {
            const email = user.primaryEmailAddress?.emailAddress; 
            const walletAddress = user.primaryWeb3Wallet?.web3Wallet;

            // Use the loginStudent function
            loginStudent(email, walletAddress)
                .then(data => {
                    setStudentData({
                        email: email,
                        walletAddress: walletAddress,
                        did: data.did // Assuming the DID is a relevant piece of student data
                    }); // You can store this DID in state if needed
                })
                .catch(err => {
                    console.error('Failed to create/retrieve DID', err);
                });
        }
    }, [isSignedIn, user]);

    return (
        <ErrorBoundary>

            <Router>
                <div className=""> {/* This div ensures Routes takes at least 100vh */}
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/counsellor-login' element={<CounsellorForm />} />
                        <Route path="/counsellor-profile" element={<CounsellorProfile />} />
                        <Route path="/all-counsellors" element={<AllCounsellors />} />
                        <Route path='/student-profile' element={<StudentProfile />} />
                    </Routes>
                </div>
                <Footer />
            </Router>

        </ErrorBoundary>

    );
}

export default App;
