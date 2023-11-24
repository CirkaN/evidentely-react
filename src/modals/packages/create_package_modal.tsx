import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import { PackageDTO } from "../../shared/interfaces/package.interface";
import { useTranslation } from "react-i18next";
import Select, { MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated';
import { useQuery, useQueryClient } from "react-query";
import axios_instance from "../../config/api_defaults";


interface ModalProps {
    isOpen: boolean,
    cancelFunction: () => void,
}

interface ServiceListMutated {
    label: string,
    value: string,
}

const CreatePackageModal = (props: ModalProps) => {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const [selectedServices] = useState();
    const [mutatedServiceList, setMutatedServiceList] = useState<Array<ServiceListMutated>>();

    const animatedComponents = makeAnimated();
    useQuery({
        queryKey: ['packageData'], queryFn: () => {
            axios_instance().get('/services/').then(r => {
                mutateData(r.data);
            })
        }
    })

    const mutateData = (data: Array<PackageDTO>) => {
        const s = data.map((e) => {
            return {
                label: e.name,
                value: e.id,
            }
        })
        setMutatedServiceList(s);

    }
    const [form, setForm] = useState<PackageDTO>(
        {
            id: "",
            name: "",
            price: "",
            sale_price: "",
            expiration_date: "",
            description: "",
            service_ids: [],
            expired: false,
        }
    );
    const selecteBoxChange = (e: MultiValue<ServiceListMutated>) => {
        const parsedServiceIds = e.map((e) => {
            return parseInt(e.value);
        })

        setForm((c) => c && { ...c, service_ids: parsedServiceIds })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveForm()
    }
    const saveForm = () => {
        axios_instance().post('/packages/', form).then(() => {
            props.cancelFunction();
            queryClient.invalidateQueries({
                queryKey: ['packages'],
              })
        })

    }
    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 500 }}>
                <Dialog.Title>{t('create_package.modal_title')}</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    {t('create_package.modal_description')}
                </Dialog.Description>

                <form onSubmit={handleSubmit}>
                    <Flex direction="column" >

                        <Text as="div" size="2" mb="1" weight="bold">
                            {t('create_package.name')}
                        </Text>

                        <TextField.Input
                            onChange={(e) => setForm((c) => c && { ...c, name: e.target.value })}
                            value={form.name}
                        />

                    </Flex>

                    <Flex direction="column">
                        <Text as="div" size="2" mb="1" weight="bold">
                            {t('create_package.services')}
                        </Text>
                        <Select required={true}
                            components={animatedComponents}
                            closeMenuOnSelect={false}
                            value={selectedServices}
                            options={mutatedServiceList}
                            isMulti={true}
                            styles={{ container: (provided) => ({ ...provided, zIndex: 9999 }) }}
                            onChange={(e) => { selecteBoxChange(e as ServiceListMutated[]) }} />

                    </Flex>

                    <Flex justify={"between"}>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('create_package.price')}
                            </Text>
                            <TextField.Input
                                required={true}
                                onChange={(e) => setForm((c) => c && { ...c, price: e.target.value })}
                                value={form.price}
                            />
                        </label>
                        <label>
                            <Text color="green" as="div" size="2" mb="1" weight="bold">
                                {t('create_package.sale_price')}
                            </Text>
                            <TextField.Input
                                onChange={(e) => setForm((c) => c && { ...c, sale_price: e.target.value })}
                                value={form.sale_price}

                            />
                        </label>
                    </Flex>

                    <Flex direction="column">

                        <Text as="div" size="2" mb="1" weight="bold">
                            {t('create_package.expires_at')}
                        </Text>
                        <input type="date" name="expiration_date" value={form.expiration_date} onChange={(e) => { setForm((c) => c && { ...c, expiration_date: e.target.value }) }} />

                    </Flex>

                    <Flex direction="column">
                        <Text as="div" size="2" mb="1" weight="bold">
                            {t('create_package.description')}
                        </Text>
                        <TextField.Input
                            onChange={(e) => setForm((c) => c && { ...c, description: e.target.value })}
                            value={form.description}

                        />
                    </Flex>


                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button onClick={props.cancelFunction} variant="soft" color="gray">
                                {t('common.cancel')}
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit">{t('common.save')}</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    </>)
}




export default CreatePackageModal;