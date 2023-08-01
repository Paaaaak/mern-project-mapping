import React, { useEffect, useState } from 'react';
import './FriendPanel.css';
import {Cancel} from '@material-ui/icons'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed

const FriendPanel = (props) => {
  // friends list grid data
  const [rowData, setRowData] = useState([]);
  // friends list grid columns
  const [columnDefs] = useState([
    { field: 'profile', width: 80 },
    { field: 'name', width: 100 },
    { field: 'color', width: 100 },
    { field: 'visible', width: 100 }
  ]);
  
  useEffect(() => {
    const followingList = [];
    props.friends.map((friend) => {
      const rowData = { profile: 'Default', name: friend.username, color: friend.color, visible: 'T'};
      followingList.push(rowData);
    });
    setRowData(followingList);
  }, [props.friends]);

  return (
    <div className='friend-list-panel'>
      <Cancel className='friend-cancel' onClick={() => props.setShowFriend(false)}></Cancel>
      <form onSubmit={props.searchFriendSubmitHandler}>
        <input type='text' className='friend-form' minLength={4} placeholder='Type username' onChange={(event) => props.setFindUsername(event.target.value)}></input>
        <button className='submit-button' type='submit'>Search Friend</button>
      </form>
      <div className='friend-info'>
        {props.foundUser && (
          <div>
            <span>{props.foundUser.username}</span>
            <button onClick={props.followClickHandler}>Follow</button>
            <button onClick={props.unfollowClickHandler}>Unfollow</button>
          </div>
        )}
      </div>
      <span>Friends list</span>
      <div className="ag-theme-alpine" style={{ height: '200px', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
    );
};

export default FriendPanel;