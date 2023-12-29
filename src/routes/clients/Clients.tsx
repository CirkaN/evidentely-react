import { Eye, Plus, Trash } from "react-feather";
import DataTable, { Action, ActionTypes, Field, TableAction, TableFilter } from "../../components/datatable";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { useState } from "react";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import CreateClientModal, { ClientCreateDTO } from "../../modals/clients/create_client_modal";
import InfoBox, { InfoBoxType } from "../../components/info-box";
import CountryFilter from "../../components/filters/country_filter";
import { t } from "i18next";
import { ClientDTO } from "../../shared/interfaces/client.interface";

const Clients = () => {
    const navigate = useNavigate()
    const [swalProps, setSwalProps] = useState({});
    const queryClient = useQueryClient();
    const [isCreateClientModalOpen, setisCreateClientModalOpen] = useState(false);

    const openClientCreateModal = () => {
        setisCreateClientModalOpen(true);
    };

    const closeClientCreateModal = () => {
        setisCreateClientModalOpen(false);
    };

    const url = "clients?per_page=10"
    const raiseDeleteAlert = (id: number) => {
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
            onConfirm: () => { deleteClient(id) },
            onResolve: setSwalOff
        });

    }

    const deleteClient = (id: number) => {
        axios_instance().delete(`/clients/${id}`).then(() => {
            toast.success(t('toasts.client_deleted_success'));
            queryClient.invalidateQueries({
                queryKey: ['clients'],
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

    const actions: Action<ClientDTO>[] = [
        {
            type: ActionTypes.Show,
            icon: <Eye color="lightblue"></Eye>,
            fn: (client: ClientDTO) => navigate(`/clients/${client.id}/summary/`),
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red"></Trash>,
            fn: (client: ClientDTO) => { raiseDeleteAlert(client.id) }
        },
    ];
    const tableActions: TableAction[] = [
        {
            icon: <Plus></Plus>,
            fn: () => { openClientCreateModal() }
        }
    ]
    const generateLink = (client_name: string, r: ClientDTO) => {
        return (<Link to={`/clients/${r.id}/summary/`} className="text-blue-500">{client_name}</Link>)
    }
    const fields: Field[] = [
        {
            name: t('common.name'),
            formatFn: (client_name, r) => generateLink(client_name, r as ClientDTO),
            editable_from_table: false,
            original_name: "name",
            has_sort: true,
            show: true
        },
        {
            name: t('common.email'),
            editable_from_table: false,
            original_name: "email",
            has_sort: true,
            show: true,
        },
        {
            name: t('common.birthday'),
            editable_from_table: false,
            original_name: "birthday_formatted",
            has_sort: true,
            show: true,
        },
        {
            name: t('common.address'),
            editable_from_table: false,
            original_name: "address",
            has_sort: true,
            show: true,
        },
        {
            name: t('common.note'),
            editable_from_table: false,
            original_name: "note",
            has_sort: true,
            show: true,
        },

    ]
    const cancelAction = () => {
        closeClientCreateModal();
    }

    const saveRecord = (form: ClientCreateDTO) => {
        axios_instance().post('/clients', form).then(() => {
            queryClient.invalidateQueries({
                queryKey: ['clients'],
            })
            closeClientCreateModal();
        })
    }
    const tableFilters: TableFilter[] = [
        {
            backend_key: "Country Filters",
            component: <CountryFilter backend_key='country_id' />,
        },
    ]

    return (
        <>
            <InfoBox type={InfoBoxType.Info} text="U ovom modulu mozete dodavati nove klijente kao i pratiti sve vezano za vase klijente" headerText="Klijenti"></InfoBox>
            <CreateClientModal saveFunction={saveRecord} cancelFunction={cancelAction} isOpen={isCreateClientModalOpen}></CreateClientModal>
            <SweetAlert2 {...swalProps} />
            <div className="py-5">
                <DataTable queryKey="clients"
                    has_table_filters={true}
                    table_filters={tableFilters}
                    table_actions={tableActions}
                    actions={actions}
                    url={url}
                    fields={fields}
                    table_name="Lista klijenata"
                    has_actions={true} />
            </div>
        </>
    );
}

export default Clients;