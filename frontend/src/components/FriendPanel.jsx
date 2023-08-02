import React, { useEffect, useState, useRef, useCallback } from 'react';
import './FriendPanel.css';
import {Cancel, PanoramaFishEye} from '@material-ui/icons'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const FriendPanel = (props) => {
  // friends list grid data
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const visibleClickHandler = (e) => {
    console.log(e.data.id);
  };

  const unfollowClickHandler = (e) => {
    console.log(e.data.id);
  };

  // friends list grid columns
  const [columnDefs] = useState([
    { headerName: 'Profile', field: 'profile', width: 80 },
    { headerName: 'Id', field: 'id', hide: true},
    { headerName: 'Name', field: 'name', width: 80 },
    { headerName: 'Color',field: 'color', width: 90 },
    { 
      headerName: 'Pin visible', 
      field: 'visible', 
      width: 100, 
      cellRenderer: function(e) {
        return (<button onClick={() => console.log('Toggle: ' + e.data.id)}>Toggle</button>);
      }
    },
    { 
      headerName: 'Following', 
      field: 'following', 
      width: 100, 
      cellRenderer: function(e) {
        return (<button onClick={() => console.log('Unfollow: ' + e.data.id)}>Click</button>);
      }
    }
  ]);

  
  useEffect(() => {
    const followingList = [];
    props.friends.map((friend) => {
      const rowData = { profile: 'Default', id: friend._id, name: friend.username, color: friend.color };
      followingList.push(rowData);
    });
    setRowData(followingList);
  }, [props.friends]);

  return (
    <div className='friend-list-panel'>
      <Cancel className='friend-cancel' onClick={() => props.setShowFriend(false)}></Cancel>
      <form className='friend-form' onSubmit={props.searchFriendSubmitHandler}>
        <input type='text' minLength={4} placeholder='Type username' onChange={(event) => props.setFindUsername(event.target.value)}></input>
        <button className='submit-button' type='submit'>Search Friend</button>
      </form>
      <div style={{height: '50px'}}>
        {props.foundUser && (
          <div className='friend-info'>
            <span style={{fontSize: '15px', fontWeight: 'bold'}}>{props.foundUser.username}</span>
            <button onClick={props.followClickHandler}>Follow</button>
            {/* <button onClick={props.unfollowClickHandler}>Unfollow</button> */}
          </div>
        )}
      </div>
      <span style={{fontSize: '15px', fontWeight: 'bold'}}>Friends list</span>
      <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowHeight={50}
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
    );
};

export default FriendPanel;