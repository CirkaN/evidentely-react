import { Button, Dialog, Flex, Text, TextArea } from "@radix-ui/themes";
import { FormEvent, useEffect, useState } from "react";
import { t } from "i18next";
import { NoteDTO } from "../../shared/interfaces/user_notes.interface";
import { X } from "react-feather";

interface createProps {
    isOpen: boolean;
    user_id: string;
    cancelFunction: () => void;
    saveFunction: (form: PreparedNoteDTO) => void;
}
type PreparedNoteDTO = Omit<NoteDTO, "created_by">;
const AddUserNoteModal = (props: createProps) => {
    const [form, setForm] = useState<PreparedNoteDTO>({
        note: "",
        user_id: props.user_id,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.saveFunction(form);
        setForm((c) => c && { ...c, note: "" });
    };
    useEffect(() => {
        if (props.isOpen) {
            setForm((c) => c && { ...c, user_id: props.user_id });
        }
    }, [props.isOpen]);
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Flex justify="between">
                    <Dialog.Title>{t("common.add_note")}</Dialog.Title>
                    <Dialog.Close>
                        <Button
                            variant="ghost"
                            color="gray"
                            onClick={() => props.cancelFunction()}
                        >
                            <X></X>
                        </Button>
                    </Dialog.Close>
                </Flex>

                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t("common.note")}
                            </Text>
                            <TextArea
                                value={form.note}
                                onChange={(e) =>
                                    setForm(
                                        (c) =>
                                            c && { ...c, note: e.target.value },
                                    )
                                }
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button
                                onClick={props.cancelFunction}
                                variant="soft"
                                color="gray"
                            >
                                {t("common.cancel")}
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit">{t("common.save")}</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default AddUserNoteModal;
