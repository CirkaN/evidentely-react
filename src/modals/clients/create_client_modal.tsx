import { Button, Callout, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import { t } from "i18next";
import PrefixNumberInput from "../../components/inputs/predefined_prefix";
import axios_instance from "../../config/api_defaults";
import { ClientDTO } from "../../shared/interfaces/client.interface";
import { Info } from "react-feather";

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
    const blankForm = {
        name: "",
        gender: "male",
        email: "",
        settings: {
            note: "",
            address: "",
            phone_number: ""
        }
    }
    const [form, setForm] = useState<ClientCreateDTO>(blankForm);

    const [validationErrors, setValidationErrors] = useState<Array<string>>([])

    const saveRecord = () => {
        axios_instance().post('/clients', form).then((r) => {
            if (props.savedClient) {
                props.savedClient(r.data)
            } else {
                props.cancelFunction();
            }
            setForm(blankForm);
        }).catch(e => {
            const errors: Array<string> = []
            Object.keys(e.response.data.errors).forEach(field => {
                errors.push(`Greska: ${e.response.data.errors[field].join(', ')}`);
            });
            setValidationErrors(errors);
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

                <Callout.Root>
                    <Callout.Icon>
                        <Info size={18} />
                    </Callout.Icon>
                    <Callout.Text color="iris">
                        Ukoliko ne unesete telefon, sms obavestenja nece biti omogucena.
                    </Callout.Text>
                </Callout.Root>

                {validationErrors &&
                    validationErrors.map((e) => {
                        return <p key={e} className="text-red-600 p-2 text-center text-md">{e}</p>
                    })
                }

                <form onSubmit={handleSubmit} className="pt-5">

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('common.full_name')}<span className="text-red-600">*</span>
                            </Text>
                            <TextField.Input
                                onChange={(e) => setForm((c) => c && { ...c, name: e.target.value })}
                                value={form.name}
                                required
                            />
                        </label>
                    </Flex>

                    <Flex direction="column" gap="3" className="pt-1">
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



                    <Flex direction="column" gap="3" className="pt-1">
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
                    <Flex direction="column" gap="3" className="pt-1">
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
                    <Flex direction="column" gap="3" className="pt-1">
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
                    <Flex direction="column" gap="3" className="pt-2">
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