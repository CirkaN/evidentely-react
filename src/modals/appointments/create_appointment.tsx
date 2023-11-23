import { Button, Dialog, Flex, Switch } from "@radix-ui/themes";
import { useState, useEffect, FormEvent } from "react";
import { ClientDTO, Clients } from "../../services/clients/ClientService";
import axios_instance from "../../config/api_defaults";
import { AppointmentType } from "../../shared/interfaces/appointments.interface";
import Select, { SingleValue } from 'react-select'
import { ServiceType } from "../../shared/interfaces/service.interface";
import toast, { Toaster } from "react-hot-toast";
import { EmployeeDTO } from "../../shared/interfaces/employees.interface";
import { Plus } from "react-feather";
import CreateClientModal, { ClientCreateDTO } from "../clients/create_client_modal";

interface CreateAppointmentModalProps {
    cancelFunction: () => void,
    saveFunction: () => void,
    isOpen: boolean,
    appointment_data: {
        start: string,
        end: string
    }
}
interface TransformedDataForSelect {
    value: number,
    label: string
}
const CreateAppointmentModal = (props: CreateAppointmentModalProps) => {
    const blankForm = {
        user_id: "",
        service_id: "",
        employee_id: "",
        due_amount: "",
        title: "",
        start: props?.appointment_data?.start,
        end: props?.appointment_data?.end,
        price: "",
        color: "#00D14D",
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
        due_amount: "",
        start: props?.appointment_data?.start,
        end: props?.appointment_data?.end,
        price: "",
        color: "#00D14D",
        remind_client: true,
        remind_setting: {
            remind_day_before: true,
            remind_same_day: false,
            remind_now: true,
            remind_for_upcoming: false,
            settings_for_upcoming: {
                date: "",
                custom_text_message: "",
            }
        },
        note: "",
    });

    const [clientList, setClientList] = useState<Clients[]>([]);
    const [serviceList, setServiceList] = useState<ServiceType[]>([]);
    const [employeeList, setEmployeeList] = useState<EmployeeDTO[]>([]);
    const [clientTransformedList, setclientTransformedList] = useState<TransformedDataForSelect[]>();
    const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState(false);
    const [hasValidationErrors, setHasValidationErrors] = useState(false);

    const [selectedClient, setSelectedClient] = useState<TransformedDataForSelect>(
        {
            label: "Select Client",
            value: 0,
        }
    );

    const servicesTransformed = serviceList.map((element: ServiceType) => ({
        value: element.id,
        label: element.name
    }));

    const employeesTransformed = employeeList.map((element) => ({
        value: element.id,
        label: element.name
    }));

    const transformClientList = (clients: ClientDTO[]) => {
        const transformed = clients.map((element) => ({
            value: element.id,
            label: element.name
        }));
        setclientTransformedList(transformed)

    }


    const myFetchFunc = () => {
        axios_instance().get('/clients').then(response => {
            setClientList(response.data);

            transformClientList(response.data)
        })
        axios_instance().get('/items').then(response => {
            setServiceList(response.data);
        })
        axios_instance().get('/employees').then(response => {
            setEmployeeList(response.data);
        })
    }

    useEffect(() => {
        myFetchFunc();
    }, [])

    useEffect(() => {
        setForm((c) => c && { ...c, start: props?.appointment_data?.start });
        setForm((c) => c && { ...c, end: props?.appointment_data?.end });
    }, [props?.appointment_data?.start, props?.appointment_data?.end]);

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
            setSelectedClient((c) => c && { ...c, value: e.value });
            setSelectedClient((c) => c && { ...c, label: e.label });
            setForm((c) => c && { ...c, user_id: client.id.toString() });
            setForm((c) => c && { ...c, remind_client: client.settings.receive_sms })
            setForm((c) => c && { ...c, remind_setting: { ...c.remind_setting, remind_day_before: client.settings.sms_remind_day_before } })
            setForm((c) => c && { ...c, remind_setting: { ...c.remind_setting, remind_same_day: client.settings.sms_remind_same_day } })
        }
    }

    const setEmployeeForm = (e: SingleValue<{ value: string; label: string; }>) => {
        if (e) {
            setForm((c) => c && { ...c, employee_id: e.value.toString() });
        }
    }

    const saveAppointment = () => {
        axios_instance().post('/appointments', form).then((response) => {
            if (response.status === 200) {
                toast.success('Event succesfully created');
                setForm(blankForm);
                setHasValidationErrors(false);
                setSelectedClient(
                    {
                        label: "Select Client",
                        value: 0,
                    }
                )
                props?.saveFunction();
            }
        }).catch(() => {
            setHasValidationErrors(true);
        })
    }
    const setActiveClient = (r: ClientDTO) => {
        setSelectedClient((c) => c && { ...c, label: r.name })
        setSelectedClient((c) => c && { ...c, value: r.id })
        setForm((c) => c && { ...c, user_id: r.id.toString() });
    }
    const cancelAction = () => {
        setIsCreateClientModalOpen(false);
    }

    const saveRecord = (form: ClientCreateDTO) => {
        axios_instance().post('/clients', form).then((r) => {
            setIsCreateClientModalOpen(false);
            myFetchFunc();
            setActiveClient(r.data)
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveAppointment()
    }

    return (<>

        <div className="absolute top-0 right-0 p-4 ">
            <Toaster />
        </div>
        <CreateClientModal saveFunction={saveRecord} cancelFunction={cancelAction} isOpen={isCreateClientModalOpen}></CreateClientModal>
        <Dialog.Root open={props.isOpen} >

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Create Appointment</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    {hasValidationErrors &&
                        <p className="text-red-500 text-sm">Molimo unesite klijenta</p>
                    }

                </Dialog.Description>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title <span className="text-red-600">*</span></label>
                        <input
                            required={true}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            placeholder="Title"
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm((c) => c && { ...c, title: e.target.value })} />

                    </div>

                    <div>
                        <label>Usluga</label>
                        <Select onChange={(e) => { setServiceForm(e) }} options={servicesTransformed} />
                    </div>
                    <div>
                        <label>Zaposleni</label>
                        <Select onChange={(e) => { setEmployeeForm(e) }} options={employeesTransformed} />
                    </div>


                    <div>

                        <div className="flex justify-between">
                            <label>Client <span className="text-red-600">*</span></label>
                            <p className="hover:cursor-pointer" onClick={() => { setIsCreateClientModalOpen(true) }}><Plus color="green"></Plus></p>
                        </div>
                        <Select required={true} value={selectedClient} options={clientTransformedList} onChange={(e) => { setClientForm(e) }} />
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
                                    onCheckedChange={(check) => setForm((c) => c && { ...c, remind_setting: { ...c.remind_setting, remind_day_before: check } })}
                                />
                            </div>
                            <div>
                                <label>Remind same day</label>
                                <Switch
                                    checked={form.remind_setting.remind_same_day}
                                    onCheckedChange={(check) => setForm((c) => c && { ...c, remind_setting: { ...c.remind_setting, remind_same_day: check } })}
                                />
                            </div>
                            <div>
                                <label>Send appointment confirmation</label>
                                <Switch
                                    checked={form.remind_setting.remind_now}
                                    onCheckedChange={(check) => setForm((c) => c && { ...c, remind_setting: { ...c.remind_setting, remind_now: check } })}
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
                        <label>Price <span className="text-red-600">*</span></label>
                        <input
                            type="number"
                            required={true}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            value={form.price}
                            onChange={(e) => setForm((c) => c && { ...c, price: e.target.value })} />

                    </div>
                    <div className="pt-2">
                        <label>Boja:</label>
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
                            <Button type="submit" >Sacuvaj</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default CreateAppointmentModal