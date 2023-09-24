import axios_instance from "../../config/api_defaults";

interface ClientDTO {
    id: number,
    full_name: string
}

interface BackendResponse {
    data: ClientDTO[];
}

export interface Clients {
    id: number,
    full_name: string
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


// const getClientDetails(id:number) = async (): Promise<getClientResponse> => {
//     try {


//         const response = await axios_instance.get('clients/'+{id});
//         const data: ClientDTO = await response.data;

//         const transformedData: Client = {
//             id: parseInt(data.id),
//             full_name: data.full_name
//         }
//         return {
//             isOk: true,
//             data: transformedData,
//             error: null
//         }
//     } catch (e) {
//         return {
//             isOk: false,
//             data: null,
//             error: (e as Error).message
//         }
//     }
// }

export const getClientsRecords = async (): Promise<getClientResponse> => {
    try {
        
        const response = await axios_instance.get<BackendResponse>('clients');


        let transformedData: Clients[] = []
        response.data.data.forEach((element: Clients) => {
            transformedData.push(
                {
                    id: element.id,
                    full_name: element.full_name
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