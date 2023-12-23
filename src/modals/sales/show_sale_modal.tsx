import { Dialog, Flex, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios_instance from "../../config/api_defaults";
import { SaleNote } from "../../shared/interfaces/sale_note.interface";
import CreateSaleNoteModal from "./create_sale_note_modal";
import { Plus, Trash } from "react-feather";
import toast from "react-hot-toast";
import CreateSalePaymentModal from "./create_sale_payment_modal";
import DataTable, { Field, TableAction } from "../../components/datatable";
import { SaleInfo } from "../../shared/interfaces/sales.interface";


interface showSaleModalProps {
    saleId: number,
    isOpen: boolean,
    cancelFunction: () => void,
}

const ShowSaleModal = (props: showSaleModalProps) => {
    const [saleNotes, setSaleNotes] = useState<SaleNote[]>([])
    const [sale, setSale] = useState<SaleInfo>();

    // const [swalProps, setSwalProps] = useState({});
    const [isAddNoteActive, setIsAddNoteActive] = useState(false);
    const [isPaymentModalActive, setIsPaymentModalActive] = useState(false);
    const { t } = useTranslation();

    const { refetch } = useQuery({
        queryKey: ['sale_notes'],
        queryFn: () => axios_instance().get(`/sale/${props.saleId}/notes`).then(r => setSaleNotes(r.data)),
        enabled: true
    })
    useQuery({
        queryKey: ['sale_data'],
        queryFn: () => axios_instance().get(`/sales/${props.saleId}`).then(r => setSale(r.data))
    })

    const fields: Field[] = [
        {
            name: t('sales.payment_method'),
            editable_from_table: false,
            original_name: "payment_method",
            has_sort: true,
            show: true
        },
        {
            name: t('sales.reference'),
            editable_from_table: false,
            original_name: "reference_id",
            has_sort: true,
            show: true,
        },
        {
            name: t('sales.paid_amount'),
            editable_from_table: false,
            original_name: "amount",
            has_sort: true,
            show: true,
        },

    ]

    const deleteNote = (id: string) => {
        axios_instance().delete(`/sale_notes/${id}`).then(r => {
            console.log(r);
            toast.success(t('toasts.sale_note_delete_successfully'));
            refetch();
        })
    }
    const table_actions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => { setIsPaymentModalActive(true) }
        }
    ];

    const raiseDelete = (id: string) => {
        deleteNote(id)
        // setSwalProps({
        //     show: true,
        //     icon: 'error',
        //     title: t('common.please_confirm'),
        //     text: t('media.delete_attachment'),
        //     cancelButtonColor: "green",
        //     reverseButtons: true,
        //     showCancelButton: true,
        //     showConfirmButton: true,
        //     cancelButtonText: t('common.cancel'),
        //     confirmButtonText: t('common.delete'),
        //     confirmButtonColor: "red",
        //     onConfirm: () => { deleteNote(id) },
        //     onResolve: setSwalOff
        // });
    }
    // function setSwalOff() {
    //     const dataCopied = JSON.parse(JSON.stringify(swalProps));
    //     dataCopied.show = false;
    //     setSwalProps(dataCopied);
    // }
    useEffect(() => {
        if (props.isOpen) {
            refetch();
        }
    }, [props.isOpen])
    const formatCurrency = (t: string) => {
        const s = new Intl.NumberFormat('sr-RS', {
            style: 'currency',
            currency: 'RSD',
        });
        return s.format(parseInt(t));
    }

    return (<>

        <CreateSaleNoteModal
            isOpen={isAddNoteActive}
            saleId={props.saleId}
            cancelFunction={() => { setIsAddNoteActive(false) }}
        />
        <CreateSalePaymentModal
            isOpen={isPaymentModalActive}
            saleId={props.saleId}
            cancelFunction={() => { setIsPaymentModalActive(false) }}
        />


        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 800 }}>
                <Dialog.Title>{t('sales.show_modal_title')}</Dialog.Title>
                <div>
                    <div className="flex flex-col justify-evenly sm:flex-row text-center  ">
                        <div className="pr-5">
                            <p className="font-bold text-xl text-slate-800">{t('sales.about_sale')}:</p>
                            <p>{t('sales.sold_to')}: <b>{sale?.sold_to_name}</b></p>
                            <p>{t('sales.date_of_sale')}: <b>{sale?.sold_time_human}</b></p>
                            {/* <p>{t('sales.sold_pieces')}: <b>10</b></p>
                            <p>{t('sales.price_per_item')}: <b>29RSD</b></p> */}

                        </div>
                        <div className="pr-5">
                            <p className="font-bold text-xl text-slate-800">{t('sales.info')}:</p>
                            <p>{t('sales.sold_for_amount')}: <span className="text-green-700">{formatCurrency(sale?.price ?? "")}</span> </p>
                            <p>{t('sales.paid_to_date')}:{formatCurrency(sale?.total_paid ?? "")} </p>
                            <p>{t('sales.left_for_pay')}: {formatCurrency(sale?.pending_amount ?? "")}</p>
                        </div>
                        <div>
                            <p className="font-bold text-xl text-green-700">{t('sales.quick_statistic')}:</p>
                            <p>{t('sales.estimated_profit')}: <span className="text-green-700">{formatCurrency(sale?.expected_profit ?? "")}</span> </p>
                            <p>{t('sales.expense')}: <span className="text-red-600">{formatCurrency(sale?.item?.price ?? "")}</span> </p>
                            {/* <p>{t('sales.pieces_left')}: 15 kom</p> */}
                        </div>
                    </div>

                </div>
                <div className="pt-5">
                    <div className="pb-2">
                        <p className="text-xl font-semibold text-slate-800">{t('common.notes')}:
                            <button onClick={() => { setIsAddNoteActive(true) }} className="text-green-700 text-2xl">+</button></p>
                    </div>
                    <div className="flex flex-wrap">
                        {
                            saleNotes.map((e: SaleNote) => {
                                return (
                                    <div key={e.id} className=" w-1/2 rounded-lg mb-2 ">

                                        <div className="bg-blue-200 p-5 mr-2">

                                            <div className="flex justify-between">
                                                <div>
                                                    <p>
                                                        {e.note}
                                                    </p>
                                                </div>

                                                <div>
                                                    <Trash color="red" onClick={() => raiseDelete(e.id)} className="text-end cursor-pointer" />
                                                </div>
                                            </div>
                                            <div className="">
                                                <p>{e.author_name} @ {e.created_at_human}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="pt-5">
                    <div className="pb-2">
                        <p className="text-xl font-semibold text-slate-800">{t('sales.payments_subject')}:</p>
                    </div>
                    <div className="">
                        <DataTable
                            table_name={t('sales.payments_subject')}
                            queryKey="sale_payments"
                            url={`sale/${props.saleId}/charges?paginate_by=5`}
                            has_actions={false}
                            table_actions={table_actions}
                            fields={fields}
                            has_search={true}
                        />
                    </div>
                </div>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button type="button" onClick={props.cancelFunction} variant="soft" color="gray">
                            {t('common.cancel')}
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={props.cancelFunction} type="button">{t('common.save')}</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root >

    </>)
}
export default ShowSaleModal;