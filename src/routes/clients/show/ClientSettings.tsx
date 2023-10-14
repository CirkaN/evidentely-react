import { Eye } from "react-feather";
import DataTable, { ActionTypes, Field } from "../../../components/datatable";

interface Client {
    id: number,
    address: string,
    name: string
}

const ClientSettings = () => {

    const available_fields: Field<Client>[] = [
        {
            name: "my name",
            original_name: "address",
            has_sort: false,
            show: true,
            editable_from_table: false,
        },
        {
            name: "my second ",
            original_name: "name",
            has_sort: false,
            show: true,
            editable_from_table: true,
            formatFn: (v, resource) => v.length === 0 ? resource.address : 'hello world',               },
    ];
    const available_actions = [
        {
            type: ActionTypes.Edit,
            url: "/client/edit/",
            icon: <Eye />
        }
    ]

    return (
        <div>
            <DataTable show_link="/clients" url="/clients" has_actions={true} actions={available_actions} fields={available_fields} table_name="SMS History"></DataTable>
        </div>
    )
}

export default ClientSettings;