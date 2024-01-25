import clsx from "clsx";
import { t } from "i18next";
import { Link, useLocation } from "react-router-dom";
interface DetailsProps {
    id: string;
}
const ClientDetailsHeader = (props: DetailsProps) => {
    const location = useLocation();
    return (
        <div className="flex flex-col justify-between sm:flex-row border p-4 shadow-lg">
            <Link
                className={clsx(
                    "rounded-md py-2 px-4",
                    location.pathname.includes("summary") &&
                        "text-blue-600 bg-blue-100 hover:bg-blue-200",
                )}
                to={`/clients/${props.id}/summary`}
            >
                {t("common.summary")}
            </Link>
            <Link
                className={clsx(
                    "rounded-md py-2 px-4",
                    location.pathname.includes("appointments") &&
                        "text-blue-600 bg-blue-100 hover:bg-blue-200",
                )}
                to={`/clients/${props.id}/appointments`}
            >
                {t("common.appointments")}
            </Link>
            <Link
                className={clsx(
                    "rounded-md py-2 px-4",
                    location.pathname.includes("documents") &&
                        "text-blue-600 bg-blue-100 hover:bg-blue-200",
                )}
                to={`/clients/${props.id}/documents`}
            >
                {t("common.media")}
            </Link>
            <Link
                className={clsx(
                    "rounded-md py-2 px-4",
                    location.pathname.includes("sms_history") &&
                        "text-blue-600 bg-blue-100 hover:bg-blue-200",
                )}
                to={`/clients/${props.id}/sms_history`}
            >
                {t("common.sms_history")}
            </Link>
            <Link
                className={clsx(
                    "rounded-md py-2 px-4",
                    location.pathname.includes("notes") &&
                        "text-blue-600 bg-blue-100 hover:bg-blue-200",
                )}
                to={`/clients/${props.id}/notes`}
            >
                {t("common.notes")}
            </Link>
        </div>
    );
};
export default ClientDetailsHeader;
