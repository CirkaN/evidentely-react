import { Link } from "react-router-dom";
import DataTable, { Field } from "../../../components/datatable";
import { ClientDTO } from "../../../services/clients/ClientService";
import { t } from "i18next";

interface Props {
    client_count: number,
}
const TopClientsTable = (props: Props) => {
    const url = `clients?per_page=${props.client_count}&custom_sort=highest_profit`

    const generateLink = (client_name: string, r: ClientDTO) => {
        return (<Link to={`/clients/${r.id}/summary/`} className="text-blue-500">{client_name}</Link>)
    }
    const fields: Field[] = [
        {
            name: t('common.name'),
            formatFn: (client_name, r) => generateLink(client_name, r as ClientDTO),
            editable_from_table: false,
            original_name: "name",
            has_sort: false,
            show: true
        },
        {
            name: t('common.email'),
            editable_from_table: false,
            original_name: "email",
            has_sort: false,
            show: true,
        },
        {
            name: t('common.profit'),
            editable_from_table: false,
            original_name: "totalProfit",
            formatFn: (t) => <><span className="text-green-800">{t}</span></>,
            has_sort: false,
            show: true,
        },

    ]
    return (
        <>
            <DataTable
                table_name={t('analytics.top_clients')}
                url={url}
                has_actions={false}
                has_search={false}
                queryKey="topClients"
                fields={fields}
            />
        </>
    )
}
export default TopClientsTable;