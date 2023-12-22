import { SaleNote } from "../../../shared/interfaces/sale_note.interface";

interface SaleBoxProps {
    sale_note: SaleNote
}
const SaleNoteBox = (props: SaleBoxProps) => {
    return (
        <>
            <div>
                <p>
                    {props.sale_note.note}
                </p>
            </div>
            <div>
                <p>{props.sale_note.author_name} @ {props.sale_note.created_at_human}</p>
            </div>

        </>
    )
}
export default SaleNoteBox;