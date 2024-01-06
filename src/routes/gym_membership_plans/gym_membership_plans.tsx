import { Eye, Plus, Trash } from "react-feather";
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../components/datatable";
import { GymMembershipPlanDTO } from "../../shared/interfaces/gym_membership_plan.interface";
import { useState } from "react";
import CreateGymMembershipModal from "../../modals/gym_membership_plans/create_gym_membership_plan_modal";
import { t } from "i18next";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import SweetAlert2 from "react-sweetalert2";

const GymMembershipPlans = () => {
    const [swalProps, setSwalProps] = useState({});
    const queryClient = useQueryClient();
    const [isGymMembershipPlanCreateModalOpen, setIsGymMembershipPlanCreateModalOpen] = useState(false);

    const fields: Field[] = [
        {
            name: "Ime clanarine",
            show: true,
            original_name: "name",
            has_sort: true,
            editable_from_table: false,
        },
        {
            name: "Opis",
            show: true,
            original_name: "description",
            has_sort: false,
            editable_from_table: false,
        },
        {
            name: "Trajanje",
            show: true,
            original_name: "duration_months",
            has_sort: true,
            editable_from_table: false,
        },
        {
            name: "Cena",
            show: true,
            original_name: "price",
            has_sort: true,
            editable_from_table: false,
        }
    ]

    const actions: Action<GymMembershipPlanDTO>[] = [
        {
            type: ActionTypes.Edit,
            icon: <Eye color="lightblue" />
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red" />,
            fn: (gymMembership: GymMembershipPlanDTO) => { raiseDeleteAlert(gymMembership.id) }
        }

    ];

    const raiseDeleteAlert = (id: number | string) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: 'Brisanjem ovog plana, brisete i sve aktivne korisnike ovog plana',
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Opozovi',
            confirmButtonText: t('common.confirm'),
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

    const deleteItem = (id: number|string) => {
        axios_instance().delete(`/gym_membership_plans/${id}`).then(() => {
            toast.success(t('toasts.delete_success'));

            queryClient.invalidateQueries({
                queryKey: ['gym_memberships'],
            })
        })
    }
    const table_actions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => { setIsGymMembershipPlanCreateModalOpen(true) }
        }
    ];
    return (
        <>
         <SweetAlert2 {...swalProps} />
            <CreateGymMembershipModal
                isOpen={isGymMembershipPlanCreateModalOpen}
                closeModalFunction={() => { setIsGymMembershipPlanCreateModalOpen(false) }}
            />
            <DataTable
                table_actions={table_actions}
                queryKey="gym_memberships"
                table_name="Clanarine"
                url="gym_membership_plans?per_page=10"
                actions={actions}
                fields={fields}
                has_actions={true}
            />
        </>
    )
}
export default GymMembershipPlans;