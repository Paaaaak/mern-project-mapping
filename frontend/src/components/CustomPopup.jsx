import React from 'react';
import {Star} from '@material-ui/icons';
import {Popup} from 'react-map-gl';
import {format} from 'timeago.js';
import './CustomPopup.css';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CustomPopup = (props) => {
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
    <Popup
      longitude={props.pin.long}
      latitude={props.pin.lat}
      anchor="left"
      onClose={() => props.setCurrentPlaceId(null)}>
      <div className='card'>
        <label>Title</label>
        <h4 className='place'>{props.pin.title}</h4>
        <label>Review</label>
        <p className='description'>{props.pin.description}</p>
        <label>Rating</label>
        <div className='stars'>
          {getStarsForRating(props.pin.rating)}
        </div>
        <label>Information</label>
        <span className='username'>Created by <b>{props.pin.username}</b></span>
        <span className='date'>{format(props.pin.createdAt)}</span>
        <div className='pin-button-container'>
          <div className='edit-pin'>
            <ModeEditIcon style={{fontSize: '14px'}}></ModeEditIcon>
            <span onClick={props.editClickHandler}>Edit this pin</span>
          </div>
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