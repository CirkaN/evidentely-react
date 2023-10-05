import { KeyboardEvent, useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import { Edit, Trash2 } from "react-feather";
import SweetAlert2 from "react-sweetalert2";
import toast, { Toaster } from "react-hot-toast";

interface Record {
    id: string,
    name: string,
    address: string,
    phone: string,
    note: string,
    email: string
}
interface Records {
    data: Record[];
}
const Clients = () => {

    const [records, setRecords] = useState<Records>({ data: [] });

    const [Page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [lastPage, setLastPage] = useState(1);
    const [swalProps, setSwalProps] = useState({});



    const increasePage = () => {
        if (Page < lastPage) {
            setPage(Page + 1);
        }

    }
    const decreasePage = () => {
        if (Page > 1) {
            setPage(Page - 1);
        }
    }
    function deleteClient(id: string) {
        setSwalOff

        axios_instance.delete('clients/' + id).then(response => {
            if (response.status === 200) {
                toast.success('Event Successfully Updated!')
            } else {
                toast.error('Something went wrong!')
            }
        })
    }

    function setSwalOff() {
        let dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }

    const logChange = (field: string, id: string, value: string) => {
        
        axios_instance.put('clients/' + id, {
            [field]: value
        }).catch(e => {
            console.log(e.response.data.errors);
        })
            .then(response => {
                toast.success('Client Successfully Updated!')
                console.log(response);
            })

    }

    const runAction = (action: string, id: string) => {
        if (action == 'del') {

            setSwalProps({
                show: true,
                icon: 'error',
                title: 'Please confirm',
                text: 'This action is unreversible and it will delete client with  all records associated with him',
                cancelButtonColor: "green",
                reverseButtons: true,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: "Go for it",
                confirmButtonColor: "red",
                onConfirm: () => { deleteClient(id) },
                onResolve: setSwalOff
            });
            //proceed to delete record from the database
        }
    }

    useEffect(() => {
        axios_instance.get('clients?per_page=' + perPage + '&page=' + Page).then((response) => {
            setRecords(response.data);
            setLastPage(response.data.meta.last_page);
        })
    }, [Page])

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>,field:string,id:string) => {
      if(e.key === 'Enter'){
        const input = e.target as HTMLInputElement;
        if(input){
            const value = input.value;
            logChange(field,id,value)
        }
      }
    }
    const preparedRecords = records ? records.data.map((element: Record) => {

        return (<tr key={element.id}>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov"></img></div>
                    <div className="font-medium text-gray-800">
                        <input type="text"
                            defaultValue={element.name}
                            onKeyDown={(e) => { handleEnter(e,'name',element.id) }}
                            onBlur={(e) => logChange('name', element.id, e.target.value)} />
                    </div>
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{element.email}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium">{element.address}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left text-center">{element.phone}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-lg text-center">??</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-lg text-center">
                    <button onClick={() => { runAction('del', element.id) }}><Trash2 /></button>
                    <button onClick={() => { runAction('edit', element.id) }}> <Edit /></button>
                </div>
            </td>
        </tr>)
    }) : []


    return (
        //run sweetAlert
        <>
            <Toaster />
            <SweetAlert2 {...swalProps} /><section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
                <div className="flex flex-col justify-center h-full">

                    <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">Clients</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">

                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Name</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Email</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Address</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Phone</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Note</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Actions</div>
                                            </th>
                                        </tr>
                                    </thead>


                                    <tbody className="text-sm divide-y divide-gray-100">

                                        {preparedRecords.length > 0 ? preparedRecords : []}

                                    </tbody>

                                </table>


                                <div className='flex items-center justify-center'>
                                    <div className="flex justify-center items-center space-x-4">
                                        <button onClick={decreasePage} className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">&lt;</button>
                                        <div className="text-slate-500">{Page} / {lastPage}</div>
                                        <button onClick={increasePage} className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">&gt;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>

    );
}

export default Clients;