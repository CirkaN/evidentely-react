import { Dialog, Flex, Button, Text, TextField } from "@radix-ui/themes";
import { t } from "i18next";
import { FormEvent, useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import { useQueryClient } from "react-query";
import { ChargeSale } from "../../shared/interfaces/charge_sale.interface";

interface createSaleNoteProps {
    saleId: number,
    isOpen: boolean,
    cancelFunction: () => void,
}

const CreateSalePaymentModal = (props: createSaleNoteProps) => {
    const queryClient = useQueryClient();
    const [form, setForm] = useState<ChargeSale>({
        payment_method: "cash",
        amount: 1,
        sale_id: props.saleId,
        reference_id: null,
    });

    useEffect(() => {
        setForm((c) => c && { ...c, sale_id: props.saleId })
    }, [props.saleId])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveCharge()
    }
    const saveCharge = () => {
        axios_instance().post(`/sale/${props.saleId}/charge`, form).then(() => {
            setForm((c) => c && { ...c, note: "" })
            props.cancelFunction()
            setForm((c) => c && { ...c, amount: 0 })
            setForm((c) => c && { ...c, reference_id: null })
            setForm((c) => c && { ...c, payment_method: "cash" })
            queryClient.invalidateQueries({
                queryKey: ['sale_payments'],
            })
            queryClient.invalidateQueries({
                queryKey: ['sales'],
            })
        })
    }

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 400 }}>
                <Dialog.Title>{t('sales.log_sale')}</Dialog.Title>
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.reference')} (<span className="text-sm">{t('sales.what_is_ref_no')}</span>)
                            </Text>
                            <TextField.Input
                                onChange={(e) => setForm((c) => c && { ...c, reference_id: e.target.value })}
                                value={form.reference_id ?? ""}
                            />

                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.paid_amount')}
                            </Text>
                            <input type="number"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                value={form.amount}
                                onChange={(e) => { setForm((c) => c && { ...c, amount: parseInt(e.target.value) }) }}
                            />
                        </label>
                    </Flex>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {t('sales.payment_method')}
                            </Text>
                            <select
                                className="w-full rounded px-3 py-2 focus:outline-none "
                                value={form.payment_method}
                                onChange={(e) => { setForm((c) => c && { ...c, payment_method: e.target.value }) }}>
                                <option value="card">{t('charge.card')}</option>
                                <option value="cash">{t('charge.cash')}</option>
                            </select>

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
export default CreateSalePaymentModal;