import { Button, Dialog, Flex, Switch } from "@radix-ui/themes";
import { t } from "i18next";
import { FormEvent, useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { AppointmentDTO } from "../../shared/interfaces/appointments.interface";
import Select, { SingleValue } from "react-select";
import useTransformedClients from "../../hooks/useClients";
import { TransformedDataForSelect } from "../../shared/interfaces/select_box.interface";
import useTransformedServices from "../../hooks/useServices";
import { ItemDTO } from "../../shared/interfaces/item.interface";
import { ClientDTO } from "../../shared/interfaces/client.interface";
import CreateClientModal from "../clients/create_client_modal";
import { useQueryClient } from "react-query";
import CreateItemModal from "../items/create_item_modal";
import dayjs from "dayjs";
import useEmployees from "../../hooks/useEmployees";
import AddUserSettings from "../clients/add_user_settings_modal";

interface CreateAppointmentModalProps {
    closeModalFunction: () => void;
    isOpen: boolean;
    appointment_data: {
        start: string;
        end: string;
    };
}
const CreateNewAppointmentModal = (props: CreateAppointmentModalProps) => {
    const defaultForm: AppointmentDTO = {
        user_id: "",
        item_id: "",
        employee_id: "",
        due_amount: "",
        title: "",
        status: "pending",
        start: "",
        end: "",
        price: "",
        color: "#56A3A6",
        remind_client: false,
        remind_setting: {
            remind_day_before: false,
            remind_same_day: false,
            remind_now: false,
            remind_for_upcoming: false,
            settings_for_upcoming: {
                date: "",
                custom_text_message: "",
            },
        },
        note: "",
    };
    const [showSettingsForRemind, setShowSettingsForRemind] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const { clientTransformedList, clientList } = useTransformedClients();
    const { serviceTransformedList, serviceList } = useTransformedServices();
    const { employeeTransformedList } = useEmployees();
    const [isCreateClientModalOpen, setIsCreateClientModalOpen] =
        useState(false);
    const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] =
        useState(false);
    const [updateClientPhoneNumber, setUpdateClientPhoneNumber] =
        useState(false);
    const [updateClientProfileModalOpen, setUpdateClientProfileModalOpen] =
        useState(false);

    const queryClient = useQueryClient();
    const [form, setForm] = useState<AppointmentDTO>(defaultForm);

    const defaultSelectedService = {
        label: t("appointment.select_service"),
        value: 0,
    };
    const defaultSelectedClient = {
        label: t("appointment.select_client"),
        value: 0,
    };

    const [selectedClient, setSelectedClient] =
        useState<TransformedDataForSelect>();

    const [selectedService, setSelectedService] =
        useState<TransformedDataForSelect>(defaultSelectedService);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setSubmitButtonDisabled(true);
        e.preventDefault();
        saveAppointment();
    };

    const saveAppointment = () => {
        axios_instance()
            .post("/appointments", form)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(t("toasts.appointment_created"));
                    setForm(defaultForm);
                    setSelectedService(defaultSelectedService);
                    setSelectedClient(defaultSelectedClient);
                    props?.closeModalFunction();
                }
            })
            .catch((e) => {
                e.response.data.errors.text.forEach((element: string) => {
                    toast.error(element);
                });
            })
            .finally(() => {
                setSubmitButtonDisabled(false);
            });
    };

    const setServiceForm = (
        e: SingleValue<{ value: string | number; label: string }>,
    ) => {
        if (e) {
            const myServiceList: Array<ItemDTO> =
                serviceList as unknown as ItemDTO[];
            const service = myServiceList.filter(
                (service) => service.id === e.value,
            )[0];

            if (service.color) {
                setForm((c) => c && { ...c, color: service.color });
            }
            setForm((c) => c && { ...c, item_id: e.value.toString() });

            if (form.price == 0) {
                setForm((c) => c && { ...c, price: service.selling_price });
            }

            if (!form.title) {
                setForm((c) => c && { ...c, title: e.label });
            } else {
                if (
                    serviceTransformedList &&
                    serviceTransformedList.some(
                        (service) => service.label === form.title,
                    )
                ) {
                    setForm((c) => c && { ...c, title: e.label });
                }
            }
            setSelectedService((c) => c && { ...c, label: service.name });
            setSelectedService(
                (c) => c && { ...c, value: parseInt(service.id) },
            );
        }
    };
    const setEmployeeForm = (
        e: SingleValue<{ value: number | string; label: string }>,
    ) => {
        if (e) {
            setForm((c) => c && { ...c, employee_id: e.value.toString() });
        }
    };
    const setClientForm = (
        e: SingleValue<{ value: number | string; label: string }>,
    ) => {
        if (e) {
            const clientListTyped = clientList as unknown as Array<ClientDTO>;
            const client = clientListTyped.filter(
                (client) => client.id === e.value,
            )[0];

            setSelectedClient((c) => c && { ...c, value: e.value });
            setSelectedClient((c) => c && { ...c, label: e.label });

            if (client.settings.phone_number) {
                setShowSettingsForRemind(true);
                setForm(
                    (c) =>
                        c && {
                            ...c,
                            remind_client: client.settings.receive_sms,
                        },
                );
            } else {
                setForm((c) => c && { ...c, remind_client: false });
                setUpdateClientPhoneNumber(true);
            }

            setForm((c) => c && { ...c, user_id: client.id.toString() });
            setForm(
                (c) =>
                    c && {
                        ...c,
                        remind_setting: {
                            ...c.remind_setting,
                            remind_day_before:
                                client.settings.sms_remind_day_before,
                        },
                    },
            );
            setForm(
                (c) =>
                    c && {
                        ...c,
                        remind_setting: {
                            ...c.remind_setting,
                            remind_same_day:
                                client.settings.sms_remind_same_day,
                        },
                    },
            );
        }
    };

    const setActiveClient = (r: ClientDTO) => {
        setSelectedClient((c) => c && { ...c, label: r.name });
        setSelectedClient((c) => c && { ...c, value: r.id });
        setForm((c) => c && { ...c, user_id: r.id.toString() });
    };

    const setClient = (client: ClientDTO) => {
        setIsCreateClientModalOpen(false);
        queryClient.invalidateQueries(["fetch_clients"]);
        setActiveClient(client);
    };

    const setActiveService = (r: ItemDTO) => {
        setSelectedService((c) => c && { ...c, label: r.name });
        setSelectedService((c) => c && { ...c, value: parseInt(r.id) });

        setForm((c) => c && { ...c, color: r.color });
        setForm((c) => c && { ...c, item_id: r.id.toString() });
        if (form.price == 0) {
            setForm((c) => c && { ...c, price: r.price });
        }

        if (!form.title) {
            setForm((c) => c && { ...c, title: r.name });
        }
    };
    const setRemindClient = (checked: boolean) => {
        if (form.user_id && updateClientPhoneNumber) {
            setUpdateClientProfileModalOpen(true);
        } else {
            setForm((c) => c && { ...c, remind_client: checked });
        }
    };
    const saveItemAndInject = (form: ItemDTO) => {
        axios_instance()
            .post("/items", form)
            .then((r) => {
                queryClient.invalidateQueries(["fetch_services"]);
                setIsCreateServiceModalOpen(false);
                setActiveService(r.data);
            });
    };
    const handleSaved = (isSaved: boolean) => {
        setForm((c) => c && { ...c, remind_client: isSaved });
        setUpdateClientPhoneNumber(false);
        setUpdateClientProfileModalOpen(false);
    };

    useEffect(() => {
        if (props.isOpen) {
            setForm(
                (c) =>
                    c && {
                        ...c,
                        start: dayjs(props.appointment_data.start).format(
                            "YYYY-MM-DDTHH:mm",
                        ),
                    },
            );
            setForm(
                (c) =>
                    c && {
                        ...c,
                        end: dayjs(props.appointment_data.end).format(
                            "YYYY-MM-DDTHH:mm",
                        ),
                    },
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen]);

    return (
        <>
            {form.user_id && (
                <AddUserSettings
                    isOpen={updateClientProfileModalOpen}
                    user_id={form.user_id}
                    type="phone_number"
                    custom_message="Da bi ste aktivirali SMS obavestenja, molimo unesite validan telefonski  broj"
                    cancelFunction={() => {
                        handleSaved(false);
                    }}
                    onSave={() => {
                        handleSaved(true);
                    }}
                />
            )}
            <CreateItemModal
                saveFunction={(form) => {
                    saveItemAndInject(form);
                }}
                isOpen={isCreateServiceModalOpen}
                modalType="service"
                cancelFunction={() => {
                    setIsCreateServiceModalOpen(false);
                }}
            />

            <CreateClientModal
                cancelFunction={() => {
                    setIsCreateClientModalOpen(false);
                }}
                savedClient={(savedClient: ClientDTO) => {
                    if (!savedClient.settings.phone_number) {
                        setForm((c) => c && { ...c, remind_client: false });
                    } else {
                        setForm((c) => c && { ...c, remind_client: true });
                    }
                    setClient(savedClient);
                }}
                isOpen={isCreateClientModalOpen}
            />

            <Dialog.Root open={props.isOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title className="text-center">
                        {t("appointment.create_appointment_modal_title")}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <div>
                                <label>
                                    {t("appointment.name")}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    required={true}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    placeholder="Ime usluge"
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    title: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label>
                                    {t("appointment.start")}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    required={true}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 appearance-none"
                                    type="datetime-local"
                                    value={form.start}
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    start: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label>
                                    {t("appointment.end")}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    required={true}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 appearance-none"
                                    type="datetime-local"
                                    value={form.end}
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    end: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <label>{t("appointment.service")}</label>
                                    <p
                                        className="hover:cursor-pointer text-green-700 font-bold pt-1 text-md"
                                        onClick={() => {
                                            setIsCreateServiceModalOpen(true);
                                        }}
                                    >
                                        Dodaj
                                    </p>
                                </div>

                                <Select
                                    value={selectedService}
                                    onChange={(e) => {
                                        setServiceForm(e);
                                    }}
                                    options={serviceTransformedList}
                                />
                            </div>

                            <div>
                                <label>{t("appointment.employee")}</label>
                                <Select
                                    onChange={(e) => {
                                        setEmployeeForm(e);
                                    }}
                                    options={employeeTransformedList}
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <label>
                                        {t("common.client")}{" "}
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <p
                                        className="hover:cursor-pointer text-green-700 font-bold pt-1 text-md"
                                        onClick={() => {
                                            setIsCreateClientModalOpen(true);
                                        }}
                                    >
                                        Dodaj
                                    </p>
                                </div>
                                <Select
                                    required={true}
                                    value={selectedClient}
                                    options={clientTransformedList}
                                    onChange={(e) => {
                                        setClientForm(e);
                                    }}
                                />
                            </div>

                            {form.user_id && (
                                <div className="flex justify-between pl-2 pr-2 pt-2">
                                    <div>
                                        <label>
                                            {t("appointment.remind_client")}{" "}
                                            {form.remind_client}
                                        </label>
                                    </div>
                                    <div>
                                        <Switch
                                            checked={form.remind_client}
                                            onCheckedChange={(checked) => {
                                                setRemindClient(checked);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {form.user_id &&
                                showSettingsForRemind &&
                                form.remind_client && (
                                    <>
                                        <div className="flex justify-between pl-2 pr-2 pt-1">
                                            <div>
                                                <label>
                                                    {t(
                                                        "appointment.remind_day_before",
                                                    )}
                                                </label>
                                            </div>
                                            <div>
                                                <Switch
                                                    checked={
                                                        form?.remind_setting
                                                            ?.remind_day_before
                                                    }
                                                    onCheckedChange={(check) =>
                                                        setForm(
                                                            (c) =>
                                                                c && {
                                                                    ...c,
                                                                    remind_setting:
                                                                        {
                                                                            ...c.remind_setting,
                                                                            remind_day_before:
                                                                                check,
                                                                        },
                                                                },
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between  pl-2 pr-2 pt-1">
                                            <div>
                                                <label>
                                                    {t(
                                                        "appointment.remind_same_day",
                                                    )}
                                                </label>
                                            </div>
                                            <div>
                                                <Switch
                                                    checked={
                                                        form.remind_setting
                                                            .remind_same_day
                                                    }
                                                    onCheckedChange={(check) =>
                                                        setForm(
                                                            (c) =>
                                                                c && {
                                                                    ...c,
                                                                    remind_setting:
                                                                        {
                                                                            ...c.remind_setting,
                                                                            remind_same_day:
                                                                                check,
                                                                        },
                                                                },
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between  pl-2 pr-2 pt-1 pb-2">
                                            <div>
                                                <label>
                                                    {t(
                                                        "appointment.send_confirmation_client",
                                                    )}
                                                </label>
                                            </div>
                                            <div>
                                                <Switch
                                                    checked={
                                                        form.remind_setting
                                                            .remind_now
                                                    }
                                                    onCheckedChange={(check) =>
                                                        setForm(
                                                            (c) =>
                                                                c && {
                                                                    ...c,
                                                                    remind_setting:
                                                                        {
                                                                            ...c.remind_setting,
                                                                            remind_now:
                                                                                check,
                                                                        },
                                                                },
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            <div>
                                <label>
                                    {t("common.price")}{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    required={true}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    value={form.price}
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    price: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>
                            <div className="pt-2 ">
                                <div className="flex items-center">
                                    <label className="pr-2">
                                        {t("appointment.color")}:
                                    </label>
                                    <input
                                        type="color"
                                        onChange={(e) =>
                                            setForm(
                                                (c) =>
                                                    c && {
                                                        ...c,
                                                        color: e.target.value,
                                                    },
                                            )
                                        }
                                        value={form.color}
                                    />
                                </div>
                            </div>
                        </div>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button
                                    onClick={props.closeModalFunction}
                                    variant="soft"
                                    color="gray"
                                >
                                    {t("common.cancel")}
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button
                                    disabled={submitButtonDisabled}
                                    type="submit"
                                >
                                    {t("common.save")}
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};
export default CreateNewAppointmentModal;
