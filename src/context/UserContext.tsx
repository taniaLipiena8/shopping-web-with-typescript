import { ReactNode, createContext } from "react";

export type UserContextType = {
    username: string | null
}

type UserContextProviderType = {
    children: ReactNode
}


export const UserContext = createContext<UserContextType | null>(null)

const UserContextProvider = ({ children }: UserContextProviderType) => {
    const username = localStorage.getItem('username')

    return (
        <UserContext.Provider value={{ username }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider