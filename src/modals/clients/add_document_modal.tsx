import { Button, Dialog, Flex } from "@radix-ui/themes"
import InfoBox, { InfoBoxType } from "../../components/info-box"
import { useState } from "react";
import { ClientAttachmentDTO } from "../../shared/interfaces/client_attachment.interface";


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
                <Dialog.Title>Kreiraj klijenta</Dialog.Title>
                <InfoBox fontSize={'text-sm'} text="Ukoliko ne unesete telefon, sms obavestenja nece biti omogucena"
                    headerText="Vazna napomena"
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
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={() => { props.saveFunction(form) }}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root >
    )
}
export default AddDocumentModal