import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState(null);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, image, setImage }}>
    {children}
  </AuthContext.Provider>
}