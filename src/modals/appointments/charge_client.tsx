import { Button, Dialog, Flex } from "@radix-ui/themes";
import { CreditCard, DollarSign, Loader, Save } from "react-feather";
import axios_instance from "../../config/api_defaults";
import { FormEvent, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

interface ChargeClientProps {
    isOpen: boolean,
    cancelFunction: () => void,
    appointment_id: string,
}

interface ChargeParams {
    "payment_method": "card" | "cash" | "loan" | undefined,
    "paid_amount": string | number,
    "amount_to_be_paid": string | number
}

const ChargeClientModal = (props: ChargeClientProps) => {
    const queryClient = useQueryClient();
    const [chargeParams, setChargeParams] = useState<ChargeParams>({
        payment_method: undefined,
        paid_amount: 0,
        amount_to_be_paid: 0,
    })

    const { isLoading } = useQuery({
        queryKey: [props.appointment_id],
        queryFn: () => axios_instance().get(`/appointments/${props.appointment_id}`).then(r => {
            setChargeParams((c) => c && { ...c, paid_amount: r.data.paid_amount })
            setChargeParams((c) => c && { ...c, amount_to_be_paid: r.data.due_amount })
        })
    })


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveCharge()
    }
    const saveCharge = () => {
        axios_instance().post(`/appointments/${props.appointment_id}/charge`, chargeParams).then(() => {
            setChargeParams((c) => c && { ...c, paid_amount: 0 })
            queryClient.invalidateQueries();
        })
    }


    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title className="text-center">Naplati</Dialog.Title>
                <p className="text-md text-center p-2">Duguje: {chargeParams.amount_to_be_paid} </p>
                <form onSubmit={handleSubmit} >
                    {
                        !isLoading &&
                        <div className="flex flex-col">
                            <button
                                type="button"
                                onClick={() => { setChargeParams((c) => c && { ...c, payment_method: "cash" }) }}
                                className=" border bg-green-500 text-white">
                                <div className="flex justify-center m"><DollarSign size={22} />
                                    <p className="ml-2">Cash</p>
                                </div>
                            </button>
                            {
                                chargeParams.payment_method == 'cash' &&
                                <input
                                    required={true}
                                    className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-400"
                                    placeholder="Title"
                                    type="number"
                                    min="1"
                                    max={chargeParams.amount_to_be_paid}
                                    value={chargeParams.paid_amount}
                                    onChange={(e) => setChargeParams((c) => c && { ...c, paid_amount: e.target.value })} />
                            }

                            <button
                                type="button"
                                onClick={() => { setChargeParams((c) => c && { ...c, payment_method: "card" }) }}
                                className=" border bg-slate-500 text-white">
                                <div className="flex justify-center m">
                                    <CreditCard size={22} />
                                    <p className="ml-2 text-sm">CARD</p>
                                </div>
                            </button>
                            {
                                chargeParams.payment_method == 'card' &&

                                <input
                                    required={true}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    placeholder="Title"
                                    type="number"
                                    max={chargeParams.amount_to_be_paid}
                                    value={chargeParams.paid_amount}
                                    onChange={(e) => setChargeParams((c) => c && { ...c, paid_amount: e.target.value })} />

                            }
                            <button
                                type="button"
                                onClick={() => { setChargeParams((c) => c && { ...c, payment_method: "loan" }) }}
                                className=" border bg-orange-600 text-white">
                                <div className="flex justify-center m"><Loader size={24} />
                                    <p className="ml-2">Loan</p>
                                </div>
                            </button>
                            {
                                chargeParams.payment_method == 'loan' &&
                                <input
                                    required={true}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                                    placeholder="Title"
                                    type="number"
                                    max={chargeParams.amount_to_be_paid}
                                    value={chargeParams.paid_amount}
                                    onChange={(e) => setChargeParams((c) => c && { ...c, paid_amount: e.target.value })} />
                            }
                        </div>
                    }


                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button onClick={() => { props.cancelFunction() }} variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Button type="submit" color="green">
                            <Save size={20} />
                        </Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    </>)
}

export default ChargeClientModal