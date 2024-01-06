import { t } from "i18next"
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../components/datatable"
import { GymMembershipDTO } from "../../shared/interfaces/gym_memberships.interface"
import { Plus, Trash } from "react-feather"
import { useState } from "react"
import CreateGymMembershipModal from "../../modals/gym_memberships/create_gym_membership_modal"

const GymMemberships = () => {
    const [createMembershipModalOpen, setCreateMembershipModalOpen] = useState(false);
    
    const fields: Field[] = [
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
            name: "Status",
            original_name: "status",
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
    const actions: Action<GymMembershipDTO>[] = [
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red"></Trash>,
            fn: (gymMembership: GymMembershipDTO) => { alert(gymMembership.id) }
        },
    ]
    const table_actions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => { setCreateMembershipModalOpen(true) }
        }
    ];

    return (
        <>
        
            <CreateGymMembershipModal
            isOpen={createMembershipModalOpen}
            closeModalFunction={()=>setCreateMembershipModalOpen(false)}
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