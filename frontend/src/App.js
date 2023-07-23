import React, {useState, useEffect, useRef} from 'react';
import Map, {Popup} from 'react-map-gl';
import {Star, Help} from '@material-ui/icons'
import './App.css';
import axios from 'axios';
import {format} from 'timeago.js';
import CustomMarker from './components/CustomMarker';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [pins, setPins] = useState([]);
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 8
  });
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(1);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const getPins = async () => {
    try {
      const res = await axios.get('/pins');
      setPins(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  // get all pins from database everytime refreshing the page
  useEffect(() => {
    getPins();
  }, []);

  /* executed when clicking the marker */
  const markerClickHandler = (id, long, lat) => {
    console.log('Marker ID: ' + id + ', Long: ' + long + ', Lat: ' +lat);
    setCurrentPlaceId(id);
    mapRef.current?.flyTo({center: [long, lat], duration: 1000});
  };

  /* executed when clicking the map */
  const mapClickHandler = () => {
    setCurrentPlaceId(null);
  };

  /* executed when clicking the map with right mouse */
  const mapRightClickHandler = (event) => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    console.log(longitude + ' ' + latitude);
    setNewPlace({
      longitude: longitude,
      latitude: latitude
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newPin = {
      username: currentUser,
      title: title,
      description: description,
      rating: rating,
      lat: newPlace.latitude,
      long: newPlace.longitude
    }

    try {
      const res = await axios.post('/pins', newPin);
      setPins(prev => [...prev, res.data]);
      setNewPlace(null);
    }
    catch (error) {
      console.log(error);
    }
  };

  const getStarsForRating = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<Star key={`star-gold-${i}`} className='star-gold'></Star>);
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<Star key={`star-${i}`} className='star'></Star>);
    }
    return stars;
  };

  const logoutClickHandler = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const deleteClickHandler = async () => {
    if (!window.confirm('Do you want to delete this pin?')) {
      return;
    } 

    try {
      const res = await axios.get('/pins/delete?id=' + currentPlaceId);
      console.log(res.data);
      getPins();
    }
    catch (error) {
      console.log(error);
    }
  };

  const helpClickHandler = () => {
    alert('Help clicked!');
  };

  return (
    <div className='App'>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={viewState}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        mapStyle="mapbox://styles/jaehyeonpaak/clk3lonwv000q01rd0jcu3lsf"
        onClick={mapClickHandler}
        onContextMenu={mapRightClickHandler}>
        {pins.map((pin) => (
          <div key={pin._id}>
            <CustomMarker 
              user={currentUser} 
              viewState={viewState}
              onClick={markerClickHandler}
              pin={pin}>
            </CustomMarker>
            {currentPlaceId === pin._id && (
              <Popup
                longitude={pin.long}
                latitude={pin.lat}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}>
                <div className='card'>
                  <label>Place</label>
                  <h4 className='place'>{pin.title}</h4>
                  <label>Review</label>
                  <p className='description'>{pin.description}</p>
                  <label>Rating</label>
                  <div className='stars'>
                    {getStarsForRating(pin.rating)}
                  </div>
                  <label>Information</label>
                  <span className='username'>Created by <b>{pin.username}</b></span>
                  <span className='date'>{format(pin.createdAt)}</span>
                  <span className='delete-pin' onClick={deleteClickHandler}>Delete this pin</span>
                </div>
              </Popup>
            )}
          </div>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.longitude}
            latitude={newPlace.latitude}
            anchor="left"
            onClose={() => setNewPlace(null)}>
            <div className='card'>
              <form onSubmit={submitHandler}>
                <label>Title</label>
                <input placeholder='Enter a title' onChange={(event) => setTitle(event.target.value)}></input>
                <label>Review</label>
                <textarea placeholder='Leave your impression about this place!' onChange={(event) => setDescription(event.target.value)}></textarea>
                <label>Rating</label>
                <select onChange={(event) => setRating(event.target.value)}>
                  <option defaultValue='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <button className='submit-button' type='submit'>Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
        <div className='guideline'>
          <Help onClick={helpClickHandler} style={{color: 'white'}}></Help>
        </div>
        {currentUser ? (
          <div className='button-container'>
            <span>Welcome <b>{currentUser}!</b></span>
            <button className='button logout' onClick={logoutClickHandler}>Logout</button>
          </div>
        ) : (
          <div className='button-container'>
            <button className='button login' onClick={() => setShowLogin(true)}>Login</button>
            <button className='button register' onClick={() => setShowRegister(true)}>Register</button>
          </div>
        )}
        {showRegister && (
          <Register 
            cancelClick={() => setShowRegister(false)}>
          </Register>
        )};
        {showLogin && (
          <Login 
            cancelClick={() => setShowLogin(false)} 
            setShowLogin={setShowLogin}
            setCurrentUser={setCurrentUser}
            localStorage={localStorage}>
          </Login>)}
      </Map>
    </div>
  );
}

export default App;