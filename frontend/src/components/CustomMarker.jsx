import {React} from 'react';
import {Marker} from 'react-map-gl';
import {Room} from '@material-ui/icons'

const CustomMarker = (props) => {
  return (
    <Marker
      anchor='bottom'
      longitude={props.pin.long}
      latitude={props.pin.lat}
      onClick={(event) => {
        event.originalEvent.stopPropagation();
        props.onClick(props.pin._id, props.pin.long, props.pin.lat);
      }}>
      <Room
        style={{
          fontSize: props.viewState.zoom * 4,
          transform: `translate(0, ${props.viewState.zoom}px)`,
          color: props.pin.username === props.user ? 'SeaGreen' : 'IndianRed',
          cursor: 'pointer'
        }}>
      </Room>
    </Marker>
  );
};

export default CustomMarker;