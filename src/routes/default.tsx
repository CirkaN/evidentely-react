import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import Auth from "../auth";

const DefaultPage = () => {

    return (
        <>
            <div>
                <Auth></Auth>
                <NavBar></NavBar>
                <div className="p-4 md:p-8 lg:p-12 bg-slate-50 min-h-screen" >
                    <Outlet />
                </div>
            </div>

        </>
    );
}

export default DefaultPage;