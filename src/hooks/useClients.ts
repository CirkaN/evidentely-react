import { useState } from "react";
import { TransformedDataForSelect } from "../shared/interfaces/select_box.interface";
import { ClientDTO } from "../shared/interfaces/client.interface";
import axios_instance from "../config/api_defaults";
import { useQuery } from "react-query";

const useTransformedClients = () => {
    const [clientTransformedList, setClientTransformedList] =
        useState<TransformedDataForSelect[]>();
    const [clientList, setClientList] = useState<ClientDTO[]>();

    useQuery({
        queryKey: ["fetch_clients"],
        retryOnMount: false,
        queryFn: () => {
            axios_instance()
                .get("/clients")
                .then((r) => {
                    const transformed = r.data.map((element: ClientDTO) => ({
                        value: element.id,
                        label: element.name,
                    }));
                    setClientTransformedList(transformed);
                    setClientList(r.data);
                });
        },
    });

    return { clientTransformedList, clientList };
};

export default useTransformedClients;
