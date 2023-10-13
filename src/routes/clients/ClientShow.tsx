import { useEffect, useState } from "react"
import axios_instance from "../../config/api_defaults";
import { Outlet, useParams } from "react-router-dom";
import "../../tailwind.css"



const abortController = new AbortController;

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
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const { id } = useParams();
    const fetchClient = () => {
        axios_instance.get('/clients/' + id, { signal: abortController.signal }).then(response => {
            setClientData(response.data);
        })
    }
    useEffect(() => {
        console.log(11);
    }, [clientData, id])


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