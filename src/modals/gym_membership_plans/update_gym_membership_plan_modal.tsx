import { FormEvent, useEffect, useState } from "react";
import { GymMembershipPlanDTO } from "../../shared/interfaces/gym_membership_plan.interface";
import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import axios_instance from "../../config/api_defaults";
import { t } from "i18next";
import { useQueryClient } from "react-query";
import InfoBox, { InfoBoxType } from "../../components/info-box";

interface CreateGymMembershipModalProps {
    closeModalFunction: () => void;
    gym_membership_id: number | string;
    isOpen: boolean;
}

type PreparedGymMembershipDTO = Omit<GymMembershipPlanDTO, "id" | "archived">;

const UpdateGymMembershipModal = (props: CreateGymMembershipModalProps) => {
    const defaultFormValues: PreparedGymMembershipDTO = {
        name: "",
        description: "",
        price: 0,
        duration_months: 1,
    };
    const queryClient = useQueryClient();
    const [form, setForm] =
        useState<PreparedGymMembershipDTO>(defaultFormValues);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveFunction();
    };
    const saveFunction = () => {
        axios_instance()
            .put(`/gym_membership_plans/${props.gym_membership_id}`, form)
            .then(() => {
                queryClient.invalidateQueries({
                    queryKey: ["gym_memberships"],
                });
                setForm(defaultFormValues);
                props.closeModalFunction();
            });
    };
    useEffect(() => {
        axios_instance()
            .get(`/gym_membership_plans/${props.gym_membership_id}`)
            .then((r) => {
                setForm(r.data);
            });
    }, [props.isOpen]);
    return (
        <>
            <Dialog.Root open={props.isOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Izmeni plan clanarine</Dialog.Title>

                    <InfoBox
                        headerText="Vazna napomena"
                        type={InfoBoxType.Info}
                        text="Izmene nece biti primenjene na clanarine koje su u toku"
                    />
                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("item.name")}
                                </Text>
                                <TextField.Input
                                    required={true}
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    name: e.target.value,
                                                },
                                        )
                                    }
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
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    description: e.target.value,
                                                },
                                        )
                                    }
                                    value={form.description}
                                ></textarea>
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
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    price: parseInt(
                                                        e.target.value,
                                                    ),
                                                },
                                        )
                                    }
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
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    duration_months: parseInt(
                                                        e.target.value,
                                                    ),
                                                },
                                        )
                                    }
                                    value={form.duration_months}
                                />
                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button
                                    onClick={props.closeModalFunction}
                                    variant="soft"
                                    color="gray"
                                >
                                    {t("common.cancel")}
                                </Button>
                            </Dialog.Close>
                            <Button type="submit">{t("common.save")}</Button>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};
export default UpdateGymMembershipModal;
