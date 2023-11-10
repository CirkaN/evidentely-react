import { useEffect, useState } from "react";
import SmsSettingsBox from "../../../components/sms_settings_box";
import axios_instance from "../../../config/api_defaults";
import { CompanyDetails } from "../../../shared/interfaces/company.interface";
import InfoBox, { InfoBoxType } from "../../../components/info-box";

interface SmsTemplate {
    type: string,
    text: string,
    id: string,
    company_id?: string,
}

const SmsSettings = () => {


    const [userHasMobileVerified, setUserHasMobileVerified] = useState(false);

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
    const fetchData = () => {
        axios_instance.get('/company/sms_templates').then(response => {
            mutateSmsTemplateData(response.data);
        })
        axios_instance.get('/company/details').then((response) => {
            const data: CompanyDetails = response.data;
            if (data.phone_verified_at) {
                setUserHasMobileVerified(true);
            }
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            {!userHasMobileVerified &&
                <>
                    <InfoBox type={InfoBoxType.Warning} headerText="Sms podesavanja" text="Molimo verifikujte vas telefon da bi nastavili sa podesavanjima"></InfoBox>
                    <div className="flex justify-center">
                        <div className="w-1/3 text-center">
                            <label htmlFor="phone_number">Broj telefona</label>
                            <input type="text" name="phone_number" id="phone_number"

                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            />
                            <div className="pt-2">
                                <button className="text-md rounded-md bg-slate-300 p-2">Potvrdi</button>
                            </div>
                        </div>
                    </div>
                </>
            }
            {userHasMobileVerified &&
                <>
                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">Obavestite klijente o terminima</p>
                        <div className="flex flex-col md:flex-row">
                            <SmsSettingsBox headerText="Potvrda Termina" type="reservation_confirmed" subHeaderText="Pri kreiranju termina" mainText={smsSettings.sms_templates.reservation_confirmed}></SmsSettingsBox>
                            <SmsSettingsBox headerText="Dan ranije" type="day_before" subHeaderText="u 19:00h" mainText={smsSettings.sms_templates.day_before}></SmsSettingsBox>
                            <SmsSettingsBox headerText="Istog dana" type="same_day" subHeaderText="2h pre termina" mainText={smsSettings.sms_templates.same_day}></SmsSettingsBox>
                        </div>
                    </div>

                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">Pokazite klijentima da vam je stalo</p>
                        <div className="flex flex-col md:flex-row">
                            <SmsSettingsBox headerText="Zahvalnica" type="thanks_note" subHeaderText="2 sata posle termina" mainText={smsSettings.sms_templates.thanks_note}></SmsSettingsBox>
                            <SmsSettingsBox headerText="Rodjendanska cestitka" type="birthday_wish" subHeaderText="U 10:00am" mainText={smsSettings.sms_templates.birthday_wish}></SmsSettingsBox>
                        </div>
                    </div>

                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">Podešavanja SMS poruke za zaposlene</p>
                        <div className="flex flex-col md:flex-row">
                            <SmsSettingsBox headerText="Potvrda zaposlenom" type="employee_reservation_reminder" subHeaderText="2 sata pre termina" mainText={smsSettings.sms_templates.employee_reservation_reminder}></SmsSettingsBox>
                            <SmsSettingsBox headerText="Potvrda zaposlenom" type="employee_reservation_created" subHeaderText="pri kreiranju termina" mainText={smsSettings.sms_templates.employee_reservation_created}></SmsSettingsBox>
                            <SmsSettingsBox headerText="Potvrda zaposlenom" type="employee_reservation_changed" subHeaderText="pri promeni termina" mainText={smsSettings.sms_templates.employee_reservation_changed}></SmsSettingsBox>
                        </div>
                    </div>
                </>

            }

        </>
    )
}

export default SmsSettings;