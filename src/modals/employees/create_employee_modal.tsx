import { Button, Dialog, Flex, Switch, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import { EmployeeDTO } from "../../shared/interfaces/employees.interface";
import { t } from "i18next";
import axios_instance from "../../config/api_defaults";
import { useQueryClient } from "react-query";

interface CreateClientProps {
    cancelFunction: () => void;
    isOpen: boolean;
}

const CreateEmployeeModal = (props: CreateClientProps) => {
    const queryClient = useQueryClient();
    const blankForm = {
        id: "",
        name: "",
        email: "",
        gender: "male",
        note: "",
        job_description: "",
        login_enabled: false,
    };
    const defaultFormValues = {
        id: "",
        name: "",
        email: "",
        gender: "male",
        note: "",
        job_description: "",
        login_enabled: false,
    };
    const [form, setForm] = useState<EmployeeDTO>(defaultFormValues);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveRecord();
    };
    const saveRecord = () => {
        axios_instance()
            .post("/employees", form)
            .then(() => {
                queryClient.invalidateQueries({
                    queryKey: ["employees"],
                });
                props.cancelFunction();
                setForm(defaultFormValues);
                setForm(blankForm);
            });
    };
    const isEmailRequired = () => {
        return form.login_enabled;
    };

    return (
        <>
            <Dialog.Root open={props.isOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>{t("common.employee_create")}</Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("employees.full_name")}{" "}
                                    <span className="text-red-500 ">*</span>
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
                                    {t("employees.job_description")}
                                </Text>
                                <TextField.Input
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    job_description:
                                                        e.target.value,
                                                },
                                        )
                                    }
                                    value={form.job_description}
                                />
                            </label>
                        </Flex>

                        <Flex direction="row" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("common.gender")}
                                </Text>
                                <select
                                    name="gender"
                                    className="w-full rounded px-3 py-2 focus:outline-none "
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    gender: e.target.value,
                                                },
                                        )
                                    }
                                    value={form.gender}
                                    id="gender"
                                >
                                    <option value="male">
                                        {t("common.male")}
                                    </option>
                                    <option value="female">
                                        {t("common.female")}
                                    </option>
                                </select>
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("employees.enable_login")}
                                </Text>
                                <Switch
                                    checked={form?.login_enabled}
                                    onCheckedChange={(checked) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    login_enabled: checked,
                                                },
                                        )
                                    }
                                />
                            </label>
                        </Flex>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("common.email")}
                                </Text>
                                <TextField.Input
                                    required={isEmailRequired()}
                                    value={form.email}
                                    type="email"
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    email: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </label>
                        </Flex>

                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t("common.note")}
                                </Text>
                                <TextField.Input
                                    value={form.note}
                                    placeholder="Primer: radi samo drugu smenu / student   "
                                    onChange={(e) =>
                                        setForm(
                                            (c) =>
                                                c && {
                                                    ...c,
                                                    note: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </label>
                        </Flex>

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
                                <Button type="submit">
                                    {t("common.save")}
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default CreateEmployeeModal;
