import { React, useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { Room } from '@material-ui/icons';

const CustomMarker = (props) => {
  const [markerTip, showMarkerTip] = useState(false);
  
  // Marker hover event handler
  const markerHoverHandler = (pin) => {
    console.log(pin.username);
    showMarkerTip(true);
  }

  const markerLeaveHandler = () => {
    showMarkerTip(false);
  }

  return (
    <Marker
      anchor='bottom'
      longitude={props.pin.long}
      latitude={props.pin.lat}
      onClick={(event) => {
        event.originalEvent.stopPropagation();
        props.onClick(props.pin._id, props.pin.long, props.pin.lat);
      }}>
      <div
        className='marker-container'
        onMouseLeave={() => markerLeaveHandler()}
        onMouseEnter={() => markerHoverHandler(props.pin)}>
        {markerTip && (
          <Popup
          longitude={props.pin.long}
          latitude={props.pin.lat}
          closeButton={false}
          anchor="top">
            {props.pin.username}
          </Popup>
        )}
        <Room
          style={{
            fontSize: props.viewState.zoom * 4,
            transform: `translate(0, ${props.viewState.zoom}px)`,
            color: props.color,
            cursor: 'pointer'
          }}>
        </Room>
      </div>
    </Marker>
  );
};

export default CustomMarker;