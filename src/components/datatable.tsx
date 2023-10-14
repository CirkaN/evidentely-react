import { ReactElement, useEffect, useState } from "react";
import axios_instance from "../config/api_defaults";
import { useNavigate } from "react-router-dom";


export interface DatatableProps<T = unknown> {
    table_name: string,
    actions: Action[],
    fields: Field<T>[],
    has_actions: boolean,
    url: string,
    show_link: string,
}

export interface Action {
    type: ActionTypes,
    url: string,
    icon: ReactElement,
}
// eslint-disable-next-line react-refresh/only-export-components
export enum ActionTypes {
    Edit = 'edit',
    Delete = 'delete',
    Show = 'show'
}

export interface Field<T = unknown> {
    name: string,
    editable_from_table: boolean,
    original_name: string,
    has_sort: boolean,
    show: boolean,
    formatFn?: (value: string, resource: T) => JSX.Element | string,
}

const DataTable = <T,>(props: DatatableProps<T>) => {
    const [Page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [lastPage, setLastPage] = useState(1);
    const [records, setRecords] = useState({ data: [] });
    const navigate = useNavigate();

    useEffect(() => {
        axios_instance.get(`${props.url}?per_page=${perPage}&page=${Page}`).then((response) => {
            setRecords(response.data);
            setLastPage(response.data.meta.last_page);
        })
    }, [Page, perPage, props.url])

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

    const runAction = (action: string, id: string) => {
        if (action == 'delete') {

            // setSwalProps({
            //     show: true,
            //     icon: 'error',
            //     title: 'Please confirm',
            //     text: 'This action is unreversible and it will delete client with  all records associated with him',
            //     cancelButtonColor: "green",
            //     reverseButtons: true,
            //     showCancelButton: true,
            //     showConfirmButton: true,
            //     cancelButtonText: 'Cancel',
            //     confirmButtonText: "Go for it",
            //     confirmButtonColor: "red",
            //     onConfirm: () => { deleteClient(id) },
            //     onResolve: setSwalOff
            // });
            //proceed to delete record from the database
        }
        if (action == 'edit') {
            //do edit thing
        }
        if (action == 'show') {
            navigate(`show${id}`);
        }
    }


    const preparedFields = props.fields.map((element: Field) => {
        return (
            <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">{element.name}</div>
            </th>

        )
    })
    return (


        <div className="flex flex-col justify-center h-full">
            <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">{props.table_name}</h2>
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">

                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                {preparedFields && preparedFields}


                                {props.has_actions &&
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-center">Actions</div>
                                    </th>}
                            </thead>


                            <tbody className="text-sm divide-y divide-gray-100">

                                {records.data.map((record) => {
                                    return (
                                    <tr key={record.id}>
                                        {props.fields.map((f) => {
                                            if (f.original_name in record) {

                                                return  <td className="p-2 whitespace-nowrap">
                                                              <div className="text-left">
                                                                    <input type="text"
                                                                     defaultValue={record[f.original_name]}
                                                                     />
                                                                </div>
                                                            </td>



                                              //  return <td>{f.formatFn ? f.formatFn(record[f.original_name], record) : record[f.original_name]}</td>
                                            }

                                            throw new Error(`Column [${f.original_name}] is not part of response.`)

                                          
                                        })}
                                    {props.has_actions && 
                                       <td className="p-2 whitespace-nowrap">
                                       <div className="text-lg text-center">
                                       {props.actions.map((element) => {
                                              return (<button onClick={() => { runAction(element.type, record.id) }}> {element.icon}</button>);
                                          })}
                                      </div>
                                  </td>}
                                    </tr>)
                                })}
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


    );
}


export default DataTable;