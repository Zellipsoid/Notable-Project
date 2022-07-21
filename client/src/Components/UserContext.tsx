import axios from 'axios';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { UserInterface } from '../Interfaces/UserInterface';

export const userContext = createContext<Partial<UserInterface>>({});
export default function UserContext(props: PropsWithChildren) {
    const [user, setUser] = useState<UserInterface>();
    // TODO: I don't like how this gets the user on every re-render. I want to save the user to the context on login and remove it upon logout in the future.
    useEffect(() => {
        // TODO: Move the server URL into an env file
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
