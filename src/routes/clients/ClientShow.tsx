import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios_instance from "../../config/api_defaults";
import { ClientSettings } from "../../services/clients/ClientService";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "react-feather";
import DetailNoteBox from "../../layouts/clients/details_note_box";
import AddUserNoteModal from "../../modals/clients/add_user_note_modal";
import { useQueryClient } from "react-query";
import { NoteDTO } from "../../shared/interfaces/user_notes.interface";

interface Client {
    id: string,
    user_id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    settings: ClientSettings,
    birth_date?: string,
}

export type ContextType = Client | null;
type PreparedNoteDTO = Omit<NoteDTO, 'created_by'>

const ClientShow = () => {

    const [userDetails, setUserDetails] = useState<Client | null>(null);
    const [showNoteAddModal, setShowNoteAddModal] = useState(false);
    const { id } = useParams();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

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
    const saveUserNote = (form:PreparedNoteDTO) => {
        axios_instance().post(`/user/${id}/notes`, form).then(() => {
                setShowNoteAddModal(false);
                queryClient.invalidateQueries({
                    queryKey: ['user_notes_summary'],
                })
         });
    }



    const navigate = useNavigate();
    return (
        <>
            {id &&
                <AddUserNoteModal saveFunction={(form) => saveUserNote(form)} isOpen={showNoteAddModal} user_id={id} cancelFunction={() => setShowNoteAddModal(false)}
                />}

            <div className="flex flex-col sm:flex-row">
                <div className="h-full sm:h-screen w-full sm:w-1/3 p-10">
                    <div className="flex items-center">
                        <div className="">
                            <Link className="" to="/clients"><ArrowLeft /></Link>
                        </div>
                        <div className="pl-2">
                            <p className="text-lg">{t('common.client_list')}</p>
                        </div>
                    </div>
                    <div className="pt-10">
                        <div className="pt-3 text-center">
                            <p className="font-semibold text-4xl">{userDetails?.name}</p>
                        </div>
                    </div>

                    <div className="py-5">
                        <p className="text-lg font-bold text-center pb-3">Client details</p>
                        <div className="flex flex-col  space-y-2 space-x-2">
                            <div className="flex flex-row">
                                <div className="w-1/2 px-2 text-gray-600">
                                    <p>{t('common.email')}:</p>
                                </div>
                                <div>
                                    <p className="text-blue-400">{userDetails?.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 w-1/2">
                                    <p>{t('common.phone_number')}:</p>
                                </div>
                                <div>
                                    <p className="text-blue-400">
                                        {userDetails?.phone ?? <button>+</button>}</p>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 w-1/2">
                                    <p>{t('common.birth_date')} :</p>
                                </div>
                                <div>
                                    <p>{userDetails?.birth_date ?? <button className="text-blue-400"> +</button>}</p>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 w-1/2">
                                    <p>{t('common.address')}:</p>
                                </div>
                                <div>
                                    <p>{userDetails?.address ?? <button className="text-blue-400">+</button>}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-center space-x-3">
                            <p className=" py-2 text-center text-black text-lg font-bold">Tags</p>
                            <button className="text-blue-300 text-3xl">+</button>
                        </div>
                        <div className="flex">
                            <p className="text-blue-600 rounded bg-blue-100 px-2">kozmetika</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-center space-x-3">
                            <p className=" py-2 text-center text-black text-lg font-bold">Notes</p>
                            <button onClick={() => setShowNoteAddModal(true)} className="text-blue-300 text-3xl">+</button>
                        </div>

                        {id && <DetailNoteBox id={id} />}

                    </div>

                </div>
                <hr />
                <Outlet context={userDetails satisfies ContextType} />
            </div>
        </>

    )
}


export default ClientShow