import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            isStudentLoggedIn: false,
            isCounsellorLoggedIn: false,
            counsellorData: null,
            studentData: null, // New state for student data
            setIsStudentLoggedIn: (status) => set({ isStudentLoggedIn: status }),
            setIsCounsellorLoggedIn: (status) => set({ isCounsellorLoggedIn: status }),
            setCounsellorData: (data) => set({ counsellorData: data }),
            setStudentData: (data) => set({ studentData: data }), // Function to set student data
        }),
        {
            name: 'auth-storage', // key in localStorage
            getStorage: () => localStorage, // use localStorage
        }
    )
);

export default useStore;
