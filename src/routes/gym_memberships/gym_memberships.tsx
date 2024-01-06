import { t } from "i18next"
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../components/datatable"
import { GymMembershipDTO } from "../../shared/interfaces/gym_memberships.interface"
import { AlertTriangle, Check, Plus, Trash } from "react-feather"
import { useState } from "react"
import CreateGymMembershipModal from "../../modals/gym_memberships/create_gym_membership_modal"
import SweetAlert2 from "react-sweetalert2"
import axios_instance from "../../config/api_defaults"
import toast from "react-hot-toast"
import { useQueryClient } from "react-query"

const GymMemberships = () => {
    const [createMembershipModalOpen, setCreateMembershipModalOpen] = useState(false);
    const [swalProps, setSwalProps] = useState({});
    const queryClient = useQueryClient();
    const fields: Field[] = [
        {
            name: t('common.client'),
            original_name: "member_name",
            show: true,
            editable_from_table: false,
            has_sort: true
        },
        {
            name: "Plan",
            original_name: "membership_plan_name",
            show: true,
            editable_from_table: false,
            has_sort: true
        },
        {
            name: "Pocetak Trajanja",
            original_name: "start_date",
            show: true,
            editable_from_table: false,
            has_sort: true
        },
        {
            name: "Pocetak Trajanja",
            original_name: "end_date",
            show: true,
            editable_from_table: false,
            has_sort: true
        },
        {
            name: t('sales.status'),
            original_name: "status",
            formatFn: (status) => formatStatus(status),
            show: true,
            editable_from_table: false,
            has_sort: true
        },
        {
            name: "Istice za",
            original_name: "membership_expires_human",
            show: true,
            editable_from_table: false,
            has_sort: true
        }
    ]
    const formatStatus = (status: string) => {
        if (status === 'active') {
            return <Check color="green" />
        }
        if (status === 'expired') {
            return <AlertTriangle color="red" />
        }
        return <AlertTriangle color="red" />
    }
    const actions: Action<GymMembershipDTO>[] = [
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red"></Trash>,
            fn: (gymMembership: GymMembershipDTO) => { raiseDeleteAlert(gymMembership.id) }
        },
    ]
    const table_actions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => { setCreateMembershipModalOpen(true) }
        }
    ];
    const raiseDeleteAlert = (id: string) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: t('gym_memberships.delete_membership_message'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t('common.cancel'),
            confirmButtonText: t('gym_memberships.confirm_button_delete'),
            confirmButtonColor: "red",
            onConfirm: () => { deleteMembership(id) },
            onResolve: setSwalOff
        });
    }
    const deleteMembership = (id: string) => {
        axios_instance().post(`/gym_memberships/${id}/set_inactive`).then(() => {
            toast.success(t('gym_memberships.success_delete'))
            queryClient.invalidateQueries(['gym_memberships'])
        })

    }
    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }
    return (
        <>
            <SweetAlert2 {...swalProps} />
            <CreateGymMembershipModal
                isOpen={createMembershipModalOpen}
                closeModalFunction={() => setCreateMembershipModalOpen(false)}
            />

            <DataTable
                table_name={t('gym_memberships.memberships')}
                url="gym_memberships?per_page=10"
                fields={fields}
                table_actions={table_actions}
                actions={actions}
                has_search={true}
                has_actions={true}
                queryKey="gym_memberships"
            />
        </>
    )
}
export default GymMemberships