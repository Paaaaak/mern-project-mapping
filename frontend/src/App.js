import React, {useState} from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons'
import './App.css';

function App() {
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 8
  });

  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className='App'>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={viewState}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        mapStyle="mapbox://styles/jaehyeonpaak/clk3lonwv000q01rd0jcu3lsf">
        <Marker 
          longitude={-122.4}
          latitude={37.8}
          anchor='bottom'>
          <Room style={{fontSize: viewState.zoom * 6, color: 'red'}}></Room>
        </Marker>
        {/* <Popup 
          longitude={-122.4} 
          latitude={37.8}
          anchor="left"
          onClose={() => setShowPopup(false)}>
          <div className='card'>
            <label>Place</label>
            <h4 className='place'>Lotte Tower</h4>
            <label>Review</label>
            <p className='description'>Fascinating</p>
            <label>Rating</label>
            <div className='stars'>
              <Star className='star'></Star>
              <Star className='star'></Star>
              <Star className='star'></Star>
              <Star className='star'></Star>
              <Star className='star'></Star>
            </div>
            <label>Information</label>
            <span className='username'>Created by <b>jaehyeonpaak</b></span>
            <span className='date'>1 hour ago</span>
          </div>
        </Popup> */}
      </Map>
    </div>
  );
}

export default App;