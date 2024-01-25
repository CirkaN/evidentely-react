import { useState } from "react";
import { TransformedDataForSelect } from "../shared/interfaces/select_box.interface";
import { ClientDTO } from "../shared/interfaces/client.interface";
import axios_instance from "../config/api_defaults";
import { ItemDTO } from "../shared/interfaces/item.interface";
import { useQuery } from "react-query";

const useTransformedServices = () => {
    const [serviceTransformedList, setServiceTransformedList] =
        useState<TransformedDataForSelect[]>();
    const [serviceList, setServiceList] = useState<ItemDTO>();

    useQuery({
        queryKey: ["fetch_services"],
        retryOnMount: false,
        queryFn: () => {
            axios_instance()
                .get("/items?type=service")
                .then((r) => {
                    const transformed = r.data.map((element: ClientDTO) => ({
                        value: element.id,
                        label: element.name,
                    }));
                    setServiceTransformedList(transformed);
                    setServiceList(r.data);
                });
        },
    });

    return { serviceTransformedList, serviceList };
};

export default useTransformedServices;
