import { FormEvent, useEffect, useState } from "react";
import SmsSettingsBox from "../../../components/sms_settings_box";
import axios_instance from "../../../config/api_defaults";
import { CompanyDetails } from "../../../shared/interfaces/company.interface";
import InfoBox, { InfoBoxType } from "../../../components/info-box";
import { SmsTemplate } from "../../../shared/interfaces/sms_templates.interface";
import EditSmsSettingsModal from "../../../modals/settings/sms_settings/EditSmsSettings";
import { useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { t } from "i18next";


const SmsSettings = () => {

    const [userHasMobileVerified, setUserHasMobileVerified] = useState(false);
    const [phoneVerificationForm, setPhoneVerificationForm] = useState({
        phone_number: ""
    });
    const [wrongCode, setIsWrongCode] = useState(false);
    const [phoneVerificationInProgress, setPhoneVerificationInProgress] = useState(false);
    const [codeReceived, setCodeReceived] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalType, setEditModalType] = useState("");
    const [editModalText, setEditModalText] = useState("");
    const queryClient = useQueryClient();
    const [smsSettings, setSmsSettings] = useState({
        sms_templates: {
            reservation_confirmed: "",
            same_day: "",
            day_before: "",
            birthday_wish: "",
            thanks_note: "",
            employee_reservation_reminder: "",
            employee_reservation_created: "",
            employee_reservation_changed: "",
        }
    })
    const mutateSmsTemplateData = (data: SmsTemplate[]) => {
        data.forEach((element) => {
            setSmsSettings((c) => c && { ...c, sms_templates: { ...c.sms_templates, [element.type]: [element.text] } });
        })
    }
    useQuery({
        queryKey: [],
        queryFn: () => axios_instance().get('/company/sms_templates').then(response => {
            mutateSmsTemplateData(response.data);
        }),
    })

    const fetchData = () => {
        axios_instance().get('/company/details').then((response) => {
            const data: CompanyDetails = response.data;
            if (data.phone_verified_at) {
                setUserHasMobileVerified(true);
            }
        })
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const openModal = (text: string, type: string) => {
        setEditModalType(type);
        setEditModalText(text.toString());
        setIsEditModalOpen(true);
    }
    const closeModal = () => {
        setEditModalType("");
        setEditModalText("");
        setIsEditModalOpen(false);
    }
    const updateSmsSettings = (smsTemplate: SmsTemplate) => {
        closeModal();
        axios_instance().put('/company/update_sms_templates', smsTemplate).then(() => {
            toast.success('Uspesno ste izmenili poruku');
            queryClient.invalidateQueries();
        }).catch(e => {
            e.response.data.errors.text.forEach((element: string) => {
                toast.error(element);
            });
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        attemptVerification()
    }
    const handleVerifySubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        verifyCode()
    }

    const verifyCode = () => {
        axios_instance().post('/company/attempt_verification', { code: codeReceived }).then(response => {
            if (response.status === 200) {
                setUserHasMobileVerified(true);
            }
        }).catch(() => {
            setIsWrongCode(true);
        })
    }
    const attemptVerification = () => {
        axios_instance().post('/company/verify_phone', phoneVerificationForm).then(response => {
            if (response.status === 201) {
                setPhoneVerificationInProgress(true);
            }
        })
    }
    return (
        <>
            <EditSmsSettingsModal text={editModalText} saveFunction={(smsTemplate) => { updateSmsSettings(smsTemplate) }} cancelFunction={() => { closeModal() }} isOpen={isEditModalOpen} type={editModalType} ></EditSmsSettingsModal>
            {!userHasMobileVerified &&
                <>
                    {!phoneVerificationInProgress &&
                        <>
                            <InfoBox type={InfoBoxType.Warning} headerText="Sms podesavanja" text="Molimo verifikujte vas telefon da bi nastavili sa podesavanjima"></InfoBox>
                            <form onSubmit={handleSubmit}>
                                <div className="flex justify-center">
                                    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 text-center px-4">
                                        <label htmlFor="phone_number">{t('common.phone_number')}:</label>
                                        <p className="text-xs sm:text-sm md:text-base text-red-600">
                                            {t('sms.phone_format')}
                                        </p>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                setPhoneVerificationForm((c) => c && { ...c, phone_number: e.target.value });
                                            }}
                                            name="phone_number"
                                            id="phone_number"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 mt-2"
                                        />
                                        <div className="mt-2">
                                            <button className="text-md sm:text-lg rounded-md bg-blue-500 text-white p-2 w-full">
                                                {t('common.accept')}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </>
                    }
                    {phoneVerificationInProgress &&
                        <>
                            <InfoBox type={InfoBoxType.Warning} headerText="Sms podesavanja" text="Molimo unesite kod koji ste dobili na vasem telefonskom uredjaju"></InfoBox>
                            <form onSubmit={handleVerifySubmit}>
                                {wrongCode &&
                                    <p className=" pt-5 text-center text-sm text-red-600">
                                        {t('sms.verification_failed')}</p>
                                }
                                <div className="flex justify-center">
                                    <div className="w-1/3 text-center">
                                        <label htmlFor="code">{t('sms.code')}:</label>
                                        <input type="text"
                                            onChange={(e) => { setCodeReceived(e.target.value) }}
                                            name="code"
                                            id="code"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                                        <div className="pt-2">
                                            <button className="text-md rounded-md hover:bg-slate-400 bg-slate-300 p-2">{t('common.confirm')}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </>
                    }
                </>
            }
            {userHasMobileVerified &&
                <>
                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">{t('sms.notify_clients_about_appointments')}</p>
                        <div className="flex flex-col md:flex-row">
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.reservation_confirmed, 'reservation_confirmed') }} headerText={t('sms.client_reservation_confirmation')}type="reservation_confirmed" subHeaderText="Pri kreiranju termina" mainText={smsSettings.sms_templates.reservation_confirmed}></SmsSettingsBox>
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.day_before, 'day_before') }} headerText={t('sms.day_before')} type="day_before" subHeaderText="u 19:00h" mainText={smsSettings.sms_templates.day_before}></SmsSettingsBox>
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.same_day, 'same_day') }} headerText={t('sms.same_day')} type="same_day" subHeaderText="2h pre termina" mainText={smsSettings.sms_templates.same_day}></SmsSettingsBox>
                        </div>
                    </div>

                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">{t('sms.show_clients_you_care')}</p>
                        <div className="flex flex-col md:flex-row">
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.thanks_note, 'thanks_note') }} headerText={t('sms.thank_you_note')} type="thanks_note" subHeaderText="2 sata posle termina" mainText={smsSettings.sms_templates.thanks_note}></SmsSettingsBox>
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.birthday_wish, 'birthday_wish') }} headerText={t('sms.birthday_wish')} type="birthday_wish" subHeaderText="U 10:00am" mainText={smsSettings.sms_templates.birthday_wish}></SmsSettingsBox>
                        </div>
                    </div>

                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">{t('sms.employee_sms_settings')}</p>
                        <div className="flex flex-col md:flex-row">
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.employee_reservation_reminder, 'employee_reservation_reminder') }} headerText={t('sms.confirmation_to_employee')} type="employee_reservation_reminder" subHeaderText="2 sata pre termina" mainText={smsSettings.sms_templates.employee_reservation_reminder}></SmsSettingsBox>
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.employee_reservation_created, 'employee_reservation_created') }} headerText={t('sms.confirmation_to_employee')} type="employee_reservation_created" subHeaderText="pri kreiranju termina" mainText={smsSettings.sms_templates.employee_reservation_created}></SmsSettingsBox>
                            <SmsSettingsBox onClickFunction={() => { openModal(smsSettings.sms_templates.employee_reservation_changed, 'employee_reservation_changed') }} headerText={t('sms.confirmation_to_employee')} type="employee_reservation_changed" subHeaderText="pri promeni termina" mainText={smsSettings.sms_templates.employee_reservation_changed}></SmsSettingsBox>
                        </div>
                    </div>
                </>

            }

        </>
    )
}

export default SmsSettings;