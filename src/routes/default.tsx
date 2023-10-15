import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

const DefaultPage = () => {

    return (
        <>
        <div>
        <NavBar></NavBar>
            <div className="px-64 py-5 bg-slate-50 h-screen" >
            <Outlet/>
            </div>
        </div>
      
        </>
    );
}

export default DefaultPage;