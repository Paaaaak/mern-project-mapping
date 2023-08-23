import React, { useEffect, useState, useRef } from 'react';
import './FriendPanel.css';
import {Cancel, PanoramaFishEye} from '@material-ui/icons'
import SearchIcon from '@mui/icons-material/Search';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import User from '../assets/user.png';

const FriendPanel = (props) => {
  // friends list grid data
  const [rowData, setRowData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const gridRef = useRef();

  const unfollowClickHandler = (e) => {
    props.unfollowClickHandler(e.data.id);
  };

  const colorCellRenderer = (params) => {
    const color = params.value;
    return (
      <div className='friend-color' style={{ backgroundColor: color}}>
        <span>{color}</span>
      </div>
    );
  };

  // friends list grid columns
  const [columnDefs] = useState([
    { 
      headerName: '', 
      field: 'profile', 
      flex: 0.6,
      cellRenderer: function(e) {
        return (<img src={User} style={{transform: 'scale(1)', border: '1px solid gray', borderRadius: '50%', marginTop: '5px'}}></img>);
      }
    },
    { headerName: 'Id', field: 'id', hide: true},
    { headerName: 'Name', field: 'name', flex: 1, },
    { 
      headerName: 'Color', 
      field: 'color', 
      flex: 1,
      cellRenderer: colorCellRenderer
    },
    { 
      headerName: 'Following', 
      field: 'following', 
      flex: 1,
      cellRenderer: function(e) {
        return (<button className='unfollow-button' onClick={() => unfollowClickHandler(e)}>Unfollow</button>);
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

  // 유저 검색 시 이미 팔로우중인 유저일경우 Following 버튼으로 전환
  useEffect(() => {
    // 배열 요소의 하나라도 조건을 만족한다면 true 반환
    const isFollowing = rowData.some((following) => following.id === props.foundUser._id);
    setIsFollowing(isFollowing);
  }, [props.foundUser]);

  return (
    <div className='friend-list-panel'>
      <Cancel className='friend-cancel' onClick={() => props.setShowFriend(false)}></Cancel>
      <form className='friend-form' onSubmit={props.searchFriendSubmitHandler}>
        <div className='friend-search-container'>
          <SearchIcon style={{color: 'gray', transform: 'scale(0.8)'}}></SearchIcon>
          <input type='text' minLength={4} placeholder='Type username' onChange={(event) => props.setFindUsername(event.target.value)}></input>
        </div>
        <button className='submit-button' type='submit'>Search Friend</button>
      </form>
      <div className='friend-info-container' style={{height: '50px'}}>
        {props.foundUser && (
          <div className='friend-info'>
            <img src={User} style={{transform: 'scale(1)', border: '1px solid gray', borderRadius: '50%', marginTop: '5px'}}></img>
            <span style={{fontSize: '15px', fontWeight: 'bold'}}>{props.foundUser.username}</span>
            <button className={`follow-button ${isFollowing ? 'following' : ''}`} onClick={props.followClickHandler} disabled={isFollowing}>{isFollowing ? 'Following' : 'Follow'}</button>
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