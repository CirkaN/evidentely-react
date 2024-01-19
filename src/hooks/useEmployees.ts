import { useState } from 'react';
import { TransformedDataForSelect } from '../shared/interfaces/select_box.interface';
import axios_instance from '../config/api_defaults';
import { useQuery } from 'react-query';
import { EmployeeDTO } from '../shared/interfaces/employees.interface';

const useEmployees = () => {

    const [employeeTransformedList, setEmployeeTransformedList] = useState<TransformedDataForSelect[]>();
    const [employeeList, setEmployeeList] = useState<EmployeeDTO[]>()

    useQuery({
        queryKey: ['fetch_employees'],
        retryOnMount: false,
        queryFn: () => {
            axios_instance().get('/employees').then(r => {
                const transformed = r.data.map((element: EmployeeDTO) => ({
                    value: element.id,
                    label: element.name
                }));
                setEmployeeTransformedList(transformed)
                setEmployeeList(r.data);
            })
        }
    })
   

    return { employeeTransformedList, employeeList };
};

export default useEmployees;