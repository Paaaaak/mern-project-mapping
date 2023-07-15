import React, {useState} from 'react';
import Map from 'react-map-gl';

function App() {
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 8
  });

  return (
    <div className='App'>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={viewState}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default App;