import { Button, Dialog, Flex } from "@radix-ui/themes";
import { t } from "i18next";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
interface ApproveExternalAppointmentModalProps {
    isOpen: boolean;
    appointmentId: string | undefined;
    saveFunction: () => void;
    cancelFunction: () => void;
}
const ApproveExternalAppointmentModal = (
    props: ApproveExternalAppointmentModalProps,
) => {
    const raiseAction = (action: "delete" | "approve") => {
        if (action === "delete") {
            axios_instance()
                .delete(`/appointments/${props.appointmentId}`)
                .then(() => {
                    toast.success("Uspesno obrisan termin");
                });
        } else {
            axios_instance()
                .post(`/appointments/${props.appointmentId}/approve_external`)
                .then(() => {
                    toast.success("Uspesno prihvacen termin");
                });
        }
    };
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title className="text-center">
                    {t("appointment.decide_external")}
                </Dialog.Title>
                <div className="text-center">
                    <p className="font-bold">
                        Da li zelite da potvrdite ovaj termin?
                    </p>
                    <p className="pt-2">
                        Potvrdom ovog termina, status prelazi u aktivan, ukoliko
                        se odlucite da otkazete ovaj termin, termin ce biti
                        obrisan a vreme ce biti aktivno za zakazivanje!
                    </p>
                </div>

                <div className="flex justify-between pt-3">
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

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button
                            onClick={() => {
                                props.cancelFunction();
                            }}
                            variant="soft"
                            color="gray"
                        >
                            {t("common.cancel")}
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default ApproveExternalAppointmentModal;
