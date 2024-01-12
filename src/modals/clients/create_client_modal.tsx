import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import InfoBox, { InfoBoxType } from "../../components/info-box";
import { t } from "i18next";
import PrefixNumberInput from "../../components/inputs/predefined_prefix";
import axios_instance from "../../config/api_defaults";
import { ClientDTO } from "../../shared/interfaces/client.interface";

interface CreateClientProps {
    cancelFunction: () => void,
    savedClient?: (savedClient: ClientDTO) => void,
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

    const saveRecord = () => {
        axios_instance().post('/clients', form).then((r) => {
            if (props.savedClient) {
                props.savedClient(r.data)
            }else{
                props.cancelFunction();
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveRecord();
    }


    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>
                    {t('client.create_client')}
                </Dialog.Title>
                <InfoBox fontSize={'text-sm'} text="Ukoliko ne unesete telefon, sms obavestenja nece biti omogucena" headerText="Vazna napomena" type={InfoBoxType.Warning}></InfoBox>

                <form onSubmit={handleSubmit}>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('common.full_name')}<span className="text-red-600">*</span>
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
                                {t('common.gender')}
                            </Text>
                            <select name="gender"
                                className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                onChange={(e) => setForm((c) => c && { ...c, gender: e.target.value })}
                                value={form.gender} id="gender">
                                <option value="male">{t('common.male')}</option>
                                <option value="female">{t('common.female')}</option>
                            </select>
                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('common.email')}
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
                                {t('common.address')}
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
                                {t('common.phone_number')}:
                            </Text>
                            <PrefixNumberInput
                                isRequired={false}
                                parseNumber={(number) => setForm((c) => c && { ...c, settings: { ...c.settings, phone_number: number } })}
                            />
                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('common.note')}
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
                                {t('common.cancel')}
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit">{t('common.save')}</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    </>)
}

export default CreateClientModal