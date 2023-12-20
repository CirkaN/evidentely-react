import { Eye, Plus, Trash } from "react-feather";
import Datatable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable"
import { ClientDocumentDTO } from "../../../services/clients/ClientService";
import { useParams } from "react-router-dom";
import AddDocumentModal from "../../../modals/clients/add_document_modal";
import { useState } from "react";
import axios_instance from "../../../config/api_defaults";
import { ClientAttachmentDTO } from "../../../shared/interfaces/client_attachment.interface";
import SweetAlert2 from "react-sweetalert2";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import Gallery, { GalleryItem } from "../../../components/gallery";
import ClientDetailsHeader from "../../../layouts/clients/details_header";

interface MediaResponse {
    file_name: string
}
interface DocumentApiResponse {
    id: string,
    name: string,
    note?: string,
    media: Array<MediaResponse>
    url: string,
}
const ClientDocuments = () => {

    const { id } = useParams();
    const url = `user/${id}/documents?per_page=10`;

    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [isAddAttachmentModalOpen, setIsAddAttachmentModalOpen] = useState(false);
    const [swalProps, setSwalProps] = useState({});

    const [docs, setDocs] = useState<GalleryItem[]>([]);
    const fields: Field[] = [
        {
            name: t('common.note'),
            original_name: "note",
            has_sort: false,
            show: true,
            editable_from_table: false
        },
        {
            name: t('common.uploaded_at'),
            original_name: "carbon_created",
            has_sort: false,
            show: true,
            editable_from_table: false
        },
    ];

    useQuery({
        queryKey: ['client_documents'],
        queryFn: () => {
            axios_instance().get(`user/${id}/documents`).then(response => {
                const data: DocumentApiResponse[] = response.data
                setDocs(mutateResponse(data));
            });
        },
        keepPreviousData: true
    })

    const mutateResponse = (response: DocumentApiResponse[]) => {
        console.log(response)
        return response.map((e) => {
            return { url: e.url, note: e.note, name: e.media[0].file_name, id: e.id }
        })
    }
    const actions: Action<ClientDocumentDTO>[] = [
        {
            type: ActionTypes.Edit,
            icon: <Eye className="text-slate-600" />,
            fn: (client: ClientDocumentDTO) => { openAttachment(client.id) }
        },
        {
            type: ActionTypes.Edit,
            icon: <Trash color="red" />,
            fn: (client: ClientDocumentDTO) => { raiseDeleteAlert(client.id) }
        }

    ]
    const openAttachment = (id: number) => {
        alert(id);
    }
    const raiseDeleteAlert = (id: number) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: t('common.something'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t('common.cancel'),
            confirmButtonText: t('common.delete'),
            confirmButtonColor: "red",
            onConfirm: () => { deleteAttachment(id) },
            onResolve: setSwalOff
        });
    }

    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }

    const deleteAttachment = (id: number) => {
        axios_instance().delete(`/user/documents/${id}`).then(() => {
            queryClient.invalidateQueries({
                queryKey: ['client_documents'],
            })
            toast.success(t('docs.success_delete'));
        })
    }

    const table_actions: TableAction[] = [
        {
            icon: <Plus></Plus>,
            fn: () => { setIsAddAttachmentModalOpen(true) }
        }
    ];


    const cancelModal = () => {
        setIsAddAttachmentModalOpen(false);

    }
    const saveAttachment = (form: ClientAttachmentDTO) => {
        const formData = new FormData();
        if (form.file) {
            formData.append('file', form.file);
        }

        formData.append('name', form.name);
        formData.append('note', form.note)
        formData.append('type', 'image');

        axios_instance().post(`/user/${id}/document`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(() => {
            queryClient.invalidateQueries({
                queryKey: ['client_documents'],
            })
            setIsAddAttachmentModalOpen(false);
        })

    }
    return (
        <>
            <div className="h-screen w-full p-10">
                {id &&
                    <ClientDetailsHeader id={id} active="documents" />}
                <br />

                <SweetAlert2 {...swalProps} />
                <AddDocumentModal isOpen={isAddAttachmentModalOpen} cancelFunction={cancelModal} saveFunction={(form) => saveAttachment(form)} ></AddDocumentModal>
                <Datatable queryKey="client_documents" table_actions={table_actions} actions={actions} fields={fields} url={url} has_actions={true} table_name={t('common.documents')} ></Datatable>
                <Gallery items={docs} />


            </div>
        </>)
}


export default ClientDocuments