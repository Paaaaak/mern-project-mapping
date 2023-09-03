import React, { useState, useEffect, useRef, useContext } from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';
import Geocoder from "react-mapbox-gl-geocoder";
import { Help } from '@material-ui/icons'
import SearchIcon from '@mui/icons-material/Search';
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
import { UserContext } from './context/UserContext';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Welcome from './components/Welcome';
import Loading from './components/Loading';
import { motion } from "framer-motion";
import FootprintAnimation from './assets/footprint-animation.gif';

function App() {
  const localStorage = window.localStorage;
  const { currentUser, currentUserId, updateUser } = useContext(UserContext);
  const [color, setColor] = useState(localStorage.getItem('color'));
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [pins, setPins] = useState([]);
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
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
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const getPinsByUserId = async (idList) => {
    try {
      const req = {
        userId: idList
      }
      const res = await axios.post('/pins/get/pinList', req);
      console.log('ID list:', idList, 'Pin list:', res.data);
      setPins(res.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const getFollowings = async () => {
    if (currentUserId !== null && currentUserId !== 'null') {
      try {
        const res = await axios.get('/users/' + currentUserId + '/followings');
        // console.log('Friends list:', res.data);
        setFriends(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  // 페이지 처음 로드됐을시 실행되는 Hook
  useEffect(async () => {
    const fetchData = async () => {
      console.log('Get followings and pins list.');
      await getFollowings();
      // console.log('Current user ID:', currentUserId);
      if (currentUserId) {
        fetch('http://localhost:1035/profile-images/image-' + currentUserId)
          .then((res) => {
            if (res.status === 200) {
              // 이미지가 존재하는 경우
              setProfileImage('/profile-images/image-' + currentUserId);
            } 
            else if (res.status === 404) {
              // 이미지가 없는 경우
              setProfileImage(null);
            } 
            else {
              // 다른 상태 코드를 처리하거나 오류 처리
              console.error('Server returned an unexpected status code:', res.status);
            }
          })
          .catch((error) => {
            console.error('An error occurred while fetching the profile image:', error);
          });
      }
      else {
        setProfileImage(null)
      }
    }
    fetchData();
  }, [currentUserId]);

  useEffect(async () => {
    // console.log('Friends changed', friends);
    const friendsIdList = friends.map((friend) => friend._id);
    friendsIdList.push(currentUserId);
    await getPinsByUserId(friendsIdList);
  }, [friends]);

  /* executed when clicking the marker */
  const markerClickHandler = (id, long, lat) => {
    setCurrentPlaceId(id);
    mapRef.current?.flyTo({ center: [long, lat], duration: 1000 });
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const logoutClickHandler = () => {
    updateUser(null, null);
    setShowFriend(false);
    setUserIdList(null);
    setProfileImage(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('color');
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
    setIsLoading(true);
    try {
      await axios.put('/users/' + foundUser._id + '/follow', { userId: currentUserId });
      getFollowings();
      setFoundUser(false);
    }
    catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const unfollowClickHandler = async (userId) => {
    setIsLoading(true);
    try {
      await axios.put('/users/' + userId + '/unfollow', { userId: currentUserId });
      getFollowings();
      setFoundUser(false);
    }
    catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleViewportChange = (newViewport) => {
    mapRef.current?.flyTo({ center: [newViewport.longitude, newViewport.latitude], zoom: 10, duration: 3000 });
  };

  const showWelcomeHandler = (success) => {
    setShowWelcome(success);
  };

  const logoClickHandler = () => {
    // console.log('Logo clicked!');
    window.location.reload();
  };

  return (
    <div className='App'>
      <div title='Search location' className='map-search-container'>
        <SearchIcon style={{ color: 'gray', transform: 'scale(0.8)' }}></SearchIcon>
        <Geocoder
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          // 검색결과 클릭 시 실행되는 함수 
          onSelected={(newViewport) => {
            handleViewportChange(newViewport);
          }}
          viewport={viewport}>
        </Geocoder> 
      </div>
      <div className='loading-container'>  
        {isLoading && <Loading></Loading>}
      </div>
      <MapGL
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={viewport}
        minZoom={2.5}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onClick={mapClickHandler}
        onContextMenu={mapRightClickHandler}>
        <div title="Reload page" className='map-logo' onClick={logoClickHandler}>
          <img className='map-logo-image' src={FootprintAnimation} alt='animation' style={{transform: 'scale(1)'}}></img>
        </div>
        {pins.map((pin) => (
          <div 
            key={pin._id}>
            <CustomMarker
              viewState={viewport}
              onClick={markerClickHandler}
              color={pin.username === currentUser ? color : pin.color}
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
        <Welcome currentUser={currentUser} showWelcome={showWelcome}></Welcome>
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
        <GeolocateControl 
          position='top-left'
          style={{marginLeft: '120px'}} 
          trackUserLocation>
        </GeolocateControl>
        <motion.div 
          title='Guide'
          className='guide-button'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          <Help onClick={guideClickHandler} style={{ color: 'white', transform: 'scale(1.2)', backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '50%' }}></Help>
        </motion.div>
        {guideClick && (
          <Guide cancelClick={() => setGuideClick(null)}></Guide>
        )}
        {currentUser ? '' : (
          <Login
            setShowRegister={setShowRegister}
            setUserIdList={setUserIdList}
            showWelcomeHandler={showWelcomeHandler}
            setProfileImage={setProfileImage}
            setColor={setColor}>
          </Login>
        )}
        <UserPanel
          logoutClick={logoutClickHandler}
          setShowFriend={setShowFriend}
          setColor={setColor}
          profileImage={profileImage}
          color={color}>
        </UserPanel>
        {showRegister && (
          <Register 
            setShowRegister={setShowRegister}
            cancelClick={() => setShowRegister(false)}>
          </Register>
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
            friends={friends}
            setPins={setPins}>
          </FriendPanel>
        )}
      </MapGL>
    </div>
  );
}

export default App;