import { useParams } from "react-router-dom";
import ClientDetailsHeader from "../../../layouts/clients/details_header";
import DataTable, {
    Action,
    ActionTypes,
    Field,
} from "../../../components/datatable";
import { Eye } from "react-feather";
import { useState } from "react";
import ShowSmsLogModal from "../../../modals/sms_logs/show_sms_log";

interface SmsLogDTO {
    id: number;
    text_message: string;
    appointment_name: string;
}

const ClientSmsHistory = () => {
    const { id } = useParams();
    const url = `user/${id}/sms_logs?per_page=5`;
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [smsLogText, setSmsLogText] = useState("");

    const fieldActions: Action<SmsLogDTO>[] = [
        {
            type: ActionTypes.Show,
            icon: <Eye color="green" />,
            fn: (smsLog: SmsLogDTO) => {
                setIsShowModalOpen(true);
                setSmsLogText(smsLog.text_message);
            },
        },
    ];

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
                <ShowSmsLogModal
                    isOpen={isShowModalOpen}
                    smsLog={smsLogText}
                    closeModal={() => {
                        setIsShowModalOpen(false);
                    }}
                />
                <DataTable
                    has_actions={true}
                    fields={fields}
                    actions={fieldActions}
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
