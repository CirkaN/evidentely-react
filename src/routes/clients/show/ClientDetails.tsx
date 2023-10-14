import { Switch } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Check, X } from "react-feather";
import { useOutletContext, useParams } from "react-router-dom";
import { ContextType } from "../ClientShow";
import toast, { Toaster } from "react-hot-toast";
import axios_instance from "../../../config/api_defaults";


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
        
        axios_instance.put(`/clients/${id}`, form)
            .catch((e) => {
                toast.error(e.response.data.message);
            })
        if (form?.settings) {
            axios_instance.put(`/clients/${id}/settings`, form.settings)
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
            <Toaster />
            {somethingChanged && <div className="flex justify-end space-x-4 ">
                <button onClick={() => { saveChanges() }} className="rounded-full hover:bg-green-700 bg-green-500 "><Check size={50} color="white"></Check></button>
                <button onClick={() => { resetChanges() }} className="rounded-full hover:bg-red-700 bg-red-500 "><X size={50} color="white"></X></button>
            </div>}
            <form>
                <div className=" flex bg-red-200 ">

                    <div className="bg-white p-8 basis-1/3  w-96">
                        <h1 className="text-2xl font-semibold mb-4">Basic Details</h1>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                            <input type="text" id="name" onChange={(e) => setForm((c) => c && ({ ...c, name: e.target.value }))}

                                value={form?.name ?? ""} name="name" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="John Doe" required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
                            <input id="address"
                                value={form?.settings.address ?? ""}
                                onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, address: e.target.value } })}
                                name="address" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="123 Main St" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-600">Country</label>
                            <select id="country"
                                value={form?.settings.country ?? ""}
                                onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, country: e.target.value } })}
                                name="country" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400">
                                <option value="" disabled >Select a country</option>
                                <option value="rs">Serbia</option>
                                <option value="ba">Bosnia</option>
                                <option value="me">Montenegro</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone Number</label>
                            <input
                                value={form?.settings.phone_number ?? ""}
                                onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, phone_number: e.target.value } })}
                                type="tel" id="phone" name="phone" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="123-456-7890" />
                        </div>

                    </div>
                    <div className="bg-white p-8 basis-1/3  w-96">
                        <h1 className="text-2xl font-semibold mb-4">Advanced Settings</h1>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                value={form?.email ?? ""}
                                onChange={(e) => setForm((c) => c && { ...c, email: e.target.value })}
                                type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="someone@mail.com" required />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-600">Occupation</label>
                            <input
                                value={form?.settings.occupation ?? ""}
                                onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, occupation: e.target.value } })}

                                type="text" id="occupation" name="occupation" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" placeholder="Mechanic" required />
                        </div>


                    </div>
                    <div className="bg-white p-8 basis-1/3  w-96">
                        <h1 className="text-2xl font-semibold mb-4">Notification Settings</h1>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Use SMS for notifications</label>
                            <Switch
                                checked={form?.settings.receive_sms}
                                onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, receive_sms: checked } }))}

                            />
                        </div>
                        {/* &&  => if (nesto = true && nestodrugo = true) */}
                        {/* false && true => false & true => 0 */}

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
                        : null }
                        <hr />


                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-600">Use Email for notifications</label>
                            <Switch
                                checked={form?.settings.receive_emails}
                                onCheckedChange={(checked) => setForm((c) => c && ({ ...c, settings: { ...c.settings, receive_emails: checked } }))}
                            />
                        </div>

                        {form?.settings.receive_emails ?
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
                       :null }
                    </div>
                </div>
            </form>
        </>)
}

export default ClientDetails;