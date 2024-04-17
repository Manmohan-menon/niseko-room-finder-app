// App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import FilterInput from './Filter';
import Property from './Property';
import DataSelector from './DataSelector';
import withLoading from './hoc/withLoading';

function PropertiesList({properties, isLoading}){
  const [searchText, setSearchText] = useState('');

  const filteredProperties = properties.filter((property) => 
    property.name.toLowerCase().includes(searchText.toLowerCase()) ||
    property.description.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <FilterInput onSearch={setSearchText} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {isLoading ? (
          <p className='property-block'>Loading...</p>
        ) : filteredProperties.length === 0 ? (
          <p className='property-block'>No properties match your search.</p>
        ) : (
          filteredProperties.map((property) => (
            <Property key={property.id} property={property} />
          ))
        )}
      </div>
    </>
  );
}
const PropertiesListWithLoading = withLoading(PropertiesList);

function App() {
  const [properties, setProperties] = useState([]);  

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await DataSelector();
        setProperties(data); // Update properties state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  
  return (
    <div className="App">
      <Banner />
      <PropertiesListWithLoading properties={properties} />
    </div>
  );
}

export default App;
