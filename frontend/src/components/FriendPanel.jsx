import React, { useState } from 'react';
import {Cancel} from '@material-ui/icons'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed

const FriendPanel = (props) => {
  // friends grid
  const [rowData, setRowData] = useState([
    { profile: "Toyota", name: "Celica", color: 35000 },
    { profile: "Ford", name: "Mondeo", color: 32000 },
    { profile: "Porsche", name: "Boxster", color: 72000 }
  ]);

  const [columnDefs] = useState([
    { field: 'profile', width: 120 },
    { field: 'name', width: 120 },
    { field: 'color', width: 120 }
  ]);

    return (
        <div className='friend-list-panel'>
            <Cancel className='friend-cancel' onClick={() => props.setShowFriend(false)}></Cancel>
            {props.foundUser && (
                <div className='friend-info'>
                    <span>{props.foundUser.username}</span>
                    <button onClick={props.followClickHandler}>Follow</button>
                    <button onClick={props.unfollowClickHandler}>Unfollow</button>
                </div>
            )}
            <form onSubmit={props.searchFriendSubmitHandler}>
                <input type='text' className='friend-form' minLength={4} placeholder='Type username' onChange={(event) => props.setFindUsername(event.target.value)}></input>
                <button className='submit-button' type='submit'>Search Friend</button>
            </form>
            <span>Friends list</span>
            <div className='friend-list'>
                {props.friends.map((friend) => {
                    return (
                        <div className='friend'>
                            <span className='friend-profile'></span>
                            <span className='friend-name' key={friend}>{friend}</span>
                            <span>Color</span>
                        </div>
                    );
                })}
            </div>
            <div className="ag-theme-alpine" style={{ height: '100px', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}>
                </AgGridReact>
            </div>
        </div>
    );
};

export default FriendPanel;