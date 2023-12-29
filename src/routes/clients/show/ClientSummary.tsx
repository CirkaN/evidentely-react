import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios_instance from "../../../config/api_defaults";
import { useNavigate, useParams } from "react-router-dom";
import ClientDetailsHeader from "../../../layouts/clients/details_header";
import DataTable, { Field } from "../../../components/datatable";


interface SummaryData {
    total_profit: string,
    last_appointment: string,
    total_completed_appointments: string,
}

const ClientSummary = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const url = `appointments/${id}/previous_appointments?per_page=5`
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
    ]

    const formatCurrency = (t: string | number | undefined) => {
        const currencyFormat = new Intl.NumberFormat('sr-RS', {
            style: 'currency',
            currency: 'RSD',
        });
        if (!t) {
            return currencyFormat.format(0);
        } else {
            return currencyFormat.format(parseInt(t.toString()));
        }

    }
    const showAllAppointments = () => {
        navigate(`/clients/${id}/appointments`)
    }
    const { data } = useQuery<SummaryData>({
        queryKey: [id],
        queryFn: () => axios_instance().post(`analytics/user_summary/${id}`).then(r => r.data),
        keepPreviousData: true
    })

    return (
        <>
            <div className="h-screen w-full p-10">
                {id &&
                    <ClientDetailsHeader id={id} />
                }
                <br />
                <div className="border-2 flex flex-col 2xl:flex-row lg:flex-col md:flex-col sm:flex-col justify-between ">

                    <div className="max-w-sm mx-2 bg-white rounded overflow-hidden shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{t('summary.total_profit')}</div>
                            <p className="text-teal-500 text-3xl font-semibold">{formatCurrency(data?.total_profit)}</p>
                        </div>
                    </div>


                    <div className="max-w-sm mx-2 bg-white rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{t('summary.total_completed_appointments')}</div>
                            <p className="text-blue-500 text-3xl font-semibold">{data?.total_completed_appointments}</p>
                        </div>
                    </div>


                    <div className="max-w-sm mx-2 bg-white rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{t('summary.last_appointment')}</div>
                            <p className="text-purple-500 text-3xl font-semibold">{data?.last_appointment}</p>
                        </div>
                    </div>
                </div>

                <br />
                <div className=" w-full h-1/3 ">
                    <div className="flex justify-between p-4">
                        <p className="text-black font-bold text-lg">{t('common.latest_appointments')}</p>
                        <button onClick={() => { showAllAppointments() }} className="text-blue-600 ">{t('common.show_all')}</button>
                    </div>
                    <div className="h-full">
                        <DataTable
                            has_actions={false}
                            fields={fields}
                            url={url}
                            has_search={false}
                            table_name=""
                            queryKey="last_5_client_appointments"
                        />
                    </div>
                </div>

                {/* <div >
                    <div>
                        <p className="font-bold text-xl pt-4">Media Files</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div className="h-32 w-full bg-blue-200 mr-2">
                            <div className="p-2">
                                <FileText size={24} />
                            </div>
                            <div className="p-2 pt-8">
                                <div className="font-semibold">Plan tretmana</div>
                                <div className="text-gray-600 text-sm">Submited on 15. May, 2023</div>
                            </div>
                        </div>
                        <div className="h-32 w-full mr-2 bg-blue-300">
                            <div className="p-2">
                                <FileText size={24} />
                            </div>
                            <div className="p-2 pt-8">
                                <div className="font-semibold">Plan tretmana</div>
                                <div className="text-gray-600 text-sm">Submited on 15. May, 2023</div>
                            </div>
                        </div>
                        <div className="h-32 w-full bg-blue-200">
                            <div className="p-2">
                                <FileText size={24} />
                            </div>
                            <div className="p-2 pt-8">
                                <div className="font-semibold">Plan tretmana</div>
                                <div className="text-gray-600 text-sm">Submited on 15. May, 2023</div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        </>
    );

}

export default ClientSummary;
