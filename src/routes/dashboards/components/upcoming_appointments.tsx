import { t } from "i18next";
import DataTable, { Field } from "../../../components/datatable";
import { Link } from "react-router-dom";
import { AppointmentType } from "../../../shared/interfaces/appointments.interface";
interface Props {
    appointment_count: number,
}
const UpcomingAppointments = (props: Props) => {
    const url = `appointments?per_page=${props.appointment_count}&custom_sort=upcoming`

    const generateLink = (client_name: string, r: AppointmentType) => {
        return (<Link to={`/clients/${r.user_id}/summary/`} className="text-blue-500">{client_name}</Link>)
    }
    const fields: Field[] = [
        {
            name: t('common.appointment_name'),
            editable_from_table: false,
            original_name: "title",
            has_sort: false,
            show: true
        },
        {
            name: t('appointment.assigned_to'),
            editable_from_table: false,
            original_name: "employee_name",
            has_sort: false,
            show: true,
        },
        {
            name: t('common.client_name'),
            editable_from_table: false,
            formatFn: (client_name, resource) => generateLink(client_name, resource as AppointmentType),
            original_name: "client_name",
            has_sort: false,
            show: true,
        }

    ]
    return (
        <>
            <DataTable
                table_name={t('dashboard.upcoming_appointments')}
                url={url}
                has_actions={false}
                has_search={false}
                queryKey="upcomingAppointments"
                fields={fields}
            />
        </>
    )
}
export default UpcomingAppointments;