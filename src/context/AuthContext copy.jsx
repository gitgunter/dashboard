/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const sessionToken = Cookies.get('SESSION_TOKEN');
  const [isAuth, setIsAuth] = useState(!!sessionToken);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api.teodrive.com/users/1', {
          headers: {
            Authorization: Cookies.get('SESSION_TOKEN'),
          },
        });
        console.log(response)
        setUserData(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuth) {
      fetchUserData();
    }
  }, [isAuth]);

  const login = (token) => {
    Cookies.set('SESSION_TOKEN', token);
    setIsAuth(true);
  };

  const logout = () => {
    Cookies.remove('SESSION_TOKEN');
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
