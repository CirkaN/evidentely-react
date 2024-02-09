import { Eye, Info, Plus, Trash } from "react-feather";
import DataTable, {
    Action,
    ActionTypes,
    Field,
    TableAction,
} from "../../components/datatable";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { useState } from "react";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import CreateClientModal from "../../modals/clients/create_client_modal";
import { t } from "i18next";
import { ClientDTO } from "../../shared/interfaces/client.interface";
import { Callout } from "@radix-ui/themes";

const Clients = () => {
    const navigate = useNavigate();
    const [swalProps, setSwalProps] = useState({});
    const queryClient = useQueryClient();
    const [isCreateClientModalOpen, setisCreateClientModalOpen] =
        useState(false);
    const url = "clients?per_page=10";

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
                deleteClient(id);
            },
            onResolve: setSwalOff,
        });
    };

    const deleteClient = (id: number) => {
        axios_instance()
            .delete(`/clients/${id}`)
            .then(() => {
                toast.success(t("toasts.client_deleted_success"));
                queryClient.invalidateQueries({
                    queryKey: ["clients"],
                });
            })
            .catch((e) => {
                toast.error(e.response.message);
            });
    };

    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }

    const actions: Action<ClientDTO>[] = [
        {
            type: ActionTypes.Show,
            icon: <Eye color="lightblue" />,
            fn: (client: ClientDTO) =>
                navigate(`/clients/${client.id}/summary/`),
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red" />,
            fn: (client: ClientDTO) => {
                raiseDeleteAlert(client.id);
            },
        },
    ];

    const tableActions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => {
                setisCreateClientModalOpen(true);
            },
        },
    ];

    const generateLink = (client_name: string, r: ClientDTO) => {
        return (
            <Link to={`/clients/${r.id}/summary/`} className="text-blue-500">
                {client_name}
            </Link>
        );
    };

    const fields: Field[] = [
        {
            name: t("common.name"),
            formatFn: (client_name, r) =>
                generateLink(client_name, r as ClientDTO),
            editable_from_table: false,
            original_name: "name",
            has_sort: true,
            show: true,
        },
        {
            name: t("common.email"),
            editable_from_table: false,
            original_name: "email",
            has_sort: true,
            show: true,
        },
        {
            name: t("common.phone_number"),
            editable_from_table: false,
            original_name: "phone_number",
            has_sort: true,
            show: true,
        },
        // {
        //     name: t("common.birthday"),
        //     editable_from_table: false,
        //     original_name: "birthday_formatted",
        //     has_sort: true,
        //     show: true,
        // },
        {
            name: t("common.address"),
            editable_from_table: false,
            original_name: "address",
            has_sort: false,
            show: true,
        },
        {
            name: t("common.note"),
            editable_from_table: false,
            original_name: "note",
            has_sort: false,
            show: true,
        },
    ];

    const reValidate = () => {
        queryClient.invalidateQueries({
            queryKey: ["clients"],
        });
        setisCreateClientModalOpen(false);
    };

    return (
        <>
            <Callout.Root>
                <Callout.Icon>
                    <Info size={18} />
                </Callout.Icon>
                <Callout.Text color="iris">
                    U ovom modulu možete dodavati nove klijente kao i pratiti
                    sve vezano za vaše klijente.{" "}
                </Callout.Text>
            </Callout.Root>

            <CreateClientModal
                cancelFunction={() => {
                    reValidate();
                }}
                isOpen={isCreateClientModalOpen}
            />

            <SweetAlert2 {...swalProps} />

            <div className="py-5">
                <DataTable
                    queryKey="clients"
                    has_table_filters={false}
                    has_search={true}
                    table_actions={tableActions}
                    actions={actions}
                    url={url}
                    fields={fields}
                    table_name="Lista klijenata"
                    has_actions={true}
                />
            </div>
        </>
    );
};

export default Clients;
