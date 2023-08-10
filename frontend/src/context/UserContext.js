import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('userId'));
  
  const updateUser = (user, userId) => {
    setCurrentUser(user);
    setCurrentUserId(userId);
    localStorage.setItem('user', user);
    localStorage.setItem('userId', userId);
  };

  return (
    <UserContext.Provider value={{currentUser, currentUserId, updateUser}}>
        {children}
    </UserContext.Provider>
  );
};