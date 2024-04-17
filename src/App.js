// App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import FilterInput from './Filter';
import Property from './Property';
import DataSelector from './DataSelector';

function App() {
  const [properties, setProperties] = useState([]); // Initialize properties
  const [searchText, setSearchText] = useState(''); // Initialize searchText

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await DataSelector(); // Fetch data
        setProperties(data); // Update properties state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const filteredProperties = properties.filter((property) => 
    property.name.toLowerCase().includes(searchText.toLowerCase()) ||
    property.description.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <div className="App">
      <Banner />
      <FilterInput onSearch={setSearchText} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {filteredProperties.length === 0 ? (
        <p className='property-block'>No properties match your search.</p>
      ) :(filteredProperties.map((property) => (
          <Property key={property.id} property={property} />
        )))}
      </div>
    </div>
  );
}

export default App;
