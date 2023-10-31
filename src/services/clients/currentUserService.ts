import { useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";

export interface loggedUser {
    name: string;
    email: string;
    role: string;
    company_id: string;
}


export const useLoggedUser = () => {
    const [loggedUser, setLoggedUser] = useState<loggedUser | undefined>(undefined);

    const getLoggedUser = () => {
        return loggedUser;
    };

    const isUserLogged = () => {
        return !!loggedUser;
    };


    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            axios_instance.post("/auth/me").then((response) => {
                setLoggedUser(response.data);
            });
        } else {
            setLoggedUser(undefined);
        }

    }, []);

    return { loggedUser, getLoggedUser, isUserLogged };
};
