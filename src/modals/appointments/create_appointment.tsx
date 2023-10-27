import { Button, Dialog, Flex, Switch } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { Clients } from "../../services/clients/ClientService";
import axios_instance from "../../config/api_defaults";
import { AppointmentType } from "../../shared/interfaces/appointments.interface";
import Select, { SingleValue } from 'react-select'
import { ServiceType } from "../../shared/interfaces/service.interface";
import toast, { Toaster } from "react-hot-toast";
import { EmployeeDTO } from "../../shared/interfaces/employees.interface";

interface CreateAppointmentModalProps {
    cancelFunction: () => void,
    saveFunction: () => void,
    isOpen: boolean,
    appointment_data: {
        start: string,
        end: string
    }
}

const CreateAppointmentModal = (props: CreateAppointmentModalProps) => {
    const blankForm = {
        user_id: "",
        service_id: "",
        employee_id: "",
        title: "",
        start: props?.appointment_data?.start,
        end: props?.appointment_data?.end,
        price: "",
        color: "#FFFFF",
        remind_client: true,
        remind_setting: {
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
    }
    const [form, setForm] = useState<AppointmentType>({
        user_id: "",
        service_id: "",
        employee_id: "",
        title: "",
        start: props?.appointment_data?.start,
        end: props?.appointment_data?.end,
        price: "",
        color: "#FFFFF",
        remind_client: true,
        remind_setting: {
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

    useEffect(() => {
        setForm((c) => c && { ...c, start: props?.appointment_data?.start });
        setForm((c) => c && { ...c, end: props?.appointment_data?.end });
    }, [props?.appointment_data?.start, props?.appointment_data?.end]);

    const [clientList, setClientList] = useState<Clients[]>([]);
    const [serviceList, setServiceList] = useState<ServiceType[]>([]);
    const [employeeList, setEmployeeList] = useState<EmployeeDTO[]>([]);

    const servicesTransformed = serviceList.map((element: ServiceType) => ({
        value: element.id,
        label: element.name
    }));

    const clientsTransformed = clientList.map((element) => ({
        value: element.id,
        label: element.name
    }));

    const employeesTransformed = employeeList.map((element) => ({
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
        axios_instance.get('/employees').then(response => {
            setEmployeeList(response.data);
        })
    }

    useEffect(() => {
        myFetchFunc();
    }, [])

    const setServiceForm = (e: SingleValue<{ value: string; label: string; }>) => {
        if (e) {
            const service = serviceList.filter(service => service.id === e.value)[0];
            setForm((c) => c && { ...c, service_id: e.value })
            if (!form.price) {
                setForm((c) => c && { ...c, price: service.price })
            } else {
                if (serviceList.some(service => service.price === form.price)) {
                    setForm((c) => c && { ...c, price: service.price });
                }
            }
            if (!form.title) {
                setForm((c) => c && { ...c, title: e.label });
            } else {
                if (servicesTransformed.some(service => service.label === form.title)) {
                    setForm((c) => c && { ...c, title: e.label });
                }
            }
        }
    }

    const setClientForm = (e: SingleValue<{ value: number; label: string; }>) => {
        if (e) {
            const client = clientList.filter(client => client.id === e.value)[0];
            setForm((c) => c && { ...c, user_id: client.id.toString() });
            setForm((c) => c && { ...c, remind_client: client.settings.receive_sms })
            setForm((c) => c && { ...c, remind_settings: { ...c.remind_setting, remind_day_before: client.settings.sms_remind_day_before } })
            setForm((c) => c && { ...c, remind_settings: { ...c.remind_setting, remind_same_day: client.settings.sms_remind_same_day } })
        }
    }

    const setEmployeeForm = (e: SingleValue<{ value: string; label: string; }>) => {
        if (e) {
            setForm((c) => c && { ...c, employee_id: e.value.toString() });
        }
    }


    
    const saveAppointment = () => {
        axios_instance.post('/appointments', form).then((response) => {
            if (response.status === 200) {
                toast.success('Event succesfully created');
                setForm(blankForm);
                props?.saveFunction();
            }
        })
    }

    return (<>
        <div><Toaster /></div>
        <Dialog.Root open={props.isOpen} >
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
                    <label>Employee</label>
                    <Select onChange={(e) => { setEmployeeForm(e) }} options={employeesTransformed} />
                </div>

                
                <div>
                    <label>Client</label>
                    <Select options={clientsTransformed} onChange={(e) => { setClientForm(e) }} />
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
                                checked={form?.remind_setting?.remind_day_before}
                                onCheckedChange={(checked) => setForm((c) => c && { ...c, remind_settings: { ...c.remind_setting, remind_day_before: checked } })}
                            />
                        </div>
                        <div>
                            <label>Remind same day</label>
                            <Switch
                                checked={form?.remind_setting?.remind_same_day}
                                onCheckedChange={(checked) => setForm((c) => c && { ...c, remind_settings: { ...c.remind_setting, remind_same_day: checked } })}
                            />
                        </div>
                        {/* <div>
                            <label> Remind for upcoming</label>
                            <Switch
                                checked={form?.remind_settings?.remind_for_upcoming}
                                onCheckedChange={(checked) => setForm((c) => c && { ...c, remind_settings: { ...c.remind_settings, remind_for_upcoming: checked } })}
                            />
                        </div> */}
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
                        <Button onClick={() => { saveAppointment() }}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default CreateAppointmentModal