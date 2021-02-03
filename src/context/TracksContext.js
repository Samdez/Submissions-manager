import { createContext, useState } from "react";

export const TracksContext = createContext();

export const TracksProvider = ({ children }) => {
const [isLogged, setIsLogged] = useState();
  return <TracksContext.Provider value={{isLogged, setIsLogged}}>
    {children}
  </TracksContext.Provider>
}