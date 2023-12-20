import { Check, Plus, Trash, X } from "react-feather";
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable";
import { useState } from "react";
import CreateEmployeeModal from "../../../modals/employees/create_employee_modal";
import SweetAlert2 from "react-sweetalert2";
import axios_instance from "../../../config/api_defaults";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { EmployeeDTO } from "../../../shared/interfaces/employees.interface";
import InfoBox, { InfoBoxType } from "../../../components/info-box";
import { t } from "i18next";

const Employees = () => {

    const [isCreateEmployeeModalOpen, setisCreateEmployeeModalOpen] = useState(false);
    const [swalProps, setSwalProps] = useState({});
    const queryClient = useQueryClient();
    const openEmployeeCreateModal = () => {
        setisCreateEmployeeModalOpen(true);
    };

    const closeEmployeeCreateModal = () => {
        setisCreateEmployeeModalOpen(false);
    };

    const url = "employees?per_page=5"

    const tableActions: TableAction[] = [
        {
            icon: <Plus></Plus>,
            fn: () => { openEmployeeCreateModal() }
        }
    ]

    const actions: Action<EmployeeDTO>[] = [
        // {
        //     type: ActionTypes.Show,
        //     icon: <Eye color="lightblue"></Eye>,
        //     fn: (employee: EmployeeDTO) => navigate(`/employees/${employee.id}/details/`),
        // },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red"></Trash>,
            fn: (employee: EmployeeDTO) => { employee.id && raiseDeleteAlert(employee.id) }
        },
    ];

    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
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
            onConfirm: () => { deleteEmployee(id) },
            onResolve: setSwalOff
        });

    }
    const fields: Field<EmployeeDTO>[] = [
        {
            name: t('common.name'),
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
            name: t('common.note'),
            editable_from_table: false,
            original_name: "note",
            has_sort: false,
            show: true,
        },
        {
            name: t('employees.job_description'),
            editable_from_table: false,
            original_name: "job_description",
            has_sort: false,
            show: true,
        },
        {
            name: t('employees.login_enabled'),
            editable_from_table: false,
            original_name: "login_enabled",
            has_sort: true,
            show: true,
            formatFn: (t) => formatLogin(t),
        },

    ]
    const formatLogin = (t: string) => {
        if (parseInt(t)) {
            return <Check color="green" />
        } else {
            return <X color="red"></X>;
        }
    }
    const deleteEmployee = (id: string) => {
        axios_instance().delete(`/employees/${id}`).then(() => {
            toast.success(t('toasts.employee_deleted_success'));

            queryClient.invalidateQueries({
                queryKey: ['employees'],
              })

        }).catch((e) => {
            toast.error(e.response.message)
        })
    }

    const cancelAction = () => {
        closeEmployeeCreateModal();
    }

    const saveRecord = (form: EmployeeDTO) => {
        axios_instance().post('/employees', form).then(() => {
            queryClient.invalidateQueries({
                queryKey: ['employees'],
              })
            closeEmployeeCreateModal();
        })
    }
    return (
        <>
            <SweetAlert2 {...swalProps} />
            <InfoBox type={InfoBoxType.Info} headerText={t('employees.employees')} text={t('employees.manage')}></InfoBox>
            <CreateEmployeeModal saveFunction={saveRecord} cancelFunction={cancelAction} isOpen={isCreateEmployeeModalOpen} ></CreateEmployeeModal>
            <div className="py-5">
                <DataTable queryKey="employees" table_actions={tableActions} actions={actions} url={url} fields={fields} table_name="Lista zaposlenih" has_actions={true} ></DataTable>
            </div>
        </>
    )
}
export default Employees;