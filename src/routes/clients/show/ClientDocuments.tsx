import { PenTool, Plus } from "react-feather";
import Datatable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable"
import { ClientDocumentDTO } from "../../../services/clients/ClientService";
import { useParams } from "react-router-dom";

const ClientDocuments = () => {

    const { id } = useParams();
    const url = `user/${id}/documents`;
    const fields: Field[] = [
        {
            name: "note",
            original_name: "media",
            has_sort: false,
            show: true,
            editable_from_table: false
        },
    ];

    const actions: Action<ClientDocumentDTO>[] = [
        {
            type: ActionTypes.Edit,
            icon: <PenTool></PenTool>,
            fn: (client: ClientDocumentDTO) => { console.log(client.id) }
        }
    ]

    const table_actions: TableAction[] = [
        {
            icon: <Plus></Plus>,
            fn: () => { console.log(1) }
        }
    ];

    

    return (
        <div>
            <Datatable table_actions={table_actions} actions={actions} fields={fields} url={url} has_actions={true} table_name="Documents" ></Datatable>
        </div>)
}


export default ClientDocuments