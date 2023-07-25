import React from 'react';
import './CustomNewPopup.css';
import {Popup} from 'react-map-gl';

const CustomNewPopup = (props) => {
  return (
    <Popup
    longitude={props.newPlace.longitude}
    latitude={props.newPlace.latitude}
    anchor="left"
    onClose={() => props.setNewPlace(null)}>
    <div className='card'>
      <form onSubmit={props.submitHandler}>
        <label>Title</label>
        <input placeholder='Enter a title' onChange={(event) => props.setTitle(event.target.value)}></input>
        <label>Review</label>
        <textarea placeholder='Leave your impression about this place!' onChange={(event) => props.setDescription(event.target.value)}></textarea>
        <label>Rating</label>
        <select onChange={(event) => props.setRating(event.target.value)}>
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
  );
}

export default CustomNewPopup;