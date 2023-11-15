import { Edit3, Plus, Trash } from "react-feather"
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable"
import { ItemDTO } from "../../../shared/interfaces/item.interface"
import CreateItemModal from "../../../modals/items/create_item_modal"
import axios_instance from "../../../config/api_defaults"
import { useState } from "react"
import { useQueryClient } from "react-query"
import SweetAlert2 from "react-sweetalert2"
import toast, { Toaster } from "react-hot-toast"

const Products = () => {
  const queryClient = useQueryClient();
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [swalProps, setSwalProps] = useState({});
  const actions: Action<ItemDTO>[] = [
    {
      type: ActionTypes.Edit,
      icon: <Edit3 />
    },
    {
      type: ActionTypes.Delete,
      icon: <Trash />,
      fn: (item: ItemDTO) => { raiseDeleteAlert(parseInt(item.id)) }
    },
  ]
  const raiseDeleteAlert = (id: number) => {
    setSwalProps({
      show: true,
      icon: 'error',
      title: 'Molimo potvrdite',
      text: 'This action is unreversible and it will delete client with  all records associated with him',
      cancelButtonColor: "green",
      reverseButtons: true,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: "Go for it",
      confirmButtonColor: "red",
      onConfirm: () => { deleteItem(id) },
      onResolve: setSwalOff
    });
  }

  function setSwalOff() {
    const dataCopied = JSON.parse(JSON.stringify(swalProps));
    dataCopied.show = false;
    setSwalProps(dataCopied);
  }

  const deleteItem = (id: number) => {
    axios_instance.delete(`/items/${id}`).then(() => {
      queryClient.invalidateQueries();
      toast.success('uspesno izbrisan produkt');
    })
  }

  const fields: Field[] = [
    {
      name: "Ime",
      editable_from_table: true,
      show: true,
      original_name: "name",
      has_sort: true
    },
    {
      name: "Cena",
      editable_from_table: true,
      show: true,
      original_name: "price",
      has_sort: true
    },
    {
      name: "Trajanje",
      editable_from_table: true,
      show: true,
      original_name: "duration",
      has_sort: true
    }
  ]
  const table_actions: TableAction[] = [{
    icon: <Plus />,
    fn: () => { setIsCreateItemModalOpen(true) }
  }]

  const cancelFunction = () => {
    setIsCreateItemModalOpen(false)
  }
  const saveFunction = (form: ItemDTO) => {
    axios_instance.post('/items', form).then(() => {
      setIsCreateItemModalOpen(false)
      queryClient.invalidateQueries();
    })

  }
  return (
    <>
      <Toaster />
      <SweetAlert2 {...swalProps} />
      <CreateItemModal
        cancelFunction={cancelFunction}
        saveFunction={saveFunction}
        isOpen={isCreateItemModalOpen}
        modalType="product"
      />
      <DataTable
        table_actions={table_actions}
        has_actions={true}
        table_name="Proizvodi"
        url="items?type=product&per_page=10"
        actions={actions}
        fields={fields}
      ></DataTable>
    </>
  )
}

export default Products