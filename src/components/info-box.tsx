
interface infoProps {
    headerText: string,
    text: string,
    type: InfoBoxType,
}
// eslint-disable-next-line react-refresh/only-export-components
export enum InfoBoxType {
    Info = 'info',
    Danger = 'danger',
    Warning = 'warning'
}

const InfoBox = (props: infoProps) => {

    if(props.type == 'info'){
        return (<div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p className="font-bold">{props.headerText}</p>
        <p>{props.text}.</p>
    </div>);
    }else if(props.type == 'danger'){
        return (<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">{props.headerText}</p>
        <p>{props.text}.</p>
    </div>);
    }else{
        return (<div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p className="font-bold">{props.headerText}</p>
        <p>{props.text}.</p>
    </div>);
    }


    
}

export default InfoBox;