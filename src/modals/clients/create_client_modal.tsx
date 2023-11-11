import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { useState } from "react";
import InfoBox, { InfoBoxType } from "../../components/info-box";

interface CreateClientProps {
    cancelFunction: () => void,
    saveFunction: (form: ClientCreateDTO) => void,
    isOpen: boolean
}
export interface ClientCreateDTO {
    name: string,
    gender: string,
    email: string,
    settings: {
        note: string,
        address: string,
        phone_number?: string
    }

}

const CreateClientModal = (props: CreateClientProps) => {

    const [form, setForm] = useState<ClientCreateDTO>({
        name: "",
        gender: "male",
        email: "",
        settings: {
            note: "",
            address: "",
            phone_number: ""
        }
    });


    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Kreiraj klijenta</Dialog.Title>
                <InfoBox fontSize={'text-sm'} text="Ukoliko ne unesete telefon, sms obavestenja nece biti omogucena" headerText="Vazna napomena" type={InfoBoxType.Warning}></InfoBox>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Full name <span className="text-red-600">*</span>
                        </Text>
                        <TextField.Input
                            onChange={(e) => setForm((c) => c && { ...c, name: e.target.value })}
                            value={form.name}

                        />
                    </label>
                </Flex>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Gender
                        </Text>
                        <select name="gender"
                            className="w-full rounded px-3 py-2 focus:outline-none "
                            onChange={(e) => setForm((c) => c && { ...c, gender: e.target.value })}
                            value={form.gender} id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Input
                            value={form.email}
                            onChange={(e) => setForm((c) => c && { ...c, email: e.target.value })}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Address
                        </Text>
                        <TextField.Input
                            value={form.settings.address}

                            onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, address: e.target.value } })}
                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Telefon : <span className="text-sm text-red-400">unesti sa pozivnim (+381 61 5960 755)</span>
                        </Text>
                        <input
                                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"

                        type="number" name="phone_number" onChange={(e) => { setForm((c) => c && { ...c, settings: { ...c.settings, phone_number: e.target.value } }) }} value={form.settings.phone_number} id="" />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Note
                        </Text>
                        <TextField.Input
                            value={form.settings.note}
                            onChange={(e) => setForm((c) => c && { ...c, settings: { ...c.settings, note: e.target.value } })}
                        />
                    </label>
                </Flex>


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
    </>)
}

export default CreateClientModal