import { Button, Dialog, Flex, Switch, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { useState } from "react";
import { EmployeeDTO } from "../../shared/interfaces/employees.interface";

interface CreateClientProps {
    cancelFunction: () => void,
    saveFunction: (form:EmployeeDTO) => void,
    isOpen: boolean
}


const CreateEmployeeModal = (props: CreateClientProps) => {

    const [form, setForm] = useState<EmployeeDTO>({
        id:"",
        name:"",
        email:"",
        gender:"male",
        note:"",
        job_description:"",
        login_enabled:false
    });

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Create Employee</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Create employee
                </Dialog.Description>

             <form action="">
             <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Full name
                        </Text>
                        <TextField.Input
                            onChange={(e) => setForm((c) => c && { ...c, name: e.target.value })}
                            value={form.name}

                        />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Job description
                        </Text>
                        <TextField.Input
                            onChange={(e) => setForm((c) => c && { ...c, job_description: e.target.value })}
                            value={form.job_description}

                        />
                    </label>
                </Flex>

                <Flex direction="row" gap="3">

                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Gender
                        </Text>
                        <select name="gender"
                            className="w-full rounded px-3 py-2 focus:outline-none "
                            onChange={(e) => setForm((c) => c && { ...c, gender: e.target.value })}
                            value={form.gender} id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Enable login
                        </Text>
                        <Switch
                           
                                checked={form?.login_enabled}
                                onCheckedChange={(checked) => setForm((c) => c && ({ ...c, login_enabled:checked }))}
                            />
                    </label>
                </Flex>
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Input
                        required={true}
                            value={form.email}
                            onChange={(e) => setForm((c) => c && { ...c, email: e.target.value })}
                        />
                    </label>
                </Flex>
              
                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Note
                        </Text>
                        <TextField.Input
                            value={form.note}
                            onChange={(e) => setForm((c) => c && { ...c, note:e.target.value })}
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
                        <Button type="button" onClick={() => {props.saveFunction(form) }}>Save</Button>
                    </Dialog.Close>
                </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    </>)
}

export default CreateEmployeeModal