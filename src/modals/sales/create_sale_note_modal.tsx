import { Dialog, Flex, Button, Text, TextArea } from "@radix-ui/themes";
import { t } from "i18next";
import { SaleNote } from "../../shared/interfaces/sale_note.interface";
import { FormEvent, useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import { useQueryClient } from "react-query";

interface createSaleNoteProps {
    saleId: number;
    isOpen: boolean;
    cancelFunction: () => void;
}

type MyNoteDto = Omit<
    SaleNote,
    "author_id" | "id" | "created_at_human" | "author_name"
>;

const CreateSaleNoteModal = (props: createSaleNoteProps) => {
    const queryClient = useQueryClient();
    const [form, setForm] = useState<MyNoteDto>({
        note: "",
        sale_id: props.saleId,
    });

    useEffect(() => {
        setForm((c) => c && { ...c, sale_id: props.saleId });
    }, [props.saleId]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveCharge();
    };
    const saveCharge = () => {
        axios_instance()
            .post(`/sale/${props.saleId}/notes`, form)
            .then(() => {
                setForm((c) => c && { ...c, note: "" });
                props.cancelFunction();
                queryClient.invalidateQueries({
                    queryKey: ["sale_notes"],
                });
            });
    };

    return (
        <>
            <Dialog.Root open={props.isOpen}>
                <Dialog.Content style={{ maxWidth: 400 }}>
                    <Dialog.Title>{t("common.add_note")}</Dialog.Title>
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
                                                c && {
                                                    ...c,
                                                    note: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button
                                    type="button"
                                    onClick={props.cancelFunction}
                                    variant="soft"
                                    color="gray"
                                >
                                    {t("common.cancel")}
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type="submit">
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
export default CreateSaleNoteModal;
