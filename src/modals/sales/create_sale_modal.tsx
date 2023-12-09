import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Text } from "@radix-ui/themes";
import Select, { SingleValue } from 'react-select'
import { PendingSaleDTO } from "../../shared/interfaces/sales.interface";
import { FormEvent, useEffect, useState } from "react";
import { TransformedDataForSelect } from "../../shared/interfaces/select_box.interface";
import { ClientDTO } from "../../services/clients/ClientService";
import axios_instance from "../../config/api_defaults";
import { ItemDTO } from "../../shared/interfaces/item.interface";
import { EmployeeDTO } from "../../shared/interfaces/employees.interface";


interface CreateSaleProps {
    cancelFunction: () => void,
    saveFunction: (form: PendingSaleDTO) => void,
    isOpen: boolean
}

const CreateSaleModal = (props: CreateSaleProps) => {
    const { t } = useTranslation();


    const [form, setForm] = useState<PendingSaleDTO>({
        employee_id: "",
        user_id: "",
        price: "",
        item_id: "",
        note: ""
    });

    const [clientTransformedList, setClientTransformedList] = useState<TransformedDataForSelect[]>();
    const [productTransformedList, setProductTransformedList] = useState<TransformedDataForSelect[]>();
    const [employeeTrasnformedList, setEmployeeTransformedList] = useState<TransformedDataForSelect[]>();



    const transformClientList = (clients: ClientDTO[]) => {
        const transformed = clients.map((element) => ({
            value: element.id,
            label: element.name
        }));
        setClientTransformedList(transformed)
    }

    const transformProductList = (items: ItemDTO[]) => {
        const transformed = items.map((element) => ({
            value: parseInt(element.id),
            label: element.name
        }));
        setProductTransformedList(transformed)
    }

    const transformEmployeeList = (items: EmployeeDTO[]) => {
        const transformed = items.map((element) => ({
            value: parseInt(element.id),
            label: element.name
        }));
        setEmployeeTransformedList(transformed)
    }

    const fetchClients = () => {
        axios_instance().get('/clients').then(response => {
            transformClientList(response.data)
        })
    }
    const fetchEmployees = () => {
        axios_instance().get('/employees').then(response => {
            transformEmployeeList(response.data)
        })
    }

    const fetchProducts = () => {
        axios_instance().get('/items?type=product').then(response => {
            transformProductList(response.data)
        })
    }
    const setClientForm = (e: SingleValue<{ value: number; label: string; }>) => {
        if (e) {
            setForm((c) => c && { ...c, user_id: e.value.toString() });
        }
    }
    const setEmployeeForm = (e: SingleValue<{ value: number; label: string; }>) => {
        if (e) {
            setForm((c) => c && { ...c, employee_id: e.value.toString() });
        }
    }
    const setProductForm = (e: SingleValue<{ value: number; label: string; }>) => {
        if (e) {
            setForm((c) => c && { ...c, item_id: e.value.toString() });
        }
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.saveFunction(form)
    }
    useEffect(() => {
        if (props.isOpen) {
            fetchClients();
            fetchProducts();
            fetchEmployees();
        }

    }, [props.isOpen])
    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{t('sales.create_modal_title')}</Dialog.Title>



                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.item')} <span className="text-red-600">*</span>
                            </Text>
                            <Select
                                required={true}
                                options={productTransformedList}
                                styles={{ container: (provided) => ({ ...provided, zIndex: 9999 }) }}
                                onChange={(e) => setProductForm(e)} />

                        </label>
                    </Flex>


                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.client')} <span className="text-red-600">*</span>
                            </Text>
                            <Select
                                required={true}

                                options={clientTransformedList}
                                styles={{ container: (provided) => ({ ...provided, zIndex: 8888 }) }}
                                onChange={(e) => setClientForm(e)} />

                        </label>
                    </Flex>



                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.price')} <span className="text-red-600">*</span>
                            </Text>
                            <input
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                required={true}
                                type="number" name="price"
                                onChange={(e) => { setForm((c) => c && { ...c, price: e.target.value }) }}
                                value={form.price} id="" />
                        </label>
                    </Flex>


                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.note')}
                            </Text>
                            <TextField.Input
                                value={form.note}
                                onChange={(e) => setForm((c) => c && { ...c, note: e.target.value })}
                            />
                        </label>
                    </Flex>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.employee')}
                            </Text>
                            <Select
                                options={employeeTrasnformedList}
                                styles={{ container: (provided) => ({ ...provided, zIndex: 100 }) }}
                                onChange={(e) => setEmployeeForm(e)} />

                        </label>
                    </Flex>



                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button type="button" onClick={props.cancelFunction} variant="soft" color="gray">
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

export default CreateSaleModal;