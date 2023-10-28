
import { Edit3, Plus, Trash } from "react-feather";
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable";
import { ItemDTO } from "../../../shared/interfaces/item.interface";

const Services = () => {
    const actions: Action<ItemDTO>[] = [
        {
            type: ActionTypes.Edit,
            icon: <Edit3 />
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash />
        },
    ]
    const fields: Field[] = [
        {
            name: "Ime",
            editable_from_table: true,
            show: true,
            original_name: "name",
            has_sort: true
        }
    ]
    const table_actions: TableAction[] = [{
        icon: <Plus />,
        fn: () => { console.log('triggered') }
    }]
    return (
        <>
            <DataTable
                table_actions={table_actions}
                has_actions={true}
                table_name="Produkti"
                url="items?type=service&per_page=10"
                actions={actions}
                fields={fields}
            ></DataTable>
        </>
    )
}

export default Services;