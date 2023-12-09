import { Eye, Plus, Trash } from "react-feather";
import DataTable, { Action, ActionTypes, Field, TableAction, TableFilter } from "../../components/datatable";
import { ClientDTO } from "../../services/clients/ClientService";
import { useNavigate } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
import { useState } from "react";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import CreateClientModal, { ClientCreateDTO } from "../../modals/clients/create_client_modal";
import InfoBox, { InfoBoxType } from "../../components/info-box";
import CountryFilter from "../../components/filters/country_filter";

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

    const url = "clients?per_page=5"
    const raiseDeleteAlert = (id: number) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: 'Please confirm',
            text: 'This action is unreversible and it will delete client with  all records associated with him',
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: "Go for it",
            confirmButtonColor: "red",
            onConfirm: () => { deleteClient(id) },
            onResolve: setSwalOff
        });

    }

    const deleteClient = (id: number) => {
        axios_instance().delete(`/clients/${id}`).then(() => {
            toast.success('Client deleted succesfully');
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
            fn: (client: ClientDTO) => navigate(`/clients/${client.id}/details/`),
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
    const fields: Field[] = [
        {
            name: "name",
            editable_from_table: false,
            original_name: "name",
            has_sort: true,
            show: true
        },
        {
            name: "email",
            editable_from_table: false,
            original_name: "email",
            has_sort: true,
            show: true,
        },
        {
            name: "note",
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