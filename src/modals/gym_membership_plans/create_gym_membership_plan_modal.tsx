import { FormEvent, useState } from "react";
import { GymMembershipPlanDTO } from "../../shared/interfaces/gym_membership_plan.interface"
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import axios_instance from "../../config/api_defaults";
import { t } from "i18next";
import { useQueryClient } from "react-query";

interface CreateGymMembershipModal {
    closeModalFunction: () => void,
    isOpen: boolean,
}

type PreparedGymMembershipDTO = Omit<GymMembershipPlanDTO, 'id'>

const CreateGymMembershipModal = (props: CreateGymMembershipModal) => {
    const defaultFormValues: PreparedGymMembershipDTO = {
        name: "",
        description: "",
        price: 0,
        duration_months: 1,
    };

    const queryClient = useQueryClient();
    const [form, setForm] = useState<PreparedGymMembershipDTO>(defaultFormValues);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveFunction()
    }
    const saveFunction = () => {
        axios_instance().post('/gym_membership_plans', form).then(() => {
            queryClient.invalidateQueries({
                queryKey: ['gym_memberships'],
            })
            setForm(defaultFormValues);
            props.closeModalFunction();

        })
    }
    return (
        <>
            <Dialog.Root open={props.isOpen} >
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Kreiraj plan clanarine</Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("item.name")}
                                </Text>
                                <TextField.Input
                                    required={true}
                                    onChange={(e) => setForm((c) => c && { ...c, name: e.target.value })}
                                    value={form.name}
                                />
                            </label>
                        </Flex>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("common.description")}
                                </Text>
                                <textarea
                                    className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 border"
                                    onChange={(e) => setForm((c) => c && { ...c, description: e.target.value })}
                                    value={form.description} >

                                </textarea>
                            </label>
                        </Flex>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("item.price")}
                                </Text>
                                <TextField.Input
                                    type="number"
                                    required={true}
                                    onChange={(e) => setForm((c) => c && { ...c, price: parseInt(e.target.value) })}
                                    value={form.price}
                                />
                            </label>
                        </Flex>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("common.duration_months")}
                                </Text>
                                <TextField.Input
                                    type="number"
                                    required={true}
                                    onChange={(e) => setForm((c) => c && { ...c, duration_months: parseInt(e.target.value) })}
                                    value={form.duration_months}
                                />
                            </label>
                        </Flex>


                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button onClick={props.closeModalFunction} variant="soft" color="gray">
                                    {t('common.cancel')}
                                </Button>
                            </Dialog.Close>
                            <Button type="submit" >{t('common.save')}</Button>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root >
        </>
    )
}
export default CreateGymMembershipModal