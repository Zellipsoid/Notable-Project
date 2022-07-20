import axios from 'axios';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { UserInterface } from '../Interfaces/UserInterface';

export const userContext = createContext<Partial<UserInterface>>({});
export default function UserContext(props: PropsWithChildren) {
    const [user, setUser] = useState<UserInterface>();
    useEffect(() => {
        axios.get("http://localhost:4000/user", {
            withCredentials: true
        }).then(res => {
          console.log(res.data);
            setUser(res.data);
        })
    }, [])
  return (
    <userContext.Provider value = {user!}>{props.children}</userContext.Provider>
  )
}
