import React, { createContext, useState } from 'react';

const UserDataContext = createContext({
  state: {
    isLoggedIn: false,
    email: 'example01@example.com',
    nickname: '테스트',
  },
  actions: {
    setIsLoggedIn: () => {},
    setEmail: () => {},
    setNickname: () => {},
  },
});

const UserDataProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('example01@example.com');
  const [nickname, setNickname] = useState('테스트');

  const value = {
    state: { isLoggedIn, email, nickname },
    actions: { setIsLoggedIn, setEmail, setNickname },
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

const { Consumer: UserDataConsumer } = UserDataContext;

export { UserDataProvider, UserDataConsumer };

export default UserDataContext;
