import { Button, Dialog, Flex, Switch } from "@radix-ui/themes";
import { t } from "i18next";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { X } from "react-feather";
import { useState } from "react";
import { useQueryClient } from "react-query";
interface ApproveExternalAppointmentModalProps {
    isOpen: boolean;
    appointmentId: string | undefined;
    saveFunction: () => void;
    cancelFunction: () => void;
}
const ApproveExternalAppointmentModal = (
    props: ApproveExternalAppointmentModalProps,
) => {
    const [notifyClient, setNotifyClient] = useState(true);
    const queryClient = useQueryClient();
    const raiseAction = (action: "delete" | "approve") => {
        if (action === "delete") {
            axios_instance()
                .post(`/appointments/${props.appointmentId}/decline_external`, {
                    notify_client: notifyClient,
                })
                .then(() => {
                    toast.success("Uspesno obrisan termin");
                    setNotifyClient(true);
                    props.cancelFunction();
                    queryClient.invalidateQueries(["appointment_list"]);
                });
        } else {
            axios_instance()
                .post(`/appointments/${props.appointmentId}/approve_external`, {
                    notify_client: notifyClient,
                })
                .then(() => {
                    toast.success("Uspesno prihvacen termin");
                    setNotifyClient(true);
                    props.cancelFunction();
                    queryClient.invalidateQueries(["appointment_list"]);
                });
        }
    };
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Flex justify="between">
                    <Dialog.Title className="text-center">
                        {t("appointment.decide_external")}
                    </Dialog.Title>
                    <Dialog.Close>
                        <Button
                            variant="ghost"
                            color="gray"
                            onClick={() => props.cancelFunction()}
                        >
                            <X />
                        </Button>
                    </Dialog.Close>
                </Flex>

                <div className="text-center pt-5">
                    <p className="font-bold">
                        Da li zelite da potvrdite ovaj termin?
                    </p>
                    <p className="pt-2">
                        Potvrdom ovog termina, status prelazi u aktivan, ukoliko
                        se odlucite da otkazete ovaj termin, termin ce biti
                        obrisan a vreme ce biti aktivno za zakazivanje!
                    </p>
                </div>

                <div className="flex justify-between pt-5">
                    <div>
                        <label className="font-bold">
                            Obavesti klijenta o ishodu zakazivanja?
                        </label>
                    </div>
                    <div>
                        <Switch
                            checked={notifyClient}
                            onCheckedChange={(checked) => {
                                setNotifyClient(checked);
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-between pt-10">
                    <button
                        onClick={() => {
                            raiseAction("delete");
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Obrisi termin
                    </button>

                    <button
                        onClick={() => {
                            raiseAction("approve");
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Prihvati termin
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default ApproveExternalAppointmentModal;
