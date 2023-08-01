import React, { useEffect, useState } from 'react';
import './FriendPanel.css';
import {Cancel} from '@material-ui/icons'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import UnfollowRenderer from './UnfollowRenderer';
import PinVisibleRenderer from './PinVisibleRenderer';

const FriendPanel = (props) => {
  // friends list grid data
  const [rowData, setRowData] = useState([]);
  // friends list grid columns
  const [columnDefs] = useState([
    { headerName: 'Profile', field: 'profile', width: 80 },
    { headerName: 'Name', field: 'name', width: 80 },
    { headerName: 'Color',field: 'color', width: 80 },
    { headerName: 'Pin visible', field: 'visible', width: 80, cellRenderer: PinVisibleRenderer },
    { headerName: 'Following', field: 'following', width: 80, cellRenderer: UnfollowRenderer }
  ]);
  
  useEffect(() => {
    const followingList = [];
    props.friends.map((friend) => {
      const rowData = { profile: 'Default', name: friend.username, color: friend.color };
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
            <button onClick={props.unfollowClickHandler}>Unfollow</button>
          </div>
        )}
      </div>
      <span style={{fontSize: '15px', fontWeight: 'bold'}}>Friends list</span>
      <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
        <AgGridReact
          rowHeight={50}
          rowData={rowData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
    );
};

export default FriendPanel;