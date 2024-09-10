import React from 'react';
import useStore from '../store/useStore';

const StudentProfile = () => {
    const { studentData } = useStore();

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-900 p-4'>

            <div className='bg-gray-800 p-6 rounded text-white max-w-lg w-full'>
                <h1 className='text-2xl mb-4 text-center'>Student Profile</h1>
                {studentData && (
                    <div className='text-center'>
                        {studentData.email && <p><strong>Email:</strong> {studentData.email}</p>}
                        {studentData.walletAddress && <p><strong>Wallet Address:</strong> {studentData.walletAddress}</p>}
                        <p><strong>Decentralized Id:</strong> {studentData.did}</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default StudentProfile;
