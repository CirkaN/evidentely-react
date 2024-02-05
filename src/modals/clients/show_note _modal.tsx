import { Button, Dialog, Flex } from "@radix-ui/themes";
import { t } from "i18next";
import { X } from "react-feather";
interface ShowNoteModalProps {
    isOpen: boolean;
    note: string;
    closeModal: () => void;
}
const ShowNoteModal = (props: ShowNoteModalProps) => {
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Flex justify="between">
                    <Dialog.Title className="text-center">Note</Dialog.Title>
                    <Dialog.Close>
                        <Button
                            variant="ghost"
                            color="gray"
                            onClick={() => props.closeModal()}
                        >
                            <X />
                        </Button>
                    </Dialog.Close>
                </Flex>

                {props.note}
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
export default ShowNoteModal;
