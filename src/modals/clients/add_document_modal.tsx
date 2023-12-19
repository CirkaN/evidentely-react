import { Button, Dialog, Flex } from "@radix-ui/themes"
import InfoBox, { InfoBoxType } from "../../components/info-box"
import { useState } from "react";
import { ClientAttachmentDTO } from "../../shared/interfaces/client_attachment.interface";
import { t } from "i18next";


interface createProps {
    isOpen: boolean,
    cancelFunction: () => void,
    saveFunction: (form: ClientAttachmentDTO) => void,

}

const AddDocumentModal = (props: createProps) => {
    const [form, setForm] = useState<ClientAttachmentDTO>({
        name: "",
        note: "",
        file: undefined
    });
    return (
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{t('client_documents.create_modal_title')}</Dialog.Title>
                <InfoBox fontSize={'text-sm'} text={t('client_documents.help_infobox')}
                    headerText={t('common.important_notice')}
                    type={InfoBoxType.Warning}></InfoBox>
                <input
                    type="file"
                    onChange={(e) => { setForm((c) => c && { ...c, file: e.target.files ? e.target.files[0] : undefined }) }}
                />

                <textarea name="note"
                    value={form.note}
                    onChange={(e) => { setForm((c) => c && { ...c, note: e.target.value }) }}
                ></textarea>


                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button onClick={props.cancelFunction} variant="soft" color="gray">
                            {t('common.cancel')}
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={() => { props.saveFunction(form) }}>{t('common.save')}</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root >
    )
}
export default AddDocumentModal