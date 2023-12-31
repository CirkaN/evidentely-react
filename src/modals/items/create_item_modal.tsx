import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import { ItemDTO } from "../../shared/interfaces/item.interface";
import { t } from "i18next";

interface CreateItemProps {
    cancelFunction: () => void,
    saveFunction: (form: ItemDTO) => void,
    isOpen: boolean,
    modalType: "service" | "product"
}

const CreateItemModal = (props: CreateItemProps) => {

    const blankForm = {
        id: "",
        name: "",
        price: "",
        selling_price: "",
        color: "",
        type: props.modalType,
        duration: "60",
        note: "",
    }

    const [form, setForm] = useState<ItemDTO>({
        id: "",
        name: "",
        price: "",
        selling_price: "",
        color: "",
        type: props.modalType,
        duration: "60",
        note: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.saveFunction(form)
        setForm(blankForm);
    }

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title> {`Kreiraj ${props.modalType}`}</Dialog.Title>
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
                    <Flex direction="row" gap="3">
                        <label className="w-1/2">
                            <Text as="div" size="2" mb="1" weight="bold">
                                {props.modalType === 'product' &&
                                    t('item.base_price')
                                }
                                  {props.modalType !== 'product' &&
                                    t('item.price')
                                }
                            </Text>
                            <TextField.Input
                                type="number"
                                required={true}
                                onChange={(e) => setForm((c) => c && { ...c, price: e.target.value })}
                                value={form.price}

                            />
                        </label>
                        <label className="w-1/2">
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('item.selling_price')}
                            </Text>
                            <TextField.Input
                            required={true}
                                onChange={(e) => setForm((c) => c && { ...c, selling_price: e.target.value })}
                                value={form.selling_price}

                            />
                        </label>
                    </Flex>
                    {props.modalType === 'service' &&
                        <Flex direction="row" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t('item.duration')}
                                </Text>
                                <TextField.Input
                                    onChange={(e) => setForm((c) => c && { ...c, duration: e.target.value })}
                                    value={form.duration}
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t('common.color')}
                                </Text>
                                <input type="color" name="color" value={form.color} onChange={(e) => { setForm((c) => c && { ...c, color: e.target.value }) }} />
                            </label>
                        </Flex>
                    }


                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('common.note')}
                            </Text>
                            <TextField.Input
                                value={form.note}
                                onChange={(e) => setForm((c) => c && { ...c, note: e.target.value })}
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button onClick={props.cancelFunction} variant="soft" color="gray">
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

export default CreateItemModal