import React, {useState} from 'react';
import Map, {Marker} from 'react-map-gl';

import {Room} from '@material-ui/icons'

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
      >
        <Marker 
          longitude={-122.4}
          latitude={37.8}
          anchor='bottom'
        >
          <Room></Room>
        </Marker>
      </Map>
    </div>
  );
}

export default App;