import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios_instance from "../../../config/api_defaults";
import { useParams } from "react-router-dom";


interface SummaryData{
    total_profit:string,
    last_appointment:string,
    total_completed_appointments:string,
}

const ClientSummary = () => {

    const {t} = useTranslation();
    const {id} = useParams();
    const {data} = useQuery<SummaryData>({
        queryKey: [id],
        queryFn: () => axios_instance().post(`analytics/user_summary/${id}`).then(r => r.data),
        keepPreviousData: true
    })

    return (
        <>
            <div>
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
                <div className="flex flex-col 2xl:flex-row lg:flex-col md:flex-col sm:flex-col ">
                    <div className="bg-white overflow-hidden shadow-md rounded-lg w-4/5 p-4 mt-10">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, ipsum tempore. Ipsam eveniet ad, ex in id laborum sapiente, vero, iure similique at aut molestias quis soluta nemo doloribus enim. Maxime esse totam laboriosam impedit dolorem numquam similique ea? Eum voluptates nesciunt, eveniet corporis itaque omnis iusto. Cum, accusamus, quasi assumenda eligendi doloribus debitis placeat deserunt quas soluta dolore tenetur.

                    </div>
                  
                    <div className="2xl:w-1/5 lg:w-full max-w-lg mx-auto mt-8">

                        <div className="bg-white overflow-hidden shadow-md rounded-lg">
                            <div className="p-4">
                                <h2 className="text-xl md font-semibold mb-4">Last 5 Sent SMS</h2>


                                <div className="py-2">
                                    <p className="text-sm ">Nov 15 2023</p>
                                    <p className="text-sm text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, iste?</p>
                                    <button className="bg-slate-500 text-white px-2 rounded py-1 hover:bg-slate-700 text-sm">Open message</button>
                                </div>

                                <div className="py-2">
                                    <p className="text-sm ">Nov 15 2023</p>
                                    <p className="text-sm text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, iste?</p>
                                    <button className="bg-slate-500 text-white px-2 rounded py-1 hover:bg-slate-700 text-sm">Open message</button>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm ">Nov 15 2023</p>
                                    <p className="text-sm text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, iste?</p>
                                    <button className="bg-slate-500 text-white px-2 rounded py-1 hover:bg-slate-700 text-sm">Open message</button>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm ">Nov 15 2023</p>
                                    <p className="text-sm text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, iste?</p>
                                    <button className="bg-slate-500 text-white px-2 rounded py-1 hover:bg-slate-700 text-sm">Open message</button>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm ">Nov 15 2023</p>
                                    <p className="text-sm text-blue-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, iste?</p>
                                    <button className="bg-slate-500 text-white px-2 rounded py-1 hover:bg-slate-700 text-sm">Open message</button>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </>
    );

}

export default ClientSummary;
