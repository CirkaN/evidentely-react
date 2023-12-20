import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios_instance from "../../../config/api_defaults";
import { useParams } from "react-router-dom";
import { FileText } from "react-feather";
import ClientDetailsHeader from "../../../layouts/clients/details_header";


interface SummaryData {
    total_profit: string,
    last_appointment: string,
    total_completed_appointments: string,
}

const ClientSummary = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data } = useQuery<SummaryData>({
        queryKey: [id],
        queryFn: () => axios_instance().post(`analytics/user_summary/${id}`).then(r => r.data),
        keepPreviousData: true
    })

    return (
        <>
            <div className="h-screen w-full p-10">
                {id &&
                    <ClientDetailsHeader id={id} active="summary" />
                }
                <br />
                <div className="flex flex-col 2xl:flex-row lg:flex-col md:flex-col sm:flex-col justify-between ">

                    <div className="max-w-sm mx-2 bg-white rounded overflow-hidden shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{t('summary.total_profit')}</div>
                            <p className="text-teal-500 text-3xl font-semibold">{data?.total_profit}</p>
                        </div>
                    </div>


                    <div className="max-w-sm mx-2 bg-white rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{t('summary.total_appointments')}</div>
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
                <div className="bg-slate-200 w-full h-1/3 ">
                    <div className="flex justify-between p-4">
                        <p className="text-black font-bold text-lg">Latest appointments</p>
                        <p className="text-blue-600 ">Show All</p>
                    </div>
                    <div className="p-4"> content goes here </div>
                </div>

                <div >
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
                </div>

            </div>
        </>
    );

}

export default ClientSummary;
