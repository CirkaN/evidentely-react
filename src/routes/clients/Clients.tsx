import { useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";

interface Record {
    id: string,
    full_name: string,
    address: string,
    phone: string,
    note: string,
    email: string
}
interface Records {
    data: Record[]
}
const Clients = () => {
    const [records, setRecords] = useState<Records | []>([]);
    const [Page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

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

    useEffect(() => {
        axios_instance.get('clients?per_page=1&page=' + Page).then((response) => {
            setRecords(response.data.data);
            setLastPage(response.data.meta.total);
        })
    }, [Page])


    const preparedRecords = records ? records.map((element: Record) => {

        return (<tr key={element.id}>
            <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov"></img></div>
                    <div className="font-medium text-gray-800">{element.full_name}</div>
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
                <div className="text-lg text-center"><button>DEL  </button><button>  EDIT</button></div>

            </td>
        </tr>)
    }) : []
        ;
    return (

        <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
            <div className="flex flex-col justify-center h-full">

                <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Customers</h2>
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
                                    <button onClick={decreasePage} className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm" >&lt;</button>
                                    <div className="text-slate-500">{Page} / {lastPage}</div>
                                    <button onClick={increasePage} className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm" >&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Clients;