import toast from "react-hot-toast"
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import { AppointmentType } from "../../shared/interfaces/appointments.interface";
import ChargeClientModal from "./charge_client";
import { Save, Trash } from "react-feather";
import SweetAlert2 from "react-sweetalert2";
import { useQueryClient } from "react-query";
import { t } from "i18next";


interface ShowAppointmentModalProps {
    isOpen: boolean,
    appointmentId: string,
    cancelFunction: () => void,
    eventUpdated: () => void,
}

const ShowAppointmentModal = (props: ShowAppointmentModalProps) => {
    const queryClient = useQueryClient();

    const [appointment, setAppointment] = useState<AppointmentType>();
    const [isChargeClientModalOpen, setIsChargeClientModalOpen] = useState(false);
    const [swalProps, setSwalProps] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    const fetchAppointment = () => {
        axios_instance().get(`/appointments/${props.appointmentId}`).then(response => {
            const data = response.data
            data.start = data.start.replace(' ', 'T');
            data.end = data.end.replace(' ', 'T');
            setAppointment(data);
        })
    }
    const updateEvent = () => {
        axios_instance().put(`/appointments/${props.appointmentId}`, appointment).then(() => {
            props.eventUpdated();
        })

    }
    const chargeClient = () => {
        setIsChargeClientModalOpen(true);
    }
    const deleteAppointment = (id: string) => {
        axios_instance().delete(`/appointments/${id}`).then(() => {
            toast.success('event is deleted');
            setShowDelete(true);
            queryClient.invalidateQueries();
        })
    }
    const cancelAppointment = () => {

    }

    const raiseDeleteAlert = (id: string) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: 'Please confirm',
            text: 'This action is unreversible and it will delete employee with  all records associated with him',
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: "Go for it",
            confirmButtonColor: "red",
            onConfirm: () => { deleteAppointment(id) },
            onResolve: setSwalOff
        });
        setShowDelete(true);

    }
    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
        setShowDelete(false);
    }

    useEffect(() => {
        if (props.appointmentId) {
            fetchAppointment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen]);

    return (<>
        {showDelete && <SweetAlert2 {...swalProps} />}
        {!showDelete &&
            <><ChargeClientModal appointment_id={props.appointmentId} cancelFunction={() => { setIsChargeClientModalOpen(false); }} isOpen={isChargeClientModalOpen}></ChargeClientModal><Dialog.Root open={props.isOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Detalji dogadjaja</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        {t('appointment.edit_appointment_description')}
                    </Dialog.Description>

                    <div>
                        <div>
                            <label htmlFor="name">{t('appointment.name')}</label>
                            <input type="text" name="name" id="name"
                                onChange={(e) => { setAppointment((c) => c && { ...c, title: e.target.value }); }}
                                value={appointment?.title}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                        </div>
                        <div>
                            <label htmlFor="start">{t('appointment.start')}</label>
                            <input type="datetime-local" name="start" id="start"
                                onChange={(e) => { setAppointment((c) => c && { ...c, start: e.target.value }); }}
                                value={appointment?.start}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 appearance-none" />
                        </div>
                        <div>
                            <label htmlFor="end">{t('appointment.end')}</label>
                            <input type="datetime-local" name="end" id="end"
                                onChange={(e) => { setAppointment((c) => c && { ...c, end: e.target.value }); }}
                                value={appointment?.end}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 appearance-none" />
                        </div>
                        <div>
                            <label htmlFor="price">{t('common.price')}:</label>
                            <input type="number" name="price" id="price"
                                onChange={(e) => { setAppointment((c) => c && { ...c, price: e.target.value }); }}
                                value={appointment?.price}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                        </div>
                        <div>
                            <label htmlFor="note">{t('common.note')}:</label>
                            <textarea
                                onChange={(e) => { setAppointment((c) => c && { ...c, note: e.target.value }); }}
                                value={appointment?.note ?? ""}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                name="note" id="note"></textarea>
                        </div>
                    </div>



                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button onClick={() => { props.cancelFunction(); }} variant="soft" color="gray">
                                {t('common.cancel')}
                            </Button>
                        </Dialog.Close>

                        <Dialog.Close>
                            <Button color="orange" onClick={() => { cancelAppointment(); }}>{t('appointment.make_missed')}</Button>
                        </Dialog.Close>

                        <Button onClick={() => { chargeClient(); }}>{t('appointment.charge')}</Button>
                        <Dialog.Close>
                            <Button color="red" onClick={() => { raiseDeleteAlert(props.appointmentId); }}><Trash size={20} /></Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button color="green" onClick={() => { updateEvent(); }}><Save size={20} /></Button>
                        </Dialog.Close>

                    </Flex>
                </Dialog.Content>
            </Dialog.Root></>}

    </>)
}

export default ShowAppointmentModal