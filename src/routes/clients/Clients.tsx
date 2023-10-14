import { Eye, PenTool, Trash } from "react-feather";
import DataTable, { Action, ActionTypes, Field } from "../../components/datatable";
import { ClientDTO } from "../../services/clients/ClientService";
import { useNavigate } from "react-router-dom";

const Clients = () => {
    const navigate = useNavigate()

    const actions: Action<ClientDTO>[] = [
        {
            type: ActionTypes.Edit,
            icon: <PenTool color="lightblue"></PenTool>,
            url: "/client/edit/",
            fn: (client) => navigate(`/client/edit/${client.id}`),
        },
        {
            type: ActionTypes.Delete,
            icon: <Trash color="red"></Trash>,
            url: "/client/edit/3",
            fn: () => alert("foo")
        },
        {
            type: ActionTypes.Show,
            icon: <Eye color="red"></Eye>,
            url: "/client/edit/"
        },
    ];
    const fields: Field[] = [
        {
            name: "name",
            editable_from_table: false,
            original_name: "name",
            has_sort: false,
            show: true
        },
        {
            name: "email",
            editable_from_table: false,
            original_name: "email",
            has_sort: false,
            show: true,
        },
        
    ]

    return (
        <>
           
            <DataTable show_link="clients" actions={actions} url="clients" fields={fields} table_name="Client List" has_actions={true} ></DataTable>

            {/* <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
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
            </section> */}


        </>

    );
}

export default Clients;