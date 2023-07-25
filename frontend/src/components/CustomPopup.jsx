import React from 'react';
import {Star} from '@material-ui/icons';
import {Popup} from 'react-map-gl';
import {format} from 'timeago.js';
import './CustomPopup.css';

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
        <label>Place</label>
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
        <span className='delete-pin' onClick={props.deleteClickHandler}>Delete this pin</span>
      </div>
    </Popup>
  );
};

export default CustomPopup;