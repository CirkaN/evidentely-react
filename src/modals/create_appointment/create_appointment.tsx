import { Button, Dialog, Flex, Switch, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { useMemo, useState, startTransition, useEffect } from "react";
import "./style.css";
import { matchSorter } from "match-sorter";
import * as Ariakit from "@ariakit/react";
import { Clients, getClientsRecords } from "../../services/clients/ClientService";


interface CreateAppointmentModalProps {
    cancelFunction: () => void,
    saveFunction: (title: string) => void,
    isOpen: boolean
}

const CreateAppointmentModal = (props: CreateAppointmentModalProps) => {

    const [title, setTitle] = useState('')
    const [remindClient, setRemindClient] = useState(false)
    const [price, setPrice] = useState('0');
    const [searchValue, setSearchValue] = useState("");
    const [clientList,setClientList] = useState<Clients[]>([]);


    const myFetchFunc = async () => {
        let clientsResponse = await getClientsRecords();
        if (clientsResponse.data) {
            setClientList(clientsResponse.data)
            console.log(clientsResponse.data);
        }
    }

    useEffect(() => {
        myFetchFunc();
    }, [])
 

    const matches = useMemo(() => {
        return matchSorter(clientList, searchValue, { keys: ['full_name'] }) 
    }, [searchValue]);

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Trigger>
                <Button>Create appointment</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Create Appointment</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Create appointment
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Title
                        </Text>
                        <TextField.Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter event title"
                        />
                    </label>
                </Flex>
                <div className="wrapper">
                    <Ariakit.ComboboxProvider
                        resetValueOnHide
                        setValue={(value) => {
                            startTransition(() => {
                                setSearchValue(value);
                            });
                        }}
                    >
                        <Ariakit.SelectProvider defaultValue="">
                            <Ariakit.SelectLabel>Favorite fruit</Ariakit.SelectLabel>
                            <Ariakit.Select className="button" />
                            <Ariakit.SelectPopover gutter={4} sameWidth className="popover">
                                <div className="combobox-wrapper">
                                    <Ariakit.Combobox
                                        autoSelect
                                        placeholder="Search..."
                                        className="combobox"
                                    />
                                </div>
                                <Ariakit.ComboboxList>

                                    {matches.map((value) => (
                                        <Ariakit.SelectItem
                                            key={value.id}
                                            value={value.full_name}
                                            className="select-item"
                                            render={<Ariakit.ComboboxItem />}
                                        />
                                    ))}
                                </Ariakit.ComboboxList>
                            </Ariakit.SelectPopover>
                        </Ariakit.SelectProvider>
                    </Ariakit.ComboboxProvider>
                </div>


                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Remind Client
                        </Text>
                        <Switch
                            checked={remindClient}
                            onCheckedChange={setRemindClient}
                        />

                    </label>
                </Flex>


                {remindClient && (
                    <h1>hello world</h1>
                )}

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Price
                        </Text>
                        <TextField.Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                        />

                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button onClick={props.cancelFunction} variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={() => { props.saveFunction(title) }}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default CreateAppointmentModal