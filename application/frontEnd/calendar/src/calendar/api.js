const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all time intervals
export const fetchTimeIntervals = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/intervals`);
        if (!response.ok) {
            throw new Error('Failed to fetch intervals');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Create a new time interval
export const createTimeInterval = async (intervalData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/intervals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(intervalData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create interval');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
