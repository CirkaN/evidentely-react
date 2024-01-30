import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const EmailConfirm = () => {
    const { refreshUserState } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        refreshUserState();
        navigate("main_dashboard");
    }, []);
    return <p>E-mail je uspesno potvrdjen!</p>;
};
export default EmailConfirm;
