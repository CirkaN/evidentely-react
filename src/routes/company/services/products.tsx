import { Eye, Plus, Trash } from "react-feather";
import DataTable, {
    Action,
    ActionTypes,
    Field,
    TableAction,
} from "../../../components/datatable";
import { ItemDTO } from "../../../shared/interfaces/item.interface";
import CreateItemModal from "../../../modals/items/create_item_modal";
import axios_instance from "../../../config/api_defaults";
import { useState } from "react";
import { useQueryClient } from "react-query";
import SweetAlert2 from "react-sweetalert2";
import toast from "react-hot-toast";
import EditItemModal from "../../../modals/items/edit_item_modal";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const Products = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
    const [isShowItemModalOpen, setIsShowItemModalOpen] = useState(false);
    const [activeShowItem, setActiveShowItem] = useState("");
    const [swalProps, setSwalProps] = useState({});
    const actions: Action<ItemDTO>[] = [
        {
            type: ActionTypes.Show,
            icon: <Eye color="lightblue" />,
            fn: (item: ItemDTO) => {
                openShowModal(item.id);
            },
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red" />,
            fn: (item: ItemDTO) => {
                raiseDeleteAlert(parseInt(item.id));
            },
        },
    ];
    const openShowModal = (id: string) => {
        setActiveShowItem(id);
        setIsShowItemModalOpen(true);
    };
    const raiseDeleteAlert = (id: number) => {
        setSwalProps({
            show: true,
            icon: "error",
            title: t("common.please_confirm"),
            text: t("common.this_action_is_final"),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t("common.cancel"),
            confirmButtonText: t("common.confirm"),
            confirmButtonColor: "red",
            onConfirm: () => {
                deleteItem(id);
            },
            onResolve: setSwalOff,
        });
    };

    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }

    const deleteItem = (id: number) => {
        axios_instance()
            .delete(`/items/${id}`)
            .then(() => {
                queryClient.invalidateQueries({
                    queryKey: ["products"],
                });
                toast.success(t("common.delete_success"));
            });
    };
    const formatCurrency = (t: string, isSellingPrice: boolean) => {
        const s = new Intl.NumberFormat("sr-RS", {
            style: "currency",
            currency: "RSD",
        });
        return (
            <p className={clsx(isSellingPrice && "text-green-600")}>
                {s.format(parseInt(t))}
            </p>
        );
    };
    const fields: Field[] = [
        {
            name: t("common.name"),
            editable_from_table: true,
            show: true,
            original_name: "name",
            has_sort: true,
        },
        {
            name: t("common.price"),
            editable_from_table: true,
            show: true,
            original_name: "price",
            formatFn: (t: string) => formatCurrency(t, false),
            has_sort: true,
        },
        {
            name: t("common.selling_price"),
            editable_from_table: true,
            formatFn: (t: string) => formatCurrency(t, true),
            show: true,
            original_name: "selling_price",
            has_sort: true,
        },
    ];
    const table_actions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => {
                setIsCreateItemModalOpen(true);
            },
        },
    ];

    const cancelFunction = () => {
        setIsCreateItemModalOpen(false);
    };
    const cancelShowFunction = () => {
        setIsShowItemModalOpen(false);
    };
    const saveShowFunction = (form: ItemDTO) => {
        axios_instance()
            .put(`/items/${form.id}`, form)
            .then(() => {
                toast.success(t("common.update_success"));
                queryClient.invalidateQueries({ queryKey: ["products"] });
                setIsShowItemModalOpen(false);
            });
    };
    const saveFunction = (form: ItemDTO) => {
        axios_instance()
            .post("/items", form)
            .then(() => {
                setIsCreateItemModalOpen(false);
                queryClient.invalidateQueries({
                    queryKey: ["products"],
                });
            });
    };
    return (
        <>
            <SweetAlert2 {...swalProps} />
            <EditItemModal
                modalType="product"
                saveFunction={saveShowFunction}
                isOpen={isShowItemModalOpen}
                cancelFunction={cancelShowFunction}
                item_id={activeShowItem}
            />
            <CreateItemModal
                cancelFunction={cancelFunction}
                saveFunction={saveFunction}
                isOpen={isCreateItemModalOpen}
                modalType="product"
            />
            <DataTable
                queryKey="products"
                table_actions={table_actions}
                has_actions={true}
                table_name="Proizvodi"
                url="items?type=product&per_page=10"
                actions={actions}
                fields={fields}
            ></DataTable>
        </>
    );
};

export default Products;
