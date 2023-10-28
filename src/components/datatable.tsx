import { ReactElement, useEffect, useState } from "react";
import axios_instance from "../config/api_defaults";
import { useQuery } from "react-query";


interface GenericEntry {
    id: string,
    [key: string]: unknown
}

export interface DatatableProps<T = GenericEntry[]> {
    table_name: string,
    actions: Action<T>[],
    fields: Field<T>[],
    has_actions: boolean,
    table_actions?: TableAction[]
    url: string,
}
export interface TableAction {
    icon: ReactElement,
    fn?: () => unknown
}

export interface Action<T> {
    type: ActionTypes,
    icon: ReactElement,
    fn?: (resource: T) => unknown,
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
    const [builtUrl, setBuiltUrl] = useState<URL>(new URL(`/api/${props.url}`, import.meta.env.VITE_API_URL));


    const { data } = useQuery({
        queryKey: [props.url, builtUrl.href],
        queryFn: () => axios_instance.get(builtUrl.href).then(r => r.data),
    })

    const changePage = (action: 'next' | 'previous') => {
        const url = new URL(builtUrl);
        const page = parseInt(url.searchParams.get('page') || "1");

        if (action === 'previous' && page > 1) {
            url.searchParams.set('page', (page - 1).toString())
        }

        if (action === 'next' && page < data?.meta.last_page) {
            url.searchParams.set('page', (page + 1).toString())
        }

        setBuiltUrl(url)
    }

    const preparedFields = props.fields.map((element: Field<T>, index) => {
        return (
            <th key={index} className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">{element.name}</div>
            </th>

        )
    })

    useEffect(() => {
        const page = builtUrl.searchParams.get('page') || "1";
        if (parseInt(data?.meta?.total) < parseInt(page)) {
            alert(1);
            const url = new URL(builtUrl);
            url.searchParams.set('page', '1');
            setBuiltUrl(url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.meta?.total])

    return (
        <div className="flex flex-col justify-center">
            <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">


                <header className="px-5 py-4 border-b border-gray-100">

                    <div className="flex justify-between  bg-slate-50">

                        <div>
                            <h2 className="font-semibold text-gray-800">{props.table_name}</h2>
                        </div>

                        {props?.table_actions?.map((el, index) => {
                            return (
                                <button key={index} onClick={() => el.fn && el.fn()} className="bg-green-500 rounded-full text-lg text-white px-3 py-1 ">{el.icon}</button>
                            )
                        })}

                    </div>

                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">

                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    {preparedFields && preparedFields}


                                    {props.has_actions &&
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Actions</div>
                                        </th>}
                                </tr>
                            </thead>


                            <tbody className="text-sm divide-y divide-gray-100">


                                {data?.data.map((record: GenericEntry) => {

                                    return (
                                        <tr key={record.id}>
                                            {props.fields.map((f, index) => {
                                                if (f.original_name in record) {

                                                    if (f.formatFn) {
                                                        
                                                        return <td key={index} className="p-2 whitespace-nowrap">
                                                        <div className="text-left">
                                                            <p>{f.formatFn(record[f.original_name] as unknown as string, record as T)}</p>
                                                        </div>
                                                    </td>
                                                    } else {
                                                        return <td key={index} className="p-2 whitespace-nowrap">
                                                            <div className="text-left">
                                                                <p>{record[f.original_name] as unknown as string}</p>
                                                            </div>
                                                        </td>
                                                    }

                                                }
                                                throw new Error(`Column [${f.original_name}] is not part of response.`)
                                            })}

                                            {props.has_actions &&
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-lg text-center">
                                                        {props.actions.map((action, index) => {
                                                            return (<button className="p-1" key={index} onClick={() => action.fn && action.fn(record as T)}> {action.icon}</button>);
                                                        })}
                                                    </div>
                                                </td>}
                                        </tr>)
                                })}
                            </tbody>
                        </table>

                        <div className='flex items-center justify-center'>
                            <div className="flex justify-center items-center space-x-4">
                                <button onClick={() => changePage('previous')} className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">&lt;</button>
                                <div className="text-slate-500">{data?.meta?.current_page} / {data?.meta?.last_page}</div>
                                <button onClick={() => changePage('next')} className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm">&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DataTable;