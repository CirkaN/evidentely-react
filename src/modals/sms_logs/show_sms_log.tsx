import { Button, Dialog, Flex } from "@radix-ui/themes";
import { t } from "i18next";
interface ShowSmsLogModalProps {
    isOpen: boolean;
    smsLog: string;
    closeModal: () => void;
}
const ShowSmsLogModal = (props: ShowSmsLogModalProps) => {
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title className="text-center">Sms Log</Dialog.Title>

                {props.smsLog}
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button
                            onClick={() => {
                                props.closeModal();
                            }}
                            variant="soft"
                            color="gray"
                        >
                            {t("common.close")}
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default ShowSmsLogModal;
