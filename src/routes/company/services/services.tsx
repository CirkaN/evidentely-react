
import { Edit3, Plus, Trash } from "react-feather";
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable";
import { ItemDTO } from "../../../shared/interfaces/item.interface";
import CreateItemModal from "../../../modals/items/create_item_modal";
import axios_instance from "../../../config/api_defaults";
import { useState } from "react";
import { useQueryClient } from "react-query";
import SweetAlert2 from "react-sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const Services = () => {
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
    const raiseDeleteAlert = (id: number) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: 'Molimo potvrdite',
            text: 'This action is unreversible and it will delete service with  all records associated with this service',
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Opozovi',
            confirmButtonText: "Izbrisi",
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
        axios_instance().delete(`/items/${id}`).then(() => {
            toast.success('Uspesno izbrisan produkt');
            queryClient.invalidateQueries();
        })
    }

    const table_actions: TableAction[] = [{
        icon: <Plus />,
        fn: () => { setIsCreateItemModalOpen(true) }
    }]
    const cancelFunction = () => {
        setIsCreateItemModalOpen(false);
    }
    const saveFunction = (form: ItemDTO) => {
        axios_instance().post('/items', form).then(() => {
            queryClient.invalidateQueries();
            setIsCreateItemModalOpen(false);
        });
    }
    return (
        <>
            <Toaster />
            <SweetAlert2 {...swalProps} />
            <CreateItemModal
                cancelFunction={cancelFunction}
                saveFunction={saveFunction}
                isOpen={isCreateItemModalOpen}
                modalType="service"
            />
            <DataTable
                table_actions={table_actions}
                has_actions={true}
                table_name="Usluge"
                url="items?type=service&per_page=10"
                actions={actions}
                fields={fields}
            ></DataTable>
        </>
    )
}

export default Services;