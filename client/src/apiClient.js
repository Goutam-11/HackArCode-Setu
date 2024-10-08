const API_BASE_URL = 'http://localhost:4000/api';

export const loginStudent = async (email, walletAddress) => {
    try {
        const response = await fetch(`${API_BASE_URL}/student-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, walletAddress }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create/retrieve DID', error);
        throw error;
    }
};



export const registerCounsellor = async (counsellorData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register-counsellor`, {
            method: 'POST',
            body:counsellorData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during counsellor registration:', error);
        throw error;
    }  
}; 

// Login Counsellor
export const loginCounsellor = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login-counsellor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during counsellor login:', error);
        throw error;
    }
};

// Fetch Counsellor Data
export const fetchCounsellorData = async () => {
    const token = localStorage.getItem('counsellorAuthToken');

    try {
        const response = await fetch(`${API_BASE_URL}/counsellor`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch counsellor data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching counsellor data:', error);
        throw error;
    }
};

export const fetchAllCounsellors = async () =>{
    const token = localStorage.getItem('studentAuthToken');
    try {
        const response = await fetch(`${API_BASE_URL}/counsellors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error('Failed to fetch counsellor data');
        }

        return await response.json();
    }catch (error) {
        console.error('Error fetching counsellor data:', error);
        throw error;
    }
}

export const fetchStudent = async (email, walletAddress) => {
    try {
        const queryParams = new URLSearchParams({ email, walletAddress }).toString();
        const response = await fetch(`${API_BASE_URL}/students?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch student data');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching student data:', error);
        throw error;
    }
};
