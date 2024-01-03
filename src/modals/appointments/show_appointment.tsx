import toast from "react-hot-toast"
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import { AppointmentType } from "../../shared/interfaces/appointments.interface";
import ChargeClientModal from "./charge_client";
import {X } from "react-feather";
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

    const [appointmentMissed, setAppointmentMissed] = useState(false);
    const [appointmentPaid, setAppointmentPaid] = useState(false)

    const [swalProps, setSwalProps] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    const fetchAppointment = () => {
        axios_instance().get(`/appointments/${props.appointmentId}`).then(response => {
            const data = response.data
            data.start = data.start.replace(' ', 'T');
            data.end = data.end.replace(' ', 'T');
            setAppointment(data);

            if (data.status === 'missed') {
                setAppointmentMissed(true);
            }

            if (data.status === 'completed_paid') {
                setAppointmentPaid(true);
            }
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
            toast.success(t('toasts.event_deleted'));
            //setShowDelete(true);
            queryClient.invalidateQueries();
            props.cancelFunction();
        })
    }
    const cancelAppointment = () => {
        axios_instance().post(`/appointments/${props.appointmentId}/missed`).then(() => {
            toast.success("Termin uspesno markiran kao otkazan")
        })
    }

 

    const raiseDeleteAlert = (id: string) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: t('common.delete_appointment_message'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t('common.cancel'),
            confirmButtonText: t('common.accept'),
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
        {<SweetAlert2 {...swalProps} />}
        {!showDelete &&
            <><ChargeClientModal appointment_id={props.appointmentId} cancelFunction={() => { setIsChargeClientModalOpen(false); }} isOpen={isChargeClientModalOpen}></ChargeClientModal>
                <Dialog.Root open={props.isOpen}>
                    <Dialog.Content style={{ maxWidth: 450 }}>
                        <Flex justify="between">
                            <Dialog.Title className="text-slate-800">{t('appointment.details')}</Dialog.Title>
                            <Dialog.Close>
                                <Button variant="ghost" color="gray" onClick={() => props.cancelFunction()}>
                                    <X></X>
                                </Button>
                            </Dialog.Close>
                        </Flex>


                        <div>
                            {appointmentMissed &&
                                <div className=" flex h-12 bg-[#E36414] justify-center p-3" >
                                    <p className="text-white"><b>{t('sales.status')}</b>: Otkazan/Propusten</p>
                                </div>
                            }
                            {appointmentPaid &&
                                <div className=" flex h-12 bg-[#65B741] justify-center p-3" >
                                    <p className="text-white"><b>{t('sales.status')}</b>: Uplaceno</p>
                                </div>
                            }
                            {appointment?.status === 'completed_unpaid' &&

                                <div className=" flex h-12 bg-[#9BB8CD] justify-center p-3" >
                                    <p className="text-white"><b>{t('sales.status')}</b>: Nenaplacen</p>
                                </div>
                            }
                            {appointment?.status === 'pending' &&

                                <div className=" flex h-12 bg-[#114062] justify-center p-3" >
                                    <p className="text-white"><b>{t('sales.status')}</b>:Na cekanju</p>
                                </div>
                            }

                            <div className="pt-2">
                                <label htmlFor="name">{t('common.client')}</label>
                                <input type="text" name="name" id="name"
                                    onChange={(e) => { setAppointment((c) => c && { ...c, title: e.target.value }); }}
                                    value={appointment?.title}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
                            </div>
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



                        <Flex gap="3" mt="4" justify="end" className="flex-col ">
                            <Dialog.Close>
                                <Button disabled={appointmentMissed} className="w-full" color="orange" onClick={() => { cancelAppointment(); }}>{t('appointment.make_missed')}</Button>
                            </Dialog.Close>
                            <Button disabled={appointmentPaid} className="w-full" onClick={() => { chargeClient(); }}>{t('appointment.charge')}</Button>
                        </Flex>

                        <Flex className="pt-1">
                            <Dialog.Close >
                                <Button className="grow" color="red" onClick={() => { raiseDeleteAlert(props.appointmentId); }}>{t('common.delete_appointment')}</Button>
                            </Dialog.Close>
                            <Dialog.Close className="">
                                <Button className="grow ml-1" color="green" onClick={() => { updateEvent(); }}>{t('common.save_appointment')}</Button>
                            </Dialog.Close>
                        </Flex>


                    </Dialog.Content>
                </Dialog.Root></>}

    </>)
}

export default ShowAppointmentModal