import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import CounsellorForm from './pages/CounsellorForm';
import CounsellorProfile from './pages/CounsellorProfile';
import useStore from './store/useStore';
import AllCounsellors from './pages/AllCounsellors';
import ErrorBoundary from './ErrorBoundary';
import Footer from './components/Footer';
import Chat from './components/Chat';




function App() {

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
                 
                    </Routes>
                </div>
                <Footer />
            </Router>

        </ErrorBoundary>

    );
}

export default App;
