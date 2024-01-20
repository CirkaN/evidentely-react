import { ReactNode, createContext, useContext, useState } from "react";

interface User {
    id: number,
    name: string,
    email: string,
    company_name: string,
    avatar_url: string,
    business_type_slug: string,
    email_verified_at: string | null,
    price_plan_details?: PricePlanDetails
}
interface PricePlanDetails {
    is_trial: boolean,
    available_sms_count: number,
    plan_expires_within: number,
    plan_name: string,
    plan_id: number
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
        setUser(() => {
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });

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


// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser }


