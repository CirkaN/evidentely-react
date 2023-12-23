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
import InfoBox, { InfoBoxType } from "../../components/info-box";

const SalesIndex = () => {

    const url = "sales?per_page=5"
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const [openSaleCreateModal, setOpenSaleCreateModal] = useState(false);
    const [activeSaleId, setActiveSaleId] = useState<number | null>(null);
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
            text: t('sales.confirm_delete'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t('common.cancel'),
            confirmButtonText: t('common.confirm'),
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
    const openShowModal = (saleId: number) => {
        setActiveSaleId(saleId)
        setShowSaleModal(true)
    }
    const actions: Action<SaleDTO>[] = [
        {
            type: ActionTypes.Show,
            icon: <Eye color="lightblue" />,
            fn: (r: SaleDTO) => openShowModal(r.id),
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red" />,
            fn: (sale: SaleDTO) => { raiseDeleteAlert(sale.id) }
        },
    ];
    const generateStatus = (status: string) => {
        switch (status) {
            case 'paid':
                return (<span className=" font-medium me-2 px-2.5 py-0.5 rounded bg-green-600 text-green-100">{t('sales.paid')}</span>)
                break;
            case 'partially_paid':
                return (<span className="bg-orange-500 text-white  font-medium me-2 px-2.5 py-0.5 rounded ">{t('sales.partially_paid')}</span>)
                break;
            default:
                return (<span className="bg-red-600 text-white  font-medium me-2 px-2.5 py-0.5 rounded">{t('sales.unpaid')}</span>)
        }
    }
    const formatCurrency = (t: string) => {
        const s = new Intl.NumberFormat('sr-RS', {
            style: 'currency',
            currency: 'RSD',
        });
        return s.format(parseInt(t));
    }
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
            formatFn: (t: string) => formatCurrency(t),
            has_sort: true,
            show: true
        },
        {
            name: t('sales.total_paid'),
            editable_from_table: false,
            original_name: "total_paid",
            formatFn: (t: string) => formatCurrency(t),
            has_sort: true,
            show: true
        },

        {
            name: t('sales.total_amount'),
            editable_from_table: false,
            formatFn: (t: string) => formatCurrency(t),
            original_name: "price",
            has_sort: true,
            show: true
        },
        {
            name: t('sales.status'),
            editable_from_table: false,
            original_name: "status",
            formatFn: (t: string) => generateStatus(t),
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
            <InfoBox
                headerText={t('sales.info_box_title')}
                type={InfoBoxType.Info}
                text={t('sales.info_box_description')}
            />

            <SweetAlert2 {...swalProps} />
            <CreateSaleModal
                isOpen={openSaleCreateModal}
                cancelFunction={() => { setOpenSaleCreateModal(false) }}
                saveFunction={(form) => { saveSale(form) }}
            />
            {activeSaleId &&
                <ShowSaleModal
                    saleId={activeSaleId}
                    isOpen={showSaleModal}
                    cancelFunction={() => { setShowSaleModal(false) }}
                />}
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