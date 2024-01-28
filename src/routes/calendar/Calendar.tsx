import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridWeek from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import axios_instance from "../../config/api_defaults";
import { toast } from "react-hot-toast";
import { EventChangeArg } from "@fullcalendar/core/index.js";
import ShowAppointmentModal from "../../modals/appointments/show_appointment";
import { useQuery, useQueryClient } from "react-query";
import { t } from "i18next";
import useScreenSize from "../../hooks/useScreenSize";
import CreateNewAppointmentModal from "../../modals/appointments/create_new_appointment";
import SweetAlert2 from "react-sweetalert2";

interface AppointmentInterface {
    title: string | undefined;
    start: string;
    end: string;
    price: number | null;
    remind_client: boolean;
}

interface BackendResponse {
    data: dataFromBackend[];
}

interface dataFromBackend {
    id: string;
    title: string | undefined;
    client_name: string;
    start: string;
    end: string;
    price: number | null;
    color: string;
    remind_client: boolean;
    paid_at: string;
}

interface calendarDate {
    title: string;
    start: string | Date;
    end: string | Date;
    price: number | string | null;
    color: string;
    client_name: string;
}

const MyCalendar = () => {
    const screenSize = useScreenSize();
    const [dates, setDates] = useState<calendarDate[]>([]);
    const [isCreateAppointmentModalOpen, setIsCreateAppointmentModalOpen] =
        useState(false);
    const [isShowAppointmentModalOpen, setIsShowAppointmentModalOpen] =
        useState(false);
    const [showAppointmentId, setShowAppointmentId] = useState<string>("");
    const [createAppointmentData, setCreateAppointmentData] =
        useState<AppointmentInterface>({
            title: "",
            start: new Date().toISOString(),
            end: new Date().toISOString(),
            price: 0,
            remind_client: false,
        });
    const [swalProps, setSwalProps] = useState({});

    const nowStart = new Date().toLocaleString();
    const nowEnd = new Date().toLocaleString();
    const queryClient = useQueryClient();

    useQuery({
        queryKey: ["appointment_list"],
        queryFn: () => {
            return axios_instance()
                .get("appointments")
                .then((response) => {
                    mutateDates(response.data);
                });
        },
    });

    const setAppointmentData = (data: AppointmentInterface) => {
        setCreateAppointmentData(data);
    };

    const openAppointmentCreateModal = () => {
        setIsCreateAppointmentModalOpen(true);
    };

    const handleSelect = (start: string, end: string) => {
        const preparedJson: AppointmentInterface = {
            start: start,
            end: end,
            title: "",
            price: null,
            remind_client: true,
        };

        setAppointmentData(preparedJson);
        openAppointmentCreateModal();
    };

    const mutateDates = (dataFromBackend: BackendResponse) => {
        const s = dataFromBackend.data.map((item) => ({
            start: new Date(item.start),
            client_name: item.client_name,
            end: new Date(item.end),
            title: item.title ?? "Nema imena",
            id: item.id,
            price: item.price,
            color: item.color,
            editable: item.paid_at ? false : true,
        }));
        setDates(s);
    };

    const reRenderAppointments = () => {
        setIsCreateAppointmentModalOpen(false);
        setIsShowAppointmentModalOpen(false);
        queryClient.invalidateQueries(["appointment_list"]);
    };

    const closeShowModal = () => {
        setIsShowAppointmentModalOpen(false);
    };

    const gridView = () => {
        if (screenSize.width < 700) {
            return "timeGridDay";
        } else {
            return "timeGridWeek";
        }
    };

    const handleDrop = (start: string, end: string, id: string) => {
        const jsonPrepared = {
            start: start,
            end: end,
            update_via: "drop",
        };

        axios_instance()
            .put("appointments/" + id, jsonPrepared)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(t("toasts.event_succesfully_updated"));
                }
            });
    };
    const handleClick = (id: string) => {
        setShowAppointmentId(id);
        setIsShowAppointmentModalOpen(true);
    };

    const renderEventContent = (
        timeText: string,
        title: string,
        client_name: string,
    ) => {
        return (
            <>
                <p>
                    {timeText}[{client_name}]
                </p>
                <i className="text-md font-semibold ml-1">{title}</i>
            </>
        );
    };
    const handleEventResizeStop = (
        startStr: string,
        endStr: string,
        id: string,
        revert: EventChangeArg,
    ) => {
        setSwalProps({
            show: true,
            icon: "warning",
            title: t("common.please_confirm"),
            text: "Da li ste sigurni da zelite da izmenite trajanje vaseg termina",
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t("common.cancel"),
            confirmButtonText: t("common.change"),
            confirmButtonColor: "red",
            onConfirm: () => {
                updateAppointmentSweet(id, startStr, endStr, revert);
            },
            onResolve: () => {
                setSwalOff();
            },
        });
    };
    const setSwalOff = (revert?: EventChangeArg) => {
        console.log("i am being run");
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
        if (revert) {
            console.log("we are revertging");
        }
    };
    const updateAppointmentSweet = (
        id: string,
        startStr: string,
        endStr: string,
        revert: EventChangeArg | undefined,
    ) => {
        axios_instance()
            .put("appointments/" + id, {
                start: startStr,
                update_via: "drop",
                end: endStr,
            })
            .then((response) => {
                if (response.status === 200) {
                    toast.success(t("toasts.event_succesfully_updated"));
                    setSwalOff(revert);
                }
            });
    };
    return (
        <>
            <SweetAlert2 {...swalProps} />
            <ShowAppointmentModal
                eventUpdated={reRenderAppointments}
                cancelFunction={closeShowModal}
                appointmentId={showAppointmentId}
                isOpen={isShowAppointmentModalOpen}
            ></ShowAppointmentModal>
            <CreateNewAppointmentModal
                appointment_data={createAppointmentData}
                closeModalFunction={reRenderAppointments}
                isOpen={isCreateAppointmentModalOpen}
            />
            <div className="h-screen">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridWeek]}
                    initialView={gridView()}
                    views={{
                        timeGridThreeDays: {
                            type: "timeGrid",
                            duration: { days: 3 },
                            buttonText: "3 dana",
                        },
                    }}
                    buttonText={{
                        today: "Danas",
                        week: "7 dana",
                        day: "Danas",
                    }}
                    headerToolbar={{
                        left: "prev,next",
                        right: "timeGridDay,timeGridThreeDays,timeGridWeek",
                    }}
                    weekends={true}
                    longPressDelay={500}
                    locale="sr-latn"
                    events={dates}
                    editable={true}
                    nowIndicator={true}
                    selectable={true}
                    eventContent={(e) =>
                        renderEventContent(
                            e.timeText,
                            e.event.title,
                            e.event.extendedProps.client_name,
                        )
                    }
                    eventDrop={(e) => {
                        handleDrop(
                            e.event.startStr,
                            e.event.endStr,
                            e.event.id,
                        );
                    }}
                    select={(e) => handleSelect(e.startStr, e.endStr)}
                    eventClick={(e) => handleClick(e.event.id)}
                    eventResize={(e) =>
                        handleEventResizeStop(
                            e.event.startStr,
                            e.event.endStr,
                            e.event.id,
                            e as unknown as EventChangeArg,
                        )
                    }
                />
            </div>
            <div className="fixed bottom-10 right-10 z-50">
                <button
                    onClick={() => handleSelect(nowStart, nowEnd)}
                    className=" bg-white hover:bg-slate-200 text-black border-1 border shadow-xl font-bold py-4 px-6 rounded-full"
                >
                    +
                </button>
            </div>
        </>
    );
};

export default MyCalendar;
