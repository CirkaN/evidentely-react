import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import axios_instance from "../config/api_defaults";


export interface DatatableProps<T = any> {
    table_name: string,
    actions: Action[],
    fields: Field<T>[],
    has_actions: boolean,
    url: string,
}

interface Action {
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
    editable_from_table:boolean,
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

   

    const runAction = (a, b) => {
        console.log(a + b);
    }


    


    // const preparedActions = props.fields.map((element: Field) => {
    //     return (<>

    //         <tr key={element.id}>
    //             <td className="p-2 whitespace-nowrap">
    //                 <div className="flex items-center">
    //                     <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
    //                         <img className="rounded-full" src="https://doodleipsum.com/700?i=74943b7fc5a9da2affe8c2d8b8558812" width="30" height="30" alt="Alex Shatov"></img></div>
    //                     <div className="font-medium text-gray-800">
    //                         <input type="text"
    //                             defaultValue={element.name}
    //                             //   onKeyDown={(e) => { handleEnter(e, 'name', element.id) }}
    //                             onInput={(e: ChangeEvent<HTMLInputElement>) => logChange('name', element.id, e.target.value)} />
    //                     </div>
    //                 </div>
    //             </td>
    //             <td className="p-2 whitespace-nowrap">
    //                 <div className="text-left">
    //                     <input type="text"
    //                         defaultValue={element.email}
    //                         //   onKeyDown={(e) => { handleEnter(e, 'email', element.id) }}
    //                         onInput={(e: ChangeEvent<HTMLInputElement>) => logChange('email', element.id, e.target.value)} />

    //                 </div>
    //             </td>
    //             <td className="p-2 whitespace-nowrap">
    //                 <div className="text-left font-medium">
    //                     <input type="text"
    //                         defaultValue={element.address}
    //                         // onKeyDown={(e) => { handleEnter(e, 'address_1', element.id) }}
    //                         onInput={(e: ChangeEvent<HTMLInputElement>) => logChange('address_1', element.id, e.target.value)} />
    //                 </div>
    //             </td>
    //             <td className="p-2 whitespace-nowrap">
    //                 <div className="text-left text-center">
    //                     <input type="text"
    //                         defaultValue={element.phone}
    //                         //  onKeyDown={(e) => { handleEnter(e, 'phone', element.id) }}
    //                         onInput={(e: ChangeEvent<HTMLInputElement>) => logChange('phone', element.id, e.target.value)} />
    //                 </div>
    //             </td>
    //             <td className="p-2 whitespace-nowrap">
    //                 <div className="text-lg text-center">

    //                     <input type="text"
    //                         defaultValue={element.note}
    //                         //  onKeyDown={(e) => { handleEnter(e, 'note', element.id) }}
    //                         onInput={(e: ChangeEvent<HTMLInputElement>) => logChange('note', element.id, e.target.value)} />
    //                 </div>
    //             </td>
    //             <td className="p-2 whitespace-nowrap">
    //                 <div className="text-lg text-center">
    //                     {props.actions.map((element) => {
    //                         return (<button onClick={() => { runAction(element.type, 1) }}> {element.icon}</button>);
    //                     })}
    //                 </div>
    //             </td>
    //         </tr>

    //     </>);
    // })

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

                                {records.data.map((record)=>{
                                    return(<tr key={record.id}>
                                        {props.fields.map((f) => {
                                            if (f.original_name in record) {
                                                return <td>{f.formatFn ? f.formatFn(record[f.original_name],record) : record[f.original_name]}</td>
                                            }

                                            throw new Error(`Column [${f.original_name}] is not part of response.`)
                                        })}
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