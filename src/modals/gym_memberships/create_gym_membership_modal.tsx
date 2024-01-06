import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useEffect, useState } from "react";
import { t } from "i18next";
import { GymMembershipDTO } from "../../shared/interfaces/gym_memberships.interface";
import axios_instance from "../../config/api_defaults";
import { useQuery, useQueryClient } from "react-query";
import { GymMembershipPlanDTO } from "../../shared/interfaces/gym_membership_plan.interface";
import { TransformedDataForSelect } from "../../shared/interfaces/select_box.interface";
import Select, { SingleValue } from 'react-select'
import { ClientDTO } from "../../shared/interfaces/client.interface";

interface CreateGymMembershipProps {
    closeModalFunction: () => void,
    isOpen: boolean,
}
type localGymMembershipDTO = Omit<GymMembershipDTO, 'id'>

const CreateGymMembershipModal = (props: CreateGymMembershipProps) => {

    const queryClient = useQueryClient();

    useQuery({
        queryFn: () => { axios_instance().get('/gym_membership_plans').then(r => setAvailableMembershipPlans(r.data)) },
        queryKey: "gym_membership_plans"
    })

    useQuery({
        queryFn: () => { axios_instance().get('/clients').then(r => setClientList(r.data)) },
        queryKey: "clients"
    })

    const defaultForm: localGymMembershipDTO = {
        start_date: new Date().toISOString().split('T')[0],
        gym_membership_plan_id: 0,
        price: 0,
        member_id: 0,
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    }

    const [form, setForm] = useState<localGymMembershipDTO>(defaultForm);
    const [availableMembershipPlans, setAvailableMembershipPlans] = useState<GymMembershipPlanDTO[]>();
    const [transformedPlans, setTransformedPlans] = useState<TransformedDataForSelect[]>();

    const [clientList, setClientList] = useState<ClientDTO[]>()
    const [transformedClients, setTransformedClients] = useState<TransformedDataForSelect[]>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveFunction()

    }
    const saveFunction = () => {
        axios_instance().post('gym_memberships', form).then(r => {
            console.log(r);
            queryClient.invalidateQueries(['gym_memberships'])
        })
    }

    const setMembershipPlan = (e: SingleValue<{ value: string | number; label: string; }>) => {
        if (e && e.value) {
            setForm((c) => c && { ...c, gym_membership_plan_id: e.value })

            const gymPlan = availableMembershipPlans?.find((plan) => plan.id == e.value)
            if (gymPlan?.duration_months) {
                const nextMonthDates = new Date(new Date().setMonth(new Date().getMonth() + gymPlan?.duration_months ? gymPlan?.duration_months : 1)).toISOString().split('T')[0];
                setForm((c) => c && { ...c, end_date: nextMonthDates });
                setForm((c) => c && { ...c, price: gymPlan.price });
            }
        }
    }
    const setClient = (e: SingleValue<{ value: string | number; label: string; }>) => {
        if (e && e.value) {
            setForm((c) => c && { ...c, member_id: e.value })
        }
    }

    const mutateDataForSelectBox = () => {
        if (availableMembershipPlans) {
            const list = availableMembershipPlans.map((element) => ({
                value: element.id,
                label: element.name
            }));
            setTransformedPlans(list);
        }
        if (clientList) {
            const list = clientList.map((element) => ({
                value: element.id,
                label: element.name
            }));
            setTransformedClients(list);
        }
    }
    useEffect(() => {
        if (props.isOpen) {
            mutateDataForSelectBox();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen, clientList])
    useEffect(() => {
        if (props.isOpen && availableMembershipPlans) {
            mutateDataForSelectBox();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen, availableMembershipPlans])
    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{t('gym_memberships.create_membership')}</Dialog.Title>
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t("gym_memberships.plan")} <span className="text-red-600">*</span>
                            </Text>
                            <Select
                                onChange={(e) => { setMembershipPlan(e) }}
                                options={transformedPlans}
                                styles={{ container: (provided) => ({ ...provided, zIndex: 9998 }) }}
                            />

                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t("gym_memberships.client")} <span className="text-red-600">*</span>
                            </Text>
                            <Select
                                onChange={(e) => { setClient(e) }}
                                options={transformedClients}
                                styles={{ container: (provided) => ({ ...provided, zIndex: 5009 }) }}
                            />

                        </label>
                    </Flex>



                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t("gym_memberships.start_date")}
                            </Text>
                            <TextField.Input
                                required={true}
                                type="date"
                                onChange={(e) => setForm((c) => c && { ...c, start_date: e.target.value })}
                                value={form.start_date}
                            />
                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t("gym_memberships.end_date")}
                            </Text>
                            <TextField.Input
                                required={true}
                                type="date"
                                onChange={(e) => setForm((c) => c && { ...c, end_date: e.target.value })}
                                value={form.end_date}
                            />
                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t("gym_memberships.price")}
                            </Text>
                            <TextField.Input
                                type="number"
                                readOnly
                                value={form.price}
                            // value={availableMembershipPlans?.find((plan) => plan.id === form.gym_membership_plan_id)?.price}
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
    </>)
}

export default CreateGymMembershipModal