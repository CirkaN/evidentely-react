import { useParams } from "react-router-dom";
import DataTable, {
    Action,
    ActionTypes,
    Field,
    TableAction,
} from "../../../components/datatable";
import ClientDetailsHeader from "../../../layouts/clients/details_header";
import { t } from "i18next";
import { NoteDTO } from "../../../shared/interfaces/user_notes.interface";
import { Eye, Plus, Trash } from "react-feather";
import { useState } from "react";
import axios_instance from "../../../config/api_defaults";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import SweetAlert2 from "react-sweetalert2";
import AddUserNoteModal from "../../../modals/clients/add_user_note_modal";
type PreparedNoteDTO = Omit<NoteDTO, "created_by">;
const ClientNotes = () => {
    const { id } = useParams();
    const url = `user/${id}/notes?per_page=5`;
    const queryClient = useQueryClient();
    const [swalProps, setSwalProps] = useState({});
    const [showNoteAddModal, setShowNoteAddModal] = useState(false);
    const fields: Field[] = [
        {
            name: t("common.note"),
            editable_from_table: false,
            original_name: "note",
            has_sort: false,
            show: true,
        },
        {
            name: t("common.author"),
            editable_from_table: false,
            original_name: "author_name",
            has_sort: false,
            show: true,
        },
        {
            name: t("common.upload_date"),
            editable_from_table: false,
            original_name: "upload_date",
            has_sort: false,
            show: true,
        },
    ];
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
    ];
    const table_actions: TableAction[] = [
        {
            icon: <Plus />,
            fn: () => {
                setShowNoteAddModal(true);
            },
        },
    ];

    const raiseDeleteAlert = (id: string) => {
        setSwalProps({
            show: true,
            icon: "error",
            title: t("common.please_confirm"),
            text: t("media.delete_attachment"),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t("common.cancel"),
            confirmButtonText: t("common.delete"),
            confirmButtonColor: "red",
            onConfirm: () => {
                deleteNote(id);
            },
            onResolve: setSwalOff,
        });
    };
    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }

    const deleteNote = (note_id: string) => {
        axios_instance()
            .delete(`/user/${id}/notes/${note_id}`)
            .then(() => {
                toast.success(t("media.delete_success"));
                queryClient.invalidateQueries({
                    queryKey: ["client_notes"],
                });
            });
    };
    const saveUserNote = (form: PreparedNoteDTO) => {
        axios_instance()
            .post(`/user/${id}/notes`, form)
            .then(() => {
                setShowNoteAddModal(false);
                toast.success(t("toasts.note_created_succesfully"));
                queryClient.invalidateQueries({
                    queryKey: ["client_notes"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["user_notes_summary"],
                });
            });
    };
    return (
        <div className="h-screen w-full p-10  pt-10 sm:pt-0">
            {id && (
                <>
                    <ClientDetailsHeader id={id} />
                    <AddUserNoteModal
                        saveFunction={(form) => saveUserNote(form)}
                        isOpen={showNoteAddModal}
                        user_id={id}
                        cancelFunction={() => setShowNoteAddModal(false)}
                    />
                </>
            )}

            <br />
            <SweetAlert2 {...swalProps} />
            <DataTable
                has_actions={true}
                fields={fields}
                url={url}
                table_actions={table_actions}
                actions={actions}
                has_search={true}
                table_name={t("common.notes")}
                queryKey="client_notes"
            />
        </div>
    );
};
export default ClientNotes;
