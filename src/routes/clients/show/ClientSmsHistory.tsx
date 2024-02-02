import { useParams } from "react-router-dom";
import ClientDetailsHeader from "../../../layouts/clients/details_header";
import DataTable, { Field } from "../../../components/datatable";

const ClientSmsHistory = () => {
    const { id } = useParams();
    const url = `user/${id}/sms_logs?per_page=5`;
    const fields: Field[] = [
        {
            name: "Poruka",
            editable_from_table: false,
            original_name: "text_message",
            has_sort: false,
            show: true,
        },
        {
            name: "Termin",
            editable_from_table: false,
            original_name: "appointment_name",
            has_sort: false,
            show: true,
        },
        {
            name: "Broj telefona",
            editable_from_table: false,
            original_name: "phone_number",
            has_sort: false,
            show: true,
        },
        {
            name: "Vreme slanja",
            editable_from_table: false,
            original_name: "delivered_at",
            has_sort: false,
            show: true,
        },
    ];

    return (
        <>
            <div className="h-screen w-full p-10  pt-10 sm:pt-0">
                {id && <ClientDetailsHeader id={id} />}
                <DataTable
                    has_actions={false}
                    fields={fields}
                    url={url}
                    has_search={false}
                    table_name={"Istorija poruka"}
                    queryKey="sms_logs"
                />
            </div>
        </>
    );
};
export default ClientSmsHistory;
