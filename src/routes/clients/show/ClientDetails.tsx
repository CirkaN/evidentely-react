import { Switch } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Check, X } from "react-feather";
import { useOutletContext, useParams } from "react-router-dom";
import { ContextType } from "../ClientShow";
import toast from "react-hot-toast";
import axios_instance from "../../../config/api_defaults";
import { t } from "i18next";


const ClientDetails = () => {
    const [somethingChanged, setSomethingChanged] = useState(false);
    const client = useOutletContext<ContextType>()
    const [form, setForm] = useState(client);
    const { id } = useParams();

    useEffect(() => {
        if (client) {
            setForm(client);
        }
    }, [client]);

    useEffect(() => {
        if (form) {
            const stringifiedClient = JSON.stringify(client);
            const stringifiedForm = JSON.stringify(form);
            if (stringifiedClient === stringifiedForm) {
                return setSomethingChanged(false);
            }
            return setSomethingChanged(true);
        }
        return setSomethingChanged(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const saveChanges = () => {

        //use axios.all for toast.

        axios_instance().put(`/clients/${id}`, form)
            .catch((e) => {
                toast.error(e.response.data.message);
            })
        if (form?.settings) {
            axios_instance().put(`/clients/${id}/settings`, form.settings)
                .catch((e) => {
                    toast.error(e.response.data.message);
                })
        }
        setSomethingChanged(false);
    }

    const resetChanges = () => {
        setForm(client);
        toast.success('Settings reverted succesfully')
        setSomethingChanged(false);
    }


    return (
        <>
            {somethingChanged && <div className="flex justify-end space-x-4 ">
                <button onClick={() => { saveChanges() }} className="rounded-full hover:bg-green-700 bg-green-500 "><Check size={50} color="white"></Check></button>
                <button onClick={() => { resetChanges() }} className="rounded-full hover:bg-red-700 bg-red-500 "><X size={50} color="white"></X></button>
            </div>}

            <div className="flex justify-between">
                <div>
                    <form className="w-full max-w-lg">
                        <div className="p-5 text-center text-lg block text-gray-800">Izmeni Klijenta</div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    {t('common.name')}:
                                </label>
                                <input
                                    onChange={(e) => setForm((c) => c && ({ ...c, name: e.target.value }))}
                                    value={form?.name ?? ""}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="John Doe" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    {t('common.address')}:
                                </label>
                                <input
                                    value={form?.settings.address ?? ""}
                                    onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, address: e.target.value } })}

                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="John Doe" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {t('common.email')}
                                </label>
                                <input
                                    value={form?.email ?? ""}
                                    onChange={(e) => setForm((c) => c && { ...c, email: e.target.value })}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="email" placeholder="my@mail.com" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                   {t('common.phone')}
                                </label>
                                <input
                                    value={form?.settings.phone_number ?? ""}
                                    onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, phone_number: e.target.value } })}

                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="+381634556420" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {t('common.country')}
                                </label>
                                <select id="country"
                                    value={form?.settings.country ?? ""}
                                    onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, country: e.target.value } })}
                                    name="country"
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">

                                    <option value="" disabled >Select</option>
                                    <option value="rs">Serbia</option>
                                    {/* <option value="ba">Bosnia</option>
                                    <option value="me">Montenegro</option> */}
                                </select>
                            </div>

                            <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    {t('common.occupation')}
                                </label>
                                <input
                                    value={form?.settings.occupation ?? ""}
                                    onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, occupation: e.target.value } })}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Teacher" />
                            </div>
                        </div>
                    </form>
                </div>




                <div>

                    <div className="bg-white p-5 basis-1/3  w-96">
                        <h1 className="text-xl mb-2">Podesavanja</h1>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Use SMS for notifications</label>
                            <Switch
                                checked={form?.settings.receive_sms}
                                onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, receive_sms: checked } }))}
                            />
                        </div>

                        {form?.settings.receive_sms ?
                            <div>
                                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <h1 className="text-md mb-4">Defaults</h1>
                                    <label className="block text-sm font-medium text-gray-600">Remind day before appointment (24h)</label>
                                    <Switch
                                        checked={form?.settings.sms_remind_day_before}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, sms_remind_day_before: checked } }))}
                                    />

                                    <label className="block text-sm font-medium text-gray-600">Remind same day when appointment is due (2h before appointment)</label>
                                    <Switch
                                        checked={form?.settings.sms_remind_same_day}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, sms_remind_same_day: checked } }))}
                                    />


                                    <label className="block text-sm font-medium text-gray-600">Remind when appointment is created</label>
                                    <Switch
                                        checked={form?.settings.sms_remind_when_appointment_is_created}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, sms_remind_when_appointment_is_created: checked } }))}
                                    />
                                    <label className="block text-sm font-medium text-gray-600">Send thank you note on appointment end (30 min after)</label>
                                    <Switch
                                        checked={form?.settings.sms_send_thank_you_note}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, sms_send_thank_you_note: checked } }))}
                                    />
                                </div>
                            </div>
                            : null}
                        <hr />


                        {/* <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-600">Use Email for notifications</label>
                            <Switch
                                checked={form?.settings.receive_emails}
                                onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, receive_emails: checked } }))}
                            />
                        </div> */}

                        {/* {form?.settings.receive_emails ?
                            <div>
                                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                                    <h1 className="text-md mb-4">Defaults</h1>
                                    <label className="block text-sm font-medium text-gray-600">Remind day before appointment (24h)</label>
                                    <Switch
                                        checked={form?.settings.email_remind_day_before}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, email_remind_day_before: checked } }))}

                                    />

                                    <label className="block text-sm font-medium text-gray-600">Remind same day when appointment is due (2h before appointment)</label>
                                    <Switch
                                        checked={form?.settings.email_remind_same_day}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, email_remind_same_day: checked } }))}

                                    />

                                    <label className="block text-sm font-medium text-gray-600">Remind when appointment is created</label>
                                    <Switch
                                        checked={form?.settings.email_remind_when_appointment_is_created}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, email_remind_when_appointment_is_created: checked } }))}

                                    />
                                    <label className="block text-sm font-medium text-gray-600">Send thank you note on appointment end (30 min after)</label>
                                    <Switch
                                        checked={form?.settings.email_send_thank_you_note}
                                        onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, email_send_thank_you_note: checked } }))}
                                    />
                                </div>
                            </div>
                            : null} */}
                    </div>

                </div>


            </div>
        </>)
}

export default ClientDetails;