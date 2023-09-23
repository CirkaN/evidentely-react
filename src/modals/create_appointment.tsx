import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { useState } from "react";

interface CreateAppointmentModalProps {
    cancelFunction: () => void,
    saveFunction: Function,
    isOpen: boolean
}


const CreateAppointmentModal = (props: CreateAppointmentModalProps) => {

    const [title, setTitle] = useState<string>('')

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Make changes to your profile.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter event name"
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
                        <Button onClick={()=>{props.saveFunction(title)}}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default CreateAppointmentModal