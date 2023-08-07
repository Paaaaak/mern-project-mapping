import React, {useState, useEffect, useRef} from 'react';
import Map from 'react-map-gl';
import {Help} from '@material-ui/icons'
import './App.css';
import axios from 'axios';
import CustomMarker from './components/CustomMarker';
import Register from './components/Register';
import Login from './components/Login';
import Guide from './components/Guide';
import CustomPopup from './components/CustomPopup';
import CustomNewPopup from './components/CustomNewPopup';
import UserPanel from './components/UserPanel';
import FriendPanel from './components/FriendPanel';

function App() {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));
  const [color, setColor] = useState(localStorage.getItem('color'));
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [pins, setPins] = useState([]);
  const mapRef = useRef();
  const [viewState] = useState({
    longitude: -280.4,
    latitude: 37.8,
    zoom: 7
  });
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(1);
  const [showRegister, setShowRegister] = useState(false);
  const [showFriend, setShowFriend] = useState(false);
  const [guideClick, setGuideClick] = useState(false);
  const [findUsername, setFindUsername] = useState(null);
  const [foundUser, setFoundUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [userIdList, setUserIdList] = useState([localStorage.getItem('userId')]);

  const getPinsByUserId = async (userId) => {
    try {
      const res = await axios.get('/pins/' + userId);
      // 기존에 존재하던 Pin들에 추가로 다른 유저의 Pin 값들을 추가
      // setPins(prev => [...prev, ...res.data.map(pin => pin)]);
      console.log('Pins list:', res.data);
      setPins(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const getFollowings = async () => {
    try {
      const res = await axios.get('/users/' + currentUserId + '/followings');
      const followings = [];
      res.data.map((data) => {
        followings.push(data.username);
      });
      setFriends(res.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(async () => {
    const fetchData = async () => {
      // get all pins from database everytime refreshing the page
      await getPinsByUserId(currentUserId);
      // get all follow from database everytime refreshing the page
      if (currentUserId) {
        await getFollowings();
      }
    }
    fetchData();
  }, [currentUserId]);

  /* executed when clicking the marker */
  const markerClickHandler = (id, long, lat) => {
    setCurrentPlaceId(id);
    mapRef.current?.flyTo({center: [long, lat], duration: 1000});
  };

  /* executed when clicking the map */
  const mapClickHandler = () => {
    setCurrentPlaceId(null);
    setGuideClick(null);
    setShowFriend(false);
  };

  /* executed when clicking the map with right mouse */
  const mapRightClickHandler = (event) => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    setNewPlace({
      longitude: longitude,
      latitude: latitude
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newPin = {
      username: currentUser,
      userId: currentUserId,
      title: title,
      description: description,
      rating: rating,
      lat: newPlace.latitude,
      long: newPlace.longitude,
      color: color
    }

    try {
      // create new pin
      const res = await axios.post('/pins', newPin);
      setPins(prev => [...prev, res.data]);
      setNewPlace(null);
    }
    catch (error) {
      console.log(error);
    }
  };

  const searchFriendSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const findingUser = {
        username: findUsername
      };
      const res = await axios.post('/users/get', findingUser);
      if (res.data) {
        setFoundUser(res.data);
      }
      else {
        console.log('User does not exist!');
        setFoundUser(false);
      }
    }
    catch (error) {
      console.log(error);
      alert(error.response.data);
      setFoundUser(false);
    }
  };

  const logoutClickHandler = () => {
    setCurrentUser(null);
    setShowFriend(false);
    localStorage.removeItem('user');
  };

  const updateClickHandler = async (popupInfo) => {
    try {
      const updatedPopup = await axios.put('/pins/update/' + currentPlaceId, popupInfo);
      getPinsByUserId(currentUserId);
    }
    catch (error) {
      console.log(error);
    }
  }

  const deleteClickHandler = async () => {
    if (!window.confirm('Do you want to delete this pin?')) {
      return;
    } 

    try {
      const res = await axios.get('/pins/delete/' + currentPlaceId);
      console.log('Deleted pin:', res);
      getPinsByUserId(currentUserId);
    }
    catch (error) {
      console.log(error);
    }
  };

  const guideClickHandler = () => {
    setGuideClick(prev => !prev);
  };

  const followClickHandler = async () => {
    try {
      await axios.put('/users/' + foundUser._id + '/follow', { userId: currentUserId });
      getFollowings();
      setFoundUser(false);
    }
    catch (error) {
      console.log(error);
    }
  };

  const unfollowClickHandler = async (userId) => {
    try {
      await axios.put('/users/' + userId + '/unfollow', { userId: currentUserId });
      getFollowings();
      setFoundUser(false);
    }
    catch (error) {
      console.log(error);
    }
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
              color={color}
              pin={pin}>
            </CustomMarker>
            {currentPlaceId === pin._id && (
              <CustomPopup
                pin={pin}
                setCurrentPlaceId={setCurrentPlaceId}
                updateClickHandler={updateClickHandler}
                deleteClickHandler={deleteClickHandler}>
              </CustomPopup>
            )}
          </div>
        ))}
        {newPlace && (
          <CustomNewPopup
            newPlace={newPlace}
            setNewPlace={setNewPlace}
            submitHandler={submitHandler}
            setTitle={setTitle}
            setDescription={setDescription}
            setRating={setRating}>
          </CustomNewPopup>
        )}
        <div className='guide-icon'>
          <Help onClick={guideClickHandler} style={{color: 'white'}}></Help>
        </div>
        {guideClick && (
          <Guide cancelClick={() => setGuideClick(null)}></Guide>
        )}
        {currentUser ? '' : (
          <Login 
            setShowRegister={setShowRegister}
            setCurrentUser={setCurrentUser}
            setCurrentUserId={setCurrentUserId}
            setColor={setColor}
            localStorage={localStorage}>
          </Login>
        )}
        <UserPanel
          currentUser={currentUser}
          currentUserId={currentUserId}
          logoutClick={logoutClickHandler}
          setShowFriend={setShowFriend}
          setColor={setColor}
          color={color}>
        </UserPanel>
        {showRegister && (
          <Register cancelClick={() => setShowRegister(false)}></Register>
        )};
        {showFriend && (
          <FriendPanel
            setShowFriend={setShowFriend}
            foundUser={foundUser}
            followClickHandler={followClickHandler}
            unfollowClickHandler={unfollowClickHandler}
            searchFriendSubmitHandler={searchFriendSubmitHandler}
            setUserIdList={setUserIdList}
            userIdList={userIdList}
            setFindUsername={setFindUsername}
            friends={friends}>
          </FriendPanel>
        )}
      </Map>
    </div>
  );
}

export default App;