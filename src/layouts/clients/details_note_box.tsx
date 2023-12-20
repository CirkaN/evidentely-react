
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import axios_instance from "../../config/api_defaults"
import { useState } from "react"

interface NoteDTO {
    id:string,
    author_id: string,
    author_name: string,
    upload_date: string,
    note: string
}

interface NoteBoxProps {
    id: string
}
const DetailNoteBox = (props: NoteBoxProps) => {
    const [userNotes,setUserNotes]=useState<NoteDTO[]>([]);
    
   useQuery({
        queryKey: ['user_notes_summary'],
        queryFn: () => axios_instance().get(`/user/${props.id}/summary_notes`).then(r => setUserNotes(r.data)),
        keepPreviousData: true
    })
    const formattedElements = () => {
        return userNotes.map((e) => (
          <div className="bg-blue-100 p-4 mt-2" key={e.id}>
            <div>{e.note}</div>
            <div className="flex ">
              <Link className="text-blue-500 pr-1" to="/">{e.author_name}</Link>
              <p className="text-gray-400"> &#8226; {e.upload_date}</p>
            </div>
          </div>
        ));
      };
    return (
           <>
            {formattedElements()}
            </>
       
    );
}
export default DetailNoteBox