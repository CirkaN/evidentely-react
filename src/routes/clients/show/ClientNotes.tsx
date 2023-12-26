import { useParams } from "react-router-dom"
import DataTable, { Action, ActionTypes, Field } from "../../../components/datatable"
import ClientDetailsHeader from "../../../layouts/clients/details_header"
import { t } from "i18next";
import { NoteDTO } from "../../../shared/interfaces/user_notes.interface";
import { Eye, Trash } from "react-feather";
import { useState } from "react";
import axios_instance from "../../../config/api_defaults";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import SweetAlert2 from "react-sweetalert2";

const ClientNotes = () => {
    const { id } = useParams();
    const url = `user/${id}/notes?per_page=5`
    const queryClient = useQueryClient();
    const [swalProps, setSwalProps] = useState({});
    const fields: Field[] = [
        {
            name: t('common.note'),
            editable_from_table: false,
            original_name: "note",
            has_sort: false,
            show: true
        },
        {
            name: t('common.author'),
            editable_from_table: false,
            original_name: "author_name",
            has_sort: false,
            show: true
        },
        {
            name: t('common.upload_date'),
            editable_from_table: false,
            original_name: "upload_date",
            has_sort: false,
            show: true
        },
    ]
    const actions: Action<NoteDTO>[] = [
        {
            type: ActionTypes.Show,
            icon: <Eye color="lightblue"></Eye>,

        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red"></Trash>,
            fn: (r: NoteDTO) => raiseDeleteAlert(r.id as string),

        },
    ]

    const raiseDeleteAlert = (id: string) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: t('media.delete_attachment'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t('common.cancel'),
            confirmButtonText: t('common.delete'),
            confirmButtonColor: "red",
            onConfirm: () => { deleteNote(id) },
            onResolve: setSwalOff
        });
    }
    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }

    const deleteNote = (note_id: string) => {
        axios_instance().delete(`/user/${id}/notes/${note_id}`).then(() => {
            toast.success(t('media.delete_success'))
            queryClient.invalidateQueries({
                queryKey: ['client_notes'],
            })
        })
    }
    return (

        <div className="h-screen w-full p-10">
            {id &&
                <ClientDetailsHeader id={id} />}
            <br />
            <SweetAlert2 {...swalProps} />
            <DataTable
                has_actions={true}
                fields={fields}
                url={url}
                actions={actions}
                has_search={true}
                table_name={t('common.notes')}
                queryKey="client_notes"
            />
        </div>)
}
export default ClientNotes