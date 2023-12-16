import { Eye, Plus, Trash } from "react-feather";
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../components/datatable";
import SalesHomeHeader from "./components/header";
import { PendingSaleDTO, SaleDTO } from "../../shared/interfaces/sales.interface";
import { useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import axios_instance from "../../config/api_defaults";
import { useTranslation } from "react-i18next";
import CreateSaleModal from "../../modals/sales/create_sale_modal";
import ShowSaleModal from "../../modals/sales/show_sale_modal";

const SalesIndex = () => {

    const url = "sales?per_page=5"
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const [openSaleCreateModal, setOpenSaleCreateModal] = useState(false);
    const [showSaleModal, setShowSaleModal] = useState(false);
    const [swalProps, setSwalProps] = useState({});

    const tableActions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => { setOpenSaleCreateModal(true) }
        }
    ]

    const raiseDeleteAlert = (id: number) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: t('common.confirm_action'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: "Go for it",
            confirmButtonColor: "red",
            onConfirm: () => { deleteSale(id) },
            onResolve: setSwalOff
        });

    }
    const deleteSale = (id: number) => {
        axios_instance().delete(`/sales/${id}`).then(() => {
            toast.success(t('sales.delete_success'));
            queryClient.invalidateQueries({
                queryKey: ['sales'],
            })

        }).catch((e) => {
            toast.error(e.response.message)
        })
    }
    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }
    const actions: Action<SaleDTO>[] = [
        {
            type: ActionTypes.Show,
            icon: <Eye color="lightblue" />,
            fn: () => (setShowSaleModal(true)),
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red" />,
            fn: (sale: SaleDTO) => { raiseDeleteAlert(sale.id) }
        },
    ];
    const fields: Field[] = [
        {
            name: t('common.name'),
            editable_from_table: false,
            original_name: "item_name",
            has_sort: true,
            show: true
        },
        {
            name: t('sales.left_to_pay'),
            editable_from_table: false,
            original_name: "pending_amount",
            has_sort: true,
            show: true
        },
        {
            name: t('sales.total_amount'),
            editable_from_table: false,
            original_name: "price",
            has_sort: true,
            show: true
        },
        {
            name: t('note'),
            editable_from_table: false,
            original_name: "note",
            has_sort: true,
            show: true,
        },


    ]
    const saveSale = (form: PendingSaleDTO) => {
        axios_instance().post('/sales', form).then(() => {
            setOpenSaleCreateModal(false);
            queryClient.invalidateQueries({
                queryKey: ['sales'],
            })
        })
    }
    return (
        <>
            <SalesHomeHeader />
            <SweetAlert2 {...swalProps} />
            <CreateSaleModal
                isOpen={openSaleCreateModal}
                cancelFunction={() => { setOpenSaleCreateModal(false) }}
                saveFunction={(form) => { saveSale(form) }}
            />
            <ShowSaleModal
                isOpen={showSaleModal}
                cancelFunction={() => { setShowSaleModal(false) }}
            />
            <DataTable
                queryKey="sales"
                table_actions={tableActions}
                actions={actions}
                url={url}
                fields={fields}
                table_name={t('sales.table_name')}
                has_actions={true}
            />
        </>
    )
}

export default SalesIndex;