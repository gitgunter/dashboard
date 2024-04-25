/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const sessionToken = Cookies.get('__teodrive-auth.session-token');
  const [isAuth, setIsAuth] = useState(!!sessionToken);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    if (isAuth) {
      const cookie = Cookies.get('__teodrive-auth.session-token');
      const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_=]+$/;
      if (jwtRegex.test(cookie)) {
        try {
          const decodedToken = jwtDecode(cookie);
          if (decodedToken.userId) {
            setIsToken(true);
          } else {
            setIsToken(false);
            setIsAuth(false);
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          setIsToken(false);
          setIsAuth(false);
        }
      } else {
        setIsToken(false);
        setIsAuth(false);
      }
    }
  }, [isAuth]);

  const fetchUserData = async () => {
    if (isToken) {
      const decoded = jwtDecode(Cookies.get('__teodrive-auth.session-token'));
      const response = await axios.get(
        `https://api.teodrive.com/users/${decoded.userId}`,
        {
          headers: {
            Authorization: Cookies.get('__teodrive-auth.session-token'),
          },
        }
      );
      const user = response.data[0];
      return user;
    }
  };

  const queryClient = useQueryClient();

  const { data, isError, isSuccess, isLoading, isFetching, error } = useQuery(
    ['userData'],
    fetchUserData,
    { enabled: isToken }
  );

  const login = (token) => {
    Cookies.set('__teodrive-auth.session-token', token, {
      secure: true,
      sameSite: 'Lax',
    });
    setIsAuth(true);
  };

  const logout = () => {
    Cookies.remove('__teodrive-auth.session-token');
    queryClient.clear();
    setIsAuth(false);
    setIsToken(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login,
        logout,
        data,
        isError,
        isLoading,
        isSuccess,
        error,
        isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
