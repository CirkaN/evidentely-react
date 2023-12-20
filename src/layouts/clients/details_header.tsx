import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
interface DetailsProps {
    id: string,
    active: string,
}
const ClientDetailsHeader = (props: DetailsProps) => {
    const location = useLocation();
    return (
        <div className="flex flex-col justify-between sm:flex-row">
            <Link className={clsx("rounded-md py-2 px-4", location.pathname.endsWith("summary") && "text-blue-600 bg-blue-100 hover:bg-blue-200")} to={`/clients/${props.id}/summary`}>Summary</Link>
            <Link className={clsx("rounded-md py-2 px-4", location.pathname.endsWith("appointments") && "text-blue-600 bg-blue-100 hover:bg-blue-200")} to={`/clients/${props.id}/appointments`}>Appointments</Link>
            <Link className={clsx("rounded-md py-2 px-4", location.pathname.endsWith("documents") && "text-blue-600 bg-blue-100 hover:bg-blue-200")} to={`/clients/${props.id}/documents`}>Media</Link>
            <Link className={clsx("rounded-md py-2 px-4", location.pathname.endsWith("sms_history") && "text-blue-600 bg-blue-100 hover:bg-blue-200")} to={`/clients/${props.id}/sms_history`}>Sms history</Link>
            <Link className={clsx("rounded-md py-2 px-4", location.pathname.endsWith("notes") && "text-blue-600 bg-blue-100 hover:bg-blue-200")} to={`/clients/${props.id}/notes`}>Notes</Link>
        </div>

    )
}
export default ClientDetailsHeader;