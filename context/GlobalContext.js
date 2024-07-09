'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

// Create the context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider( { children } ) {
  // Number of user's unread messages shown in the navbar.
  const [unreadCount, setUnreadCount] = useState( 0 );
  const { data: session } = useSession();

  useEffect( () => {
    if ( session && session.user ) {
      getUnreadMessageCount().then( ( res ) => {
        if ( res.count ) setUnreadCount( res.count );
      })
    }
  }, [unreadCount, session] );

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
  return useContext( GlobalContext );
}
