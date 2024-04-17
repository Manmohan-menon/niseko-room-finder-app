async function DataSelector() {
    try {
        const response = await fetch('/data/properties.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default DataSelector;