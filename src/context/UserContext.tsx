import { ReactNode, createContext, useContext, useState } from "react";


interface User {
    id: number,
    name:string,
    email: string,
}
interface UserProviderProps {
    children: ReactNode,
}
interface UserContextProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

const UserProvider = (props: UserProviderProps) => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const [user, setUser] = useState<User | null>(storedUser);

    const login = (newUser: User) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token')
        setUser(null);
    };
    const contextValues = {
        user,
        login,
        logout
    }
    return <UserContext.Provider value={contextValues}>{props.children}</UserContext.Provider>
}


export { UserProvider, useUser }


