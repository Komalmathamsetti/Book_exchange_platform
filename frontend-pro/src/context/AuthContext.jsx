import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getToken,
  getUserFromToken,
  removeToken,
  setToken,
} from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setAuthToken] = useState(
    getToken()
  );

  useEffect(() => {

    if (token) {

      const decodedUser =
        getUserFromToken();

      setUser(decodedUser);
    }

  }, [token]);

  const login = (newToken) => {

    setToken(newToken);

    setAuthToken(newToken);

    const decodedUser =
      getUserFromToken();

    setUser(decodedUser);
  };

  const logout = () => {

    removeToken();

    setAuthToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};