import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios_instance from "../../config/api_defaults";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "react-feather";
import DetailNoteBox from "../../layouts/clients/details_note_box";
import AddUserNoteModal from "../../modals/clients/add_user_note_modal";
import { useQuery, useQueryClient } from "react-query";
import { NoteDTO } from "../../shared/interfaces/user_notes.interface";
import { ClientSettings } from "../../shared/interfaces/client.interface";
import toast from "react-hot-toast";
import AddUserSettings from "../../modals/clients/add_user_settings_modal";

interface Client {
    id: string;
    user_id: string;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    settings: ClientSettings;
    saldo: number;
    gender: string;
    birthday?: string;
    birthday_formatted?: string;
}

export type ContextType = Client | null;
type PreparedNoteDTO = Omit<NoteDTO, "created_by">;
export type AvailableSettingField =
    | "email"
    | "phone_number"
    | "gender"
    | "address"
    | "birthday"
    | "name";
const ClientShow = () => {
    const [userDetails, setUserDetails] = useState<Client | null>(null);
    const [showNoteAddModal, setShowNoteAddModal] = useState(false);
    const [activeSettingsField, setActiveSettingsField] =
        useState<AvailableSettingField>("email");
    const [activeSettingsModalOpen, setActiveSettingsModalOpen] =
        useState(false);
    const { id } = useParams();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    useQuery({
        queryKey: ["client_show_detail"],
        queryFn: () =>
            axios_instance()
                .get(`/clients/${id}`)
                .then((response) => {
                    setUserDetails(response.data);
                })
                .catch((e) => {
                    if (e.request.status === 404) {
                        navigate("/clients");
                    }
                }),
    });
    const saveUserNote = (form: PreparedNoteDTO) => {
        axios_instance()
            .post(`/user/${id}/notes`, form)
            .then(() => {
                setShowNoteAddModal(false);
                toast.success(t("toasts.note_created_succesfully"));
                queryClient.invalidateQueries({
                    queryKey: ["user_notes_summary"],
                });
            });
    };

    const formatCurrency = (t: string | undefined) => {
        if (t) {
            const s = new Intl.NumberFormat("sr-RS", {
                style: "currency",
                currency: "RSD",
            });
            return s.format(parseInt(t));
        }
        return 0;
    };

    const applySettingsField = (type: AvailableSettingField) => {
        setActiveSettingsModalOpen(true);
        setActiveSettingsField(type);
    };
    const navigate = useNavigate();
    return (
        <>
            {id && (
                <>
                    <AddUserNoteModal
                        saveFunction={(form) => saveUserNote(form)}
                        isOpen={showNoteAddModal}
                        user_id={id}
                        cancelFunction={() => setShowNoteAddModal(false)}
                    />
                    <AddUserSettings
                        isOpen={activeSettingsModalOpen}
                        user_id={id}
                        cancelFunction={() => setActiveSettingsModalOpen(false)}
                        type={activeSettingsField}
                    />
                </>
            )}

            <div className="flex flex-col sm:flex-row pt-10">
                <div className="h-full sm:h-screen w-full sm:w-1/3 p-10  shadow-lg  border-2">
                    <div className="flex items-center">
                        <div className="">
                            <Link to="/clients">
                                <ArrowLeft />
                            </Link>
                        </div>
                        <div className="pl-2">
                            <p className="text-lg ">
                                {t("common.client_list")}
                            </p>
                        </div>
                    </div>
                    <div className="pt-10">
                        <div className="pt-3 text-center">
                            <p
                                onClick={() => {
                                    applySettingsField("name");
                                }}
                                className="font-semibold text-4xl uppercase text-blue-600 cursor-pointer underline"
                            >
                                {userDetails?.name}
                            </p>
                        </div>
                    </div>

                    <div className="py-5">
                        <p className="text-lg font-bold text-center pb-3 underline">
                            {t("common.client_details")}
                        </p>
                        <div className="flex flex-col  space-y-2 space-x-2">
                            <div className="flex flex-row">
                                <div className="w-1/2 px-2 text-gray-600">
                                    <p>{t("common.email")}:</p>
                                </div>
                                <div>
                                    <p
                                        onClick={() => {
                                            applySettingsField("email");
                                        }}
                                        className="text-blue-400 px-1 cursor-pointer"
                                    >
                                        {userDetails?.email ?? (
                                            <button>Dodaj</button>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 w-1/2">
                                    <p>{t("common.phone_number")}:</p>
                                </div>
                                <div>
                                    <p
                                        onClick={() => {
                                            applySettingsField("phone_number");
                                        }}
                                        className="text-blue-400 cursor-pointer"
                                    >
                                        {userDetails?.phone_number ? (
                                            "0" + userDetails.phone_number
                                        ) : (
                                            <button>Dodaj</button>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 w-1/2">
                                    <p>{t("common.birth_date")}:</p>
                                </div>
                                <div>
                                    <p
                                        className="cursor-pointer text-blue-400"
                                        onClick={() => {
                                            applySettingsField("birthday");
                                        }}
                                    >
                                        {userDetails?.birthday_formatted ?? (
                                            <button>Dodaj</button>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 w-1/2">
                                    <p>{t("common.address")}:</p>
                                </div>
                                <div>
                                    <p
                                        className="cursor-pointer text-blue-400"
                                        onClick={() => {
                                            applySettingsField("address");
                                        }}
                                    >
                                        {userDetails?.address ?? (
                                            <button className="text-blue-400">
                                                Dodaj
                                            </button>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="text-gray-600 w-1/2">
                                    <p className="font-bold">Saldo:</p>
                                </div>
                                <div>
                                    <p className="font-bold text-orange-500">
                                        {formatCurrency(
                                            userDetails?.saldo.toString(),
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div>
                        <div className="flex justify-center space-x-3">
                            <p className=" py-2 text-center text-black text-lg font-bold">Tags</p>
                            <button className="text-blue-300 text-3xl">+</button>
                        </div>
                        <div className="flex">
                            <p className="text-blue-600 rounded bg-blue-100 px-2">kozmetika</p>
                        </div>
                    </div> */}

                    <div>
                        <div className="flex justify-center space-x-3">
                            <p className=" py-2 text-center text-black text-lg font-bold underline">
                                {t("common.notes")}
                            </p>
                            <button
                                onClick={() => setShowNoteAddModal(true)}
                                className="text-blue-300 text-3xl"
                            ></button>
                        </div>
                        {id && <DetailNoteBox id={id} />}
                    </div>
                </div>
                <hr />

                <Outlet context={userDetails satisfies ContextType} />
            </div>
        </>
    );
};

export default ClientShow;
