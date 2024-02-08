import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useEffect, useState } from "react";
import { ItemDTO } from "../../shared/interfaces/item.interface";
import { useTranslation } from "react-i18next";
import axios_instance from "../../config/api_defaults";

interface EditItemProps {
    cancelFunction: () => void;
    saveFunction: (form: ItemDTO) => void;
    isOpen: boolean;
    modalType: "service" | "product";
    item_id: string;
}

const EditItemModal = (props: EditItemProps) => {
    const { t } = useTranslation();
    const fetchItem = () => {
        axios_instance()
            .get(`/items/${props.item_id}`)
            .then((r) => {
                setForm(r.data);
            });
    };
    useEffect(() => {
        if (props.item_id) {
            fetchItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOpen]);

    const [form, setForm] = useState<ItemDTO>();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form) {
            props.saveFunction(form);
        }
    };

    return (
        <>
            <Dialog.Root open={props.isOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title> {t("common.edit")}</Dialog.Title>
                    {/* <Dialog.Description size="2" mb="4"></Dialog.Description> */}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <div>
                                <label>
                                    <Text
                                        as="div"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                    >
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
                                        value={form?.name}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div>
                                    <label className="w-1/2">
                                        <Text
                                            as="div"
                                            size="2"
                                            mb="1"
                                            weight="bold"
                                        >
                                            {props.modalType === "product" &&
                                                t("item.base_price")}
                                            {props.modalType !== "product" &&
                                                t("item.price")}
                                        </Text>
                                        <TextField.Input
                                            type="number"
                                            required={true}
                                            onChange={(e) =>
                                                setForm(
                                                    (c) =>
                                                        c && {
                                                            ...c,
                                                            price: e.target
                                                                .value,
                                                        },
                                                )
                                            }
                                            value={form?.price}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="w-1/2">
                                        <Text
                                            as="div"
                                            size="2"
                                            mb="1"
                                            weight="bold"
                                        >
                                            {t("item.selling_price")}
                                        </Text>
                                        <TextField.Input
                                            required={true}
                                            onChange={(e) =>
                                                setForm(
                                                    (c) =>
                                                        c && {
                                                            ...c,
                                                            selling_price:
                                                                e.target.value,
                                                        },
                                                )
                                            }
                                            value={form?.selling_price}
                                        />
                                    </label>
                                </div>
                            </div>

                            {props.modalType === "service" && (
                                <div className="flex sm:space-x-10">
                                    <div className="w-1/2">
                                        <label>
                                            <Text
                                                as="div"
                                                size="2"
                                                mb="1"
                                                weight="bold"
                                            >
                                                {t("item.duration")}
                                            </Text>
                                            <TextField.Input
                                                onChange={(e) =>
                                                    setForm(
                                                        (c) =>
                                                            c && {
                                                                ...c,
                                                                duration:
                                                                    e.target
                                                                        .value,
                                                            },
                                                    )
                                                }
                                                value={form?.duration}
                                            />
                                        </label>
                                    </div>

                                    <div className="w-1/2">
                                        <label>
                                            <Text
                                                as="div"
                                                size="2"
                                                className="items-start"
                                                mb="1"
                                                weight="bold"
                                            >
                                                {t("common.color")}
                                            </Text>
                                            <TextField.Input
                                                type="color"
                                                value={form?.color}
                                                onChange={(e) => {
                                                    setForm(
                                                        (c) =>
                                                            c && {
                                                                ...c,
                                                                color: e.target
                                                                    .value,
                                                            },
                                                    );
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label>
                                    <Text
                                        as="div"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                    >
                                        {t("common.description")}
                                    </Text>
                                    <textarea
                                        id="message"
                                        value={form?.description}
                                        onChange={(e) =>
                                            setForm(
                                                (c) =>
                                                    c && {
                                                        ...c,
                                                        description:
                                                            e.target.value,
                                                    },
                                            )
                                        }
                                        rows={4}
                                        className="block p-2.5 w-full text-sm
                                  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    ></textarea>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <Text
                                        as="div"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                    >
                                        {t("common.note")}
                                    </Text>
                                    <TextField.Input
                                        value={form?.note}
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
                            </div>
                        </div>

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
                            <Button type="submit">{t("common.save")}</Button>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default EditItemModal;
