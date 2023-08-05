import {React} from 'react';
import {Marker} from 'react-map-gl';
import {Room} from '@material-ui/icons'
import {motion} from "framer-motion";

const CustomMarker = (props) => {
  return (
    <motion.div>
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
            color: props.color,
            cursor: 'pointer'
          }}>
        </Room>
      </Marker>
    </motion.div>
  );
};

export default CustomMarker;