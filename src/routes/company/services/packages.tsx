import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import SweetAlert2 from "react-sweetalert2"
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable";
import { Check, Eye, Plus, Trash, X } from "react-feather";
import { PackageDTO } from "../../../shared/interfaces/package.interface";
import CreatePackageModal from "../../../modals/packages/create_package_modal";
import { useTranslation } from "react-i18next";
import axios_instance from "../../../config/api_defaults";
import { useQueryClient } from "react-query";
import ShowPackageModal from "../../../modals/packages/show_package_modal";

const Packages = () => {
    const [swalProps, setSwalProps] = useState({});
    const queryClient = useQueryClient();
    const [isCreatePackageModalOpen, setIsCreatePackageModalOpen] = useState(false);
    const [isShowPackageModalOpen, setIsShowPackageModalOpen] = useState(false);
    const [activeShowId, setActiveShowId] = useState("");
    const { t } = useTranslation();
    const table_actions: TableAction[] = [{
        icon: <Plus />,
        fn: () => { setIsCreatePackageModalOpen(true) }
    }]
    const actions: Action<PackageDTO>[] = [
        {
            type: ActionTypes.Edit,
            icon: <Eye />,
            fn: (item: PackageDTO) => { openShowModal(item.id) }
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash />,
            fn: (item: PackageDTO) => { raiseDeleteAlert(item.id) }
        },
    ]
    const openShowModal = (id: string) => {
        setActiveShowId(id);
        setIsShowPackageModalOpen(true);
    }

    const raiseDeleteAlert = (id: string) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: t('common.this_action_is_final'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t('common.cancel'),
            confirmButtonText: t('common.confirm'),
            confirmButtonColor: "red",
            onConfirm: () => { deletePackage(id) },
            onResolve: setSwalOff
        });
    }
    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }
    const deletePackage = (id: string) => {
        axios_instance().delete(`/packages/${id}`).then(() => {
            toast.success(t('common.delete_success'));
            queryClient.invalidateQueries({
                queryKey: ['packages'],
            })
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
            name: "Akcijska cena",
            editable_from_table: true,
            show: true,
            original_name: "sale_price",
            has_sort: true
        },
        {
            name: "Istice",
            editable_from_table: true,
            show: true,
            original_name: "expiration_date",
            has_sort: true
        },
        {
            name: "Aktivan",
            editable_from_table: false,
            show: true,
            original_name: "expired",
            has_sort: true,
            formatFn: (t) => formatLogin(t),
        }
    ]

    const formatLogin = (t: string) => {
        if (!parseInt(t)) {
            return <Check color="green" />
        } else {
            return <X color="red"></X>;
        }
    }
    const cancelModalFunction = () => {
        setIsCreatePackageModalOpen(false);
    }
    const cancelShowFunction = () => {
        setIsShowPackageModalOpen(false);
    }
    return (
        <>
            <Toaster />
            <SweetAlert2 {...swalProps} />
            <ShowPackageModal
                isOpen={isShowPackageModalOpen}
                cancelFunction={cancelShowFunction}
                package_id={activeShowId}
            />
            <CreatePackageModal isOpen={isCreatePackageModalOpen} cancelFunction={() => { cancelModalFunction() }} />
            <DataTable
                queryKey="packages"
                table_actions={table_actions}
                has_actions={true}
                table_name="Packages"
                url="packages?per_page=10"
                actions={actions}
                fields={fields}
            ></DataTable>
        </>
    )
}

export default Packages