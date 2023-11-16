import { useNavigate } from "react-router-dom";
import axios_instance from "./config/api_defaults";
import { useEffect } from "react";

const AuthCheck = () => {
    const auth_token = localStorage.getItem('auth_token');
    const auth_expire_at = localStorage.getItem('token_expires_at');
    const last_token_check = localStorage.getItem('last_check');

    useEffect(() => {
        if (!auth_token) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth_token]);
    const navigate = useNavigate();
    const checkForValidity = (type: string) => {
        if (type == 'refresh') {
            axios_instance().post('/auth/refresh')
                .then((response) => {
                    localStorage.setItem('auth_token', response.data.access_token);
                    const tokenExpireAt = new Date(Date.now() + response.data.expires_in * 1000).toISOString().replace('T', ' ').split('.')[0];
                    const lastCheck = new Date(Date.now()).toISOString().replace('T', ' ').split('.')[0];
                    localStorage.setItem('token_expires_at', tokenExpireAt);
                    localStorage.setItem('last_check', lastCheck)
                })
                .catch(() => {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('token_expires_at');
                    navigate('/login');
                })
        } else {
            axios_instance().post('/auth/me')
                .then(() => {
                    checkForValidity('refresh');
                })
                .catch(() => {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('token_expires_at');
                })
        }

    }


    if (auth_token && auth_expire_at && last_token_check) {

        const isExpired = new Date(auth_expire_at) < new Date();
        const calculateTimeDiffForTokenExpiration = new Date(Date.now() + (1.5 * 3600000)).getTime() - new Date(auth_expire_at).getTime();
        const diffInTokenExpiration = calculateTimeDiffForTokenExpiration / 1000 / 60;

        const calculateLastCheck = new Date(Date.now() + 1800000).getTime() - new Date(last_token_check).getTime();
        const diffInLastCheck = calculateLastCheck / 1000 / 60;

        if (isExpired) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('token_expire_at');
        }
        if (diffInTokenExpiration < 20) {
            checkForValidity('refresh');
        }
        if (diffInLastCheck > 150) {
            checkForValidity('check');
        }
    }

    return (<></>)
}

export default AuthCheck






