import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { ClientAttachmentDTO } from "../../shared/interfaces/client_attachment.interface";
import { t } from "i18next";
import { X } from "react-feather";

interface createProps {
    isOpen: boolean;
    cancelFunction: () => void;
    saveFunction: (form: ClientAttachmentDTO) => void;
}

const AddDocumentModal = (props: createProps) => {
    const [form, setForm] = useState<ClientAttachmentDTO>({
        name: "",
        note: "",
        file: undefined,
    });
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Flex justify="between">
                    <Dialog.Title>
                        {t("client_documents.create_modal_title")}
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

                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 "
                        htmlFor="file_input"
                    >
                        {t("media.file")}
                    </label>
                    <input
                        onChange={(e) => {
                            setForm(
                                (c) =>
                                    c && {
                                        ...c,
                                        file: e.target.files
                                            ? e.target.files[0]
                                            : undefined,
                                    },
                            );
                        }}
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                    />
                    <p
                        className="mt-1 text-sm text-gray-500 "
                        id="file_input_help"
                    >
                        PNG,JPEG,DOCX,PDF,TXT (MAX. 10MB).
                    </p>
                    <div className="pt-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            {t("common.note")}
                        </label>
                        <textarea
                            name="note"
                            className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 border"
                            value={form.note}
                            onChange={(e) => {
                                setForm(
                                    (c) => c && { ...c, note: e.target.value },
                                );
                            }}
                        ></textarea>
                    </div>
                </div>

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
                        <Button
                            onClick={() => {
                                props.saveFunction(form);
                            }}
                        >
                            {t("common.save")}
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default AddDocumentModal;
