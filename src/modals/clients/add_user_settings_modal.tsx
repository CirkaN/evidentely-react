import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FormEvent, useEffect, useState } from "react";
import { t } from "i18next";
import { X } from "react-feather";
import axios_instance from "../../config/api_defaults";
import { AvailableSettingField } from "../../routes/clients/ClientShow";
import { useQueryClient } from "react-query";
import PrefixNumberInput from "../../components/inputs/predefined_prefix";

interface createProps {
    isOpen: boolean,
    user_id: string,
    cancelFunction: () => void,
    type: AvailableSettingField,
    saveFunction: () => void,
}
interface ClientSettings {
    email?: string,
    phone_number?: string,
    address?: string,
    gender?: string,
    birthday?: string,

}
const AddUserSettings = (props: createProps) => {
    const queryClient = useQueryClient();
    const [form, setForm] = useState<ClientSettings>({
        email: "",
        phone_number: "",
        address: "",
        gender: "",
        birthday: "",
    })
    const fetchCurrentSettings = () => {
        axios_instance().get(`/clients/${props.user_id}`).then(r => {
            if (r.data[props.type]) {
                setForm((c) => c && { ...c, [props.type]: r.data[props.type] })
            }
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveForm();
    }
    const saveForm = () => {
        axios_instance().put(`/clients/${props.user_id}`, {
            [props.type]: form[props.type]
        }).then(() => {
            queryClient.invalidateQueries(["client_show_detail"])
            props.cancelFunction()
        });

    }
    const generateProperFormField = () => {
        return (<Flex direction="column" gap="3">
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    {t(`common.${props.type}`)}
                </Text>

                {props.type == 'birthday' ? <TextField.Input
                    value={form[props.type]}
                    type="date"
                    onChange={(e) => setForm((c) => c && { ...c, [props.type]: e.target.value })}
                /> : ''}
                {props.type == 'address' ? <TextField.Input
                    value={form[props.type]}
                    onChange={(e) => setForm((c) => c && { ...c, [props.type]: e.target.value })}
                /> : ''}
                {props.type == 'email' ? <TextField.Input
                    value={form[props.type]}
                    type="email"
                    onChange={(e) => setForm((c) => c && { ...c, [props.type]: e.target.value })}
                /> : ''}

                {props.type == 'phone_number' ?
                    <PrefixNumberInput
                        parseNumber={(number) => { setForm((c) => c && { ...c, [props.type]: number }) }}
                        initial_value={form[props.type]}
                        isRequired={true}
                    /> : ''
                }
            </label>
        </Flex>)
    }
    useEffect(() => {
        if (props.isOpen) {
            fetchCurrentSettings();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen])
    return (
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Flex justify="between">
                    <Dialog.Title>{t('common.change_settings')}</Dialog.Title>
                    <Dialog.Close>
                        <Button variant="ghost" color="gray" onClick={() => props.cancelFunction()}>
                            <X></X>
                        </Button>
                    </Dialog.Close>
                </Flex>

                <form onSubmit={handleSubmit}>
                    {generateProperFormField()}


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
    )
}
export default AddUserSettings