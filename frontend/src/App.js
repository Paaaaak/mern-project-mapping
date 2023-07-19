import React, {useState, useEffect, useRef} from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons'
import './App.css';
import axios from 'axios';
import {format} from 'timeago.js';

function App() {
  const currentUser = 'Megan';
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
  const [rating, setRating] = useState(0);

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

  /* executed when clicking the marker */
  const markerClickHandler = (id, long, lat) => {
    console.log('Marker cliked: ' + id);
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

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(title + ' ' + description + ' ' + rating);
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
            <Marker
              longitude={pin.long}
              latitude={pin.lat}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                markerClickHandler(pin._id, pin.long, pin.lat)
              }}
              anchor='bottom'>
              <Room
                style={{ 
                  fontSize: viewState.zoom * 6, 
                  color: pin.username === currentUser ? 'blue' : 'red' ,
                  cursor: 'pointer'
                }}>
              </Room>
            </Marker>
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
                  <p className='description'>{pin.discription}</p>
                  <label>Rating</label>
                  <div className='stars'>
                    {getStarsForRating(pin.rating)}
                  </div>
                  <label>Information</label>
                  <span className='username'>Created by <b>{pin.username}</b></span>
                  <span className='date'>{format(pin.createdAt)}</span>
                </div>
              </Popup>
            )}
            {newPlace && (
              <Popup
                longitude={newPlace.longitude}
                latitude={newPlace.latitude}
                anchor="left"
                onClose={() => setNewPlace(null)}>
                <div>
                  <form onSubmit={submitHandler}>
                    <label>Title</label>
                    <input placeholder='Enter a title' onChange={(event) => setTitle(event.target.value)}></input>
                    <label>Review</label>
                    <textarea placeholder='Leave your impression about this place!' onChange={(event) => setDescription(event.target.value)}></textarea>
                    <label>Rating</label>
                    <select onChange={(event) => setRating(event.target.value)}>
                      <option value='1'>1</option>
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
          </div>
        ))}
      </Map>
    </div>
  );
}

export default App;