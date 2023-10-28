import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import { ItemDTO } from "../../shared/interfaces/item.interface";

interface CreateClientProps {
    cancelFunction: () => void,
    saveFunction: (form: ItemDTO) => void,
    isOpen: boolean,
    modalType: "service" | "product"
}


const CreateItemModal = (props: CreateClientProps) => {
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
    }

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title> {`Create ${props.modalType}`}</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    {`Create ${props.modalType}`}
                </Dialog.Description>

                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Name
                            </Text>
                            <TextField.Input
                                required={true}
                                onChange={(e) => setForm((c) => c && { ...c, name: e.target.value })}
                                value={form.name}
                            />
                        </label>
                    </Flex>
                    <Flex direction="row" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Price
                            </Text>
                            <TextField.Input
                                type="number"
                                required={true}
                                onChange={(e) => setForm((c) => c && { ...c, price: e.target.value })}
                                value={form.price}

                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Selling Price
                            </Text>
                            <TextField.Input
                                onChange={(e) => setForm((c) => c && { ...c, selling_price: e.target.value })}
                                value={form.selling_price}

                            />
                        </label>
                    </Flex>


                    <Flex direction="row" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Duration
                            </Text>
                            <TextField.Input
                                onChange={(e) => setForm((c) => c && { ...c, duration: e.target.value })}
                                value={form.duration}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Color
                            </Text>
                            <input type="color" name="color" value={form.color} onChange={(e) => { setForm((c) => c && { ...c, color: e.target.value }) }} />
                        </label>
                    </Flex>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Note
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
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Button type="submit" >Save</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    </>)
}

export default CreateItemModal