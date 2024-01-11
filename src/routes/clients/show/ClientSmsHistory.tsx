import { useParams } from "react-router-dom";
import ClientDetailsHeader from "../../../layouts/clients/details_header";

const ClientSmsHistory = () => {
    const { id } = useParams();
    return (
        <>
            <div className="h-screen w-full p-10  pt-10 sm:pt-0">

                {id &&
                    <ClientDetailsHeader id={id} />}
            </div>
        </>
    )
}
export default ClientSmsHistory;