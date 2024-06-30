'use client';
import { createContext, useContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  // Number of user's unread messages shown in the navbar.
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{
      unreadCount,
      setUnreadCount,
    }}>
      { children }
    </GlobalContext.Provider>
  );
}

// Create custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
