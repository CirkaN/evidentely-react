
import { useQuery, useQueryClient } from "react-query"
import { Link } from "react-router-dom"
import axios_instance from "../../config/api_defaults"
import { useState } from "react"
import { Trash2 } from "react-feather"
import toast from "react-hot-toast"
import { t } from "i18next"
import SweetAlert2 from "react-sweetalert2"

interface NoteDTO {
  id: string,
  author_id: string,
  author_name: string,
  upload_date: string,
  note: string
}

interface NoteBoxProps {
  id: string
}
const DetailNoteBox = (props: NoteBoxProps) => {
  const [userNotes, setUserNotes] = useState<NoteDTO[]>([]);
  const queryClient = useQueryClient();
  const [swalProps, setSwalProps] = useState({});

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
    axios_instance().delete(`/user/${props.id}/notes/${note_id}`).then(() => {
      toast.success(t('media.delete_success'))
      queryClient.invalidateQueries({ queryKey: ['user_notes_summary'] })
    })
  }
  useQuery({
    queryKey: ['user_notes_summary'],
    queryFn: () => axios_instance().get(`/user/${props.id}/summary_notes`).then(r => setUserNotes(r.data)),
    keepPreviousData: true
  })
  const formattedElements = () => {
    return userNotes.map((e) => (
      <div className="bg-blue-100 p-4 mt-2" key={e.id}>
        <div className="flex justify-between">
          <p className="text-slate-700">{e.note}</p>
          <div>
            <Trash2 className="cursor-pointer" onClick={() => { raiseDeleteAlert(e.id) }} color="red" />
          </div>
        </div>
        <div className="flex ">
          <Link className="text-blue-500 pr-1" to="/">{e.author_name}</Link>
          <p className="text-gray-400"> &#8226; {e.upload_date}</p>
        </div>
      </div>
    ));
  };
  return (
    <>
      <SweetAlert2 {...swalProps} />
      {formattedElements()}
    </>

  );
}
export default DetailNoteBox