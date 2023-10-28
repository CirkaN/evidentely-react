import { Edit3, Trash } from "react-feather"
import DataTable, { Action, ActionTypes, Field } from "../../../components/datatable"
import { ItemDTO } from "../../../shared/interfaces/item.interface"

const Products = () => {
  
  const actions: Action<ItemDTO>[] = [
    {
      type:ActionTypes.Edit,
      icon:<Edit3/>
    },
    {
      type:ActionTypes.Delete,
      icon:<Trash/>
    },
  ]
  const fields: Field[] = [
    {
      name:"Ime",
      editable_from_table:true,
      show:true,
      original_name:"name",
      has_sort:true
    }
  ]
  return (
    <>
      <DataTable
        has_actions={true}
        table_name="Produkti"
        url="items?type=product&per_page=10"
        actions={actions}
        fields={fields}
      ></DataTable>
    </>
  )
}

export default Products