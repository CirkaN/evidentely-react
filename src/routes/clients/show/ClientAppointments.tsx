import { useParams } from "react-router-dom";
import ClientDetailsHeader from "../../../layouts/clients/details_header";
import DataTable, { Field } from "../../../components/datatable";
import { t } from "i18next";

const ClientAppointments = () => {
    const { id } = useParams();
    const url = `appointments/${id}/previous_appointments?per_page=5`;
    const fields: Field[] = [
        {
            name: t("common.appointment_name"),
            editable_from_table: false,
            original_name: "title",
            has_sort: false,
            show: true,
        },
        {
            name: t("common.start"),
            editable_from_table: false,
            original_name: "start",
            has_sort: false,
            show: true,
        },
        {
            name: t("common.end"),
            editable_from_table: false,
            original_name: "end",
            has_sort: false,
            show: true,
        },
        {
            name: t("appointment.assigned_to"),
            editable_from_table: false,
            original_name: "employee_name",
            has_sort: false,
            show: true,
        },
    ];
    return (
        <div className="h-screen w-full p-10  pt-10 sm:pt-0">
            {id && <ClientDetailsHeader id={id} />}
            <br />
            <DataTable
                has_actions={false}
                fields={fields}
                url={url}
                has_search={true}
                table_name={t("common.appointments")}
                queryKey="client_appointments"
            />
        </div>
    );
};

export default ClientAppointments;
