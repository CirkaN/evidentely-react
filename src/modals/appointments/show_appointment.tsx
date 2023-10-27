import { Toaster } from "react-hot-toast"
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import { AppointmentType } from "../../shared/interfaces/appointments.interface";


interface ShowAppointmentModalProps {
    isOpen: boolean,
    appointmentId: string,
    cancelFunction: () => void,
    eventUpdated:()=>void,
}

const ShowAppointmentModal = (props: ShowAppointmentModalProps) => {

    const [appointment, setAppointment] = useState<AppointmentType>();
    

    const fetchAppointment = () => {
        axios_instance.get(`/appointments/${props.appointmentId}`).then(response => {
            const data = response.data
            data.start = data.start.replace(' ','T');
            data.end =  data.end.replace(' ','T');
            setAppointment(data);
        })
    }
    const updateEvent = () => {
        axios_instance.put(`/appointments/${props.appointmentId}`, appointment).then(() => {
            props.eventUpdated();
        })
     
    }
    useEffect(() => {
        if (props.appointmentId) {
            fetchAppointment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen]);

    return (<>
        <div><Toaster /></div>

        <Dialog.Root open={props.isOpen} >


            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Detalji dogadjaja</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Izmeni dogadjaj
                </Dialog.Description>

                <div>
                    <div>
                        <label htmlFor="title">Naslov</label>
                        <input type="text" name="title" id="title"
                            onChange={(e) => { setAppointment((c) => c && { ...c, title: e.target.value }) }}
                            value={appointment?.title}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="start">Pocetka</label>
                        <input type="datetime-local" name="start" id="start"
                            onChange={(e) => { setAppointment((c) => c && { ...c, start: e.target.value }) }}
                            value={appointment?.start}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"

                        />
                    </div>
                    <div>
                        <label htmlFor="end">Kraj</label>
                        <input type="datetime-local" name="end" id="end"
                            onChange={(e) => { setAppointment((c) => c && { ...c, end: e.target.value }) }}
                            value={appointment?.end}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"

                        />
                    </div>
                    <div>
                        <label htmlFor="price">Cena:</label>
                        <input type="number" name="price" id="price"
                            onChange={(e) => { setAppointment((c) => c && { ...c, price: e.target.value }) }}
                            value={appointment?.price}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="note">Napomena:</label>
                        <textarea
                            onChange={(e) => { setAppointment((c) => c && { ...c, note: e.target.value }) }}
                            value={appointment?.note ?? ""}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                            name="note" id="note"></textarea>
                    </div>
                </div>



                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button onClick={() => { props.cancelFunction() }} variant="soft" color="gray">
                            Ponisti
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={() => { updateEvent() }}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default ShowAppointmentModal