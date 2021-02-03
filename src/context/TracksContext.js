import { createContext, useState } from "react";

export const TracksContext = createContext();

export const TracksProvider = ({ children }) => {
  const [ status, setStatus ] = useState('')

  return <TracksContext.Provider value={{status, setStatus}}>
    {children}
  </TracksContext.Provider>
}