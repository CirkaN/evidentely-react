import axios_instance from "../../config/api_defaults";

export interface ClientDTO {
    id: number,
    name: string
}

interface BackendResponse {
    data: ClientDTO[];
}

export interface Clients {
    id: number,
    name: string
}
export interface ClientDocumentDTO{
    id:number,
    media_url?:string
}
export interface ClientSettings{
    email:string,
    phone_number:string,
    address:string,
    country:string,
    occupation:string,
    receive_sms:boolean,
    receive_emails:boolean,
    sms_remind_day_before:boolean,
    sms_remind_same_day:boolean,
    sms_remind_when_appointment_is_created:boolean,
    sms_send_thank_you_note:boolean,
    sms_send_happy_birthday_note:boolean,
    email_remind_day_before:boolean,
    email_remind_same_day:boolean,
    email_remind_when_appointment_is_created:boolean,
    email_send_thank_you_note:boolean,
    email_send_happy_birthday_note:boolean,
}


type GetClientsSuccessResponse = {
    isOk: true;
    data: Clients[];
    error: null;
}
type getClientsErrorResponse = {
    isOk: false;
    data: null;
    error: string;
}

type getClientResponse = | GetClientsSuccessResponse | getClientsErrorResponse


export const getClientsRecords = async (): Promise<getClientResponse> => {
    try {
        
        const response = await axios_instance.get<BackendResponse>('clients');
        const transformedData: Clients[] = []
        response.data.data.forEach((element: Clients) => {
            transformedData.push(
                {
                    id: element.id,
                    name: element.name
                }

            )
        });

        return {
            isOk: true,
            data: transformedData,
            error: null
        }
    } catch (e) {
        return {
            isOk: false,
            data: null,
            error: (e as Error).message
        }
    }

}