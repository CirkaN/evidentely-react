import { Button, Dialog, Flex, TextArea } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Text } from "@radix-ui/themes";
import Select, { SingleValue } from 'react-select'
import { PendingSaleDTO } from "../../shared/interfaces/sales.interface";
import { FormEvent, useEffect, useState } from "react";
import { TransformedDataForSelect } from "../../shared/interfaces/select_box.interface";

import axios_instance from "../../config/api_defaults";
import { ItemDTO } from "../../shared/interfaces/item.interface";
import { EmployeeDTO } from "../../shared/interfaces/employees.interface";
import { ClientDTO } from "../../shared/interfaces/client.interface";


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
        paid_at: "",
        note: "",
        paid_via: "",
        sale_made_at: new Date().toISOString().split('T')[0],
    });

    const [clientTransformedList, setClientTransformedList] = useState<TransformedDataForSelect[]>();
    const [productTransformedList, setProductTransformedList] = useState<TransformedDataForSelect[]>();
    const [employeeTrasnformedList, setEmployeeTransformedList] = useState<TransformedDataForSelect[]>();
    const [itemList, setItemList] = useState<ItemDTO[]>();

    const transformClientList = (clients: ClientDTO[]) => {
        const transformed = clients.map((element) => ({
            value: element.id,
            label: element.name
        }));
        setClientTransformedList(transformed)
    }

    const transformProductList = (items: ItemDTO[]) => {
        setItemList(items);
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
            if (itemList) {
                const item = itemList.find((item) => item.id == e.value.toString())
                setForm((c) => c && { ...c, price: item?.selling_price ?? "0" })
            }

            setForm((c) => c && { ...c, item_id: e.value.toString() });

        }
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.saveFunction(form)
        setForm((c) => c && { ...c, paid_via: "" });
        setForm((c) => c && { ...c, paid_at: "" });
        setForm((c) => c && { ...c, price: "" });
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
            <Dialog.Content style={{ maxWidth: 600 }}>
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


                    <Flex direction="row" gap="3">
                        <div className="w-1/2">
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
                        </div>
                        <div className="w-1/2">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t('sales.date_of_sale')}
                                </Text>
                                <input
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    type="date"
                                    onChange={(e) => { setForm((c) => c && { ...c, sale_made_at: e.target.value }) }}
                                    value={form.sale_made_at} />
                            </label>
                        </div>
                    </Flex>

                    <Flex direction="row" gap="3" >
                        <div className="w-1/2">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t('sales.for_pay')} <span className="text-red-600">*</span>
                                </Text>
                                <input
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    required={true}
                                    type="number" name="price"
                                    onChange={(e) => { setForm((c) => c && { ...c, price: e.target.value }) }}
                                    value={form.price} id="" />
                            </label>
                        </div>
                        <div className="w-1/2">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t('sales.charge_date')} ({t('sales.only_if_its_paid')})
                                </Text>
                                <input
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    type="date"
                                    onChange={(e) => { setForm((c) => c && { ...c, paid_at: e.target.value }) }}
                                    value={form.paid_at} />
                            </label>
                        </div>

                    </Flex>

                    {form.paid_at &&
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">
                                    {t('sales.paid_via_create')}
                                </Text>
                                <select id="paid_via"
                                    value={form.paid_via}
                                    onChange={(e) => setForm((c) => c && { ...c, paid_via: e.target.value })}
                                    name="paid_via"
                                    className="block appearance-none w-full bg-white  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ">
                                    <option value="cash">{t('charge.cash')}</option>
                                    <option value="card">{t('charge.card')}</option>
                                </select>
                            </label>
                        </Flex>}


                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.note')}
                            </Text>
                            <TextArea
                                value={form.note}
                                onChange={(e) => setForm((c) => c && { ...c, note: e.target.value })} />
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