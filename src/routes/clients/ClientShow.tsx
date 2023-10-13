import { Outlet } from "react-router-dom";

interface ClientDetails {
    id: string,
    client_id: string,
    email: string,
    phone: string,
    address_1: string
}

interface ClientData {
    id: string,
    name: string,
    details: ClientDetails
}

const ClientShow = () => {
    return (
        <>
            <div className="flex">

                <h1>Client show</h1>

                <Outlet />
            </div>
        </>

    )
}


export default ClientShow