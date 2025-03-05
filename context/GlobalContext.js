'use client'
import getUnReadMessageCount from "@/app/actions/getUnReadMessageCount";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

// create context
const GlobalContext = createContext();

// create provider
export function GlobalProvider({children}) {
    const [unReadCount, setUnReadCount] = useState(0);
    const {data: session} = useSession();

    useEffect(() => {
      if (session && session.user) {
        getUnReadMessageCount().then((res) => {
            if (res.count) setUnReadCount(res.count);
        } )
      }
    }, [getUnReadMessageCount, session])
    
    
    return (
        <GlobalContext.Provider value={{
            unReadCount,
            setUnReadCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext(){
    return useContext(GlobalContext);
}

