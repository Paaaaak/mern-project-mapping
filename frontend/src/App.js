import React, {useState, useEffect} from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons'
import './App.css';
import axios from 'axios';

function App() {
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 8
  });

  const [showPopup, setShowPopup] = useState(true);

  const [pins, setPins] = useState([]);

  // get all pins from database everytime refreshing the page
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getPins();
  }, []);

  return (
    <div className='App'>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={viewState}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        mapStyle="mapbox://styles/jaehyeonpaak/clk3lonwv000q01rd0jcu3lsf">
        {pins.map((pin) => (
          <React.Fragment>
            <Marker
              longitude={pin.long}
              latitude={pin.lat}
              anchor='bottom'>
              <Room style={{ fontSize: viewState.zoom * 6, color: 'red' }}></Room>
            </Marker>
            <Popup
              longitude={pin.long}
              latitude={pin.lat}
              anchor="left"
              onClose={() => setShowPopup(false)}>
              <div className='card'>
                <label>Place</label>
                <h4 className='place'>{pin.title}</h4>
                <label>Review</label>
                <p className='description'>{pin.discription}</p>
                <label>Rating</label>
                <div className='stars'>
                  <Star className='star'></Star>
                  <Star className='star'></Star>
                  <Star className='star'></Star>
                  <Star className='star'></Star>
                  <Star className='star'></Star>
                </div>
                <label>Information</label>
                <span className='username'>Created by <b>{pin.username}</b></span>
                <span className='date'>1 hour ago</span>
              </div>
            </Popup>
          </React.Fragment>
        ))}
      </Map>
    </div>
  );
}

export default App;