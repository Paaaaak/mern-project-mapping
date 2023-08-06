import React, {useEffect, useState, useRef} from 'react';
import {Star} from '@material-ui/icons';
import {Popup} from 'react-map-gl';
import {format} from 'timeago.js';
import './CustomPopup.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const CustomPopup = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const titleRef = useRef(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

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

  const editClickHandler = () => {
    setIsEdit(prev => !prev);
  };

  const updateClickHandler = () => {
    setIsEdit(prev => !prev);
    const popupInfo = {};
    if (title) {
      popupInfo.title = title;
    }
    if (description) {
      popupInfo.description = description;
    }
    props.updateClickHandler(popupInfo);
  };

  useEffect(() => {
    if (isEdit && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEdit]);

  return (
    <Popup
      longitude={props.pin.long}
      latitude={props.pin.lat}
      anchor="left"
      onClose={() => props.setCurrentPlaceId(null)}>
      <div className='card'>
        <label>Title</label>
        {isEdit ? (
          <input className='edit-place' type='text' ref={titleRef} defaultValue={props.pin.title} onChange={(e) => setTitle(e.target.value)}></input>
        ) : (
          <h4 className='place'>{props.pin.title}</h4>
        )}
        <label>Review</label>
        {isEdit ? (
          <textarea className='edit-description' defaultValue={props.pin.description} onChange={(e) => setDescription(e.target.value)}></textarea>
        ) : (
          <p className='description'>{props.pin.description}</p>
        )}
        <label>Rating</label>
        <div className='stars'>
          {getStarsForRating(props.pin.rating)}
        </div>
        <label>Information</label>
        <span className='username'>Created by <b>{props.pin.username}</b></span>
        <span className='date'>{format(props.pin.createdAt)}</span>
        <div className='pin-button-container'>
          {isEdit ? (
            <div className='update-pin' onClick={() => updateClickHandler()}>
              <SaveAltIcon style={{fontSize: '14px', marginRight: '2px'}}></SaveAltIcon>
              <span>Update this pin</span>
            </div>
          ) : (
            <div className='edit-pin' onClick={() => editClickHandler()}>
              <ModeEditIcon style={{fontSize: '14px', marginRight: '2px'}}></ModeEditIcon>
              <span>Edit this pin</span>
            </div>
          )}
          <div className='delete-pin'>
            <DeleteOutlineIcon style={{fontSize: '14px'}}></DeleteOutlineIcon>
            <span onClick={props.deleteClickHandler}>Delete this pin</span>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default CustomPopup;