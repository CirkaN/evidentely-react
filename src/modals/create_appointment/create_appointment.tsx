import { Button, Dialog, Flex, Switch } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { Clients } from "../../services/clients/ClientService";
import axios_instance from "../../config/api_defaults";
import { AppointmentType } from "../../shared/interfaces/appointments.interface";
import Select, { SingleValue } from 'react-select'
import { ServiceType } from "../../shared/interfaces/service.interface";

interface CreateAppointmentModalProps {
    cancelFunction: () => void,
    saveFunction: (title: string) => void,
    isOpen: boolean,
    appointment_data: {
        start: string,
        end: string
    }
}

const CreateAppointmentModal = (props: CreateAppointmentModalProps) => {

    const [form, setForm] = useState<AppointmentType>({

        //client_od
        user_id: "",
        service_id: "",
        title: "",
        start: props?.appointment_data?.start,
        end: props?.appointment_data?.end,
        price: "100",
        color: '#FFFFF',
        remind_client: true,
        remind_settings: {
            remind_day_before: false,
            remind_same_day: false,
            remind_now: false,
            remind_for_upcoming: false,
            settings_for_upcoming: {
                date: "",
                custom_text_message: "",
            }
        },
        note: "",
    });
    const [clientList, setClientList] = useState<Clients[]>([]);
    const [serviceList, setServiceList] = useState([]);


    const servicesTransformed = serviceList.map((element: ServiceType) => ({
        value: element.id,
        label: element.name
    }));
    const clientsTransformed = clientList.map((element) => ({
        value: element.id,
        label: element.name
    }));

    const myFetchFunc = () => {
        axios_instance.get('/clients').then(response => {
            setClientList(response.data);
        })
        axios_instance.get('/services').then(response => {
            setServiceList(response.data);
        })
    }

    useEffect(() => {
        myFetchFunc();
    }, [])


    const setServiceForm = (e: SingleValue<{ value: string; label: string; }>) => {
        if (e) {
            setForm((c) => c && { ...c, service_id: e.value })
            if (!form.title) {
                setForm((c) => c && { ...c, title: e.label });
            }
        }
    }



    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Trigger>
                <Button>Create appointment</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Create Appointment</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Create appointment
                </Dialog.Description>

                <div>
                    <label>Title</label>
                    <input
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        placeholder="Title"
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm((c) => c && { ...c, title: e.target.value })} />

                </div>

                <div>
                    <label>Service</label>
                    <Select onChange={(e) => { setServiceForm(e) }} options={servicesTransformed} />
                </div>

                <div>
                    <label>Client</label>
                    <Select options={clientsTransformed} />
                </div>

                <div>
                    <label> Remind Client</label>
                    <Switch
                        checked={form.remind_client}
                        onCheckedChange={(checked) => setForm((c) => c && { ...c, remind_client: checked })}
                    />
                </div>


                {form.remind_client && (
                    <>
                        <div>
                            <label> Remind day before</label>
                            <Switch
                                checked={form?.remind_settings?.remind_day_before}
                                onCheckedChange={(checked) => setForm((c) => c && { ...c, remind_settings: { ...c.remind_settings, remind_day_before: checked } })}
                            />
                        </div>
                        <div>
                            <label>Remind same day</label>
                            <Switch
                                checked={form?.remind_settings?.remind_same_day}
                                onCheckedChange={(checked) => setForm((c) => c && { ...c, remind_settings: { ...c.remind_settings, remind_same_day: checked } })}
                            />
                        </div>
                        <div>
                            <label> Remind for upcoming</label>
                            <Switch
                                checked={form?.remind_settings?.remind_for_upcoming}
                                onCheckedChange={(checked) => setForm((c) => c && { ...c, remind_settings: { ...c.remind_settings, remind_for_upcoming: checked } })}
                            />
                        </div>
                    </>
                )}
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        value={form.price}
                        onChange={(e) => setForm((c) => c && { ...c, price: e.target.value })} />

                </div>
                <div>
                    <label>Event Color:</label>
                    <input type="color"
                        onChange={(e) => setForm((c) => c && { ...c, color: e.target.value })}
                        value={form.color} />
                </div>


                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button onClick={props.cancelFunction} variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={() => { props.saveFunction(form?.title) }}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default CreateAppointmentModal