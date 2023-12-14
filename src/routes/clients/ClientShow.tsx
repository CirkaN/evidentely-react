import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios_instance from "../../config/api_defaults";
import { ClientSettings } from "../../services/clients/ClientService";
import { useTranslation } from "react-i18next";

interface Client {
    id: string,
    user_id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    settings: ClientSettings,
}

export type ContextType = Client | null;

const ClientShow = () => {

    const [userDetails, setUserDetails] = useState<Client | null>(null);
    const { id } = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        axios_instance().get(`/clients/${id}`)
            .then(response => {
                setUserDetails(response.data);
            }).catch(e => {
                if (e.request.status === 404) {
                    navigate("/clients")
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate();
    return (
        <>
            <div className="flex">
                <div className="basis-1/3">
                    <div className="min-h-screen rounded-sm border bg-slate-50">
                        <p className="py-10 text-center text-xl">{userDetails && userDetails.name}</p>
                        <p className="text-center text-gray-700">
                            <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('summary') }}>[F] Summary</button>
                        </p>
                        <p className="text-center text-gray-700">
                            <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('details') }}> [F] Details</button>
                        </p>
                        <p className="text-center text-gray-700">
                            <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('sms_history') }}>[F] Sms History</button>
                        </p>

                        <p className="text-center text-gray-700">
                            <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('documents') }}>[F] Documents</button>
                        </p>
                    </div>
                </div>
                <div className="basis-full bg-slate-100 px-10 py-10">
                    <div className="px-5">
                        <div className="pb-1 font-sans text-2xl font-semibold">{t('common.client_details')}</div>

                    </div>

                    <div className="h-full px-5 py-5">
                        <div className="h-full bg-white p-5 rounded shadow-md">
                            <Outlet context={userDetails satisfies ContextType} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


export default ClientShow