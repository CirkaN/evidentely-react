import { ReactElement, useEffect, useState } from "react";
import axios_instance from "../config/api_defaults";
import { useQuery } from "react-query";
import { ChevronDown, ChevronUp, Filter } from "react-feather";
import { useTranslation } from "react-i18next"

interface GenericEntry {
    id: string,
    [key: string]: unknown
}

export interface DatatableProps<T = GenericEntry[]> {
    table_name: string,
    actions?: Action<T>[],
    fields: Field<T>[],
    has_actions: boolean,
    table_actions?: TableAction[],
    table_filters?: TableFilter[],
    has_table_filters?: boolean,
    url: string,
    queryKey: string,
    has_search?: boolean
}
export interface TableAction {
    icon: ReactElement,
    fn?: () => unknown
}

export interface TableFilter {
    backend_key: unknown,
    component: ReactElement,
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
interface SearchParams {
    search_param: string,

}
const DataTable = <T,>(props: DatatableProps<T>) => {
    const [builtUrl, setBuiltUrl] = useState<URL>(new URL(`/api/${props.url}`, import.meta.env.VITE_API_URL));

    const [sorting, setSorting] = useState({
        sort_by: "",
        sort_direction: "desc"
    })

    const [searchParams, setSearchParams] = useState<SearchParams>({ search_param: "" });
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const { t } = useTranslation();

    const { isLoading, data } = useQuery({
        queryKey: [props.queryKey, props.url, builtUrl.href],
        queryFn: () => axios_instance().get(builtUrl.href).then(r => r.data),
        keepPreviousData: true
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

    const sortBy = (field: string) => {
        const sortBy = {
            "sort_by": field,
            "sort_direction": sorting.sort_direction
        }

        const s = new URL(builtUrl);
        s.searchParams.set('sort_direction', sortBy.sort_direction);
        s.searchParams.set('sort_by', sortBy.sort_by);
        s.searchParams.set('page', "1");
        setBuiltUrl(s);

        const newSortBy = {
            "sort_by": field,
            "sort_direction": oppositeSort(sorting.sort_direction),
        }
        setSorting(newSortBy);

    }

    const oppositeSort = (type: string) => {
        if (type == 'asc') {
            return 'desc'
        } else {
            return 'asc'
        }
    }

    const preparedFields = props.fields.map((element: Field<T>, index) => {
        return (
            <th key={index} className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">{element.name}
                    {element.has_sort &&
                        <button onClick={() => sortBy(element.original_name)}>{sorting?.sort_direction == "asc" && <ChevronUp size="15px" />}{sorting?.sort_direction == 'desc' && <ChevronDown size="15px" />}
                        </button>
                    }
                </div>
            </th>

        )
    })
    const sanitizeString = (string: string) => {
        if (string) {
            const charLen = string.length
            if (charLen > 30) {
                return string.slice(0, 30) + "..."
            }
            return string;
        }

    }
    useEffect(() => {
        if (searchParams.search_param.length >= 1) {
            console.log('salljem request');
            const url = new URL(builtUrl);
            url.searchParams.set('search', searchParams.search_param);
            setBuiltUrl(url);
        } else {
            const url = new URL(builtUrl);
            url.searchParams.delete('search')
            setBuiltUrl(url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])
    useEffect(() => {
        const page = builtUrl.searchParams.get('page') || "1";
        if (parseInt(data?.meta?.total) < parseInt(page)) {
            const url = new URL(builtUrl);
            url.searchParams.set('page', '1');
            setBuiltUrl(url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.meta?.total])

    return (
        <>
            {
                <div className="flex flex-col justify-center">
                    <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <div className="flex justify-between  bg-slate-50">
                                <div className="flex">
                                    <h2 className="font-semibold text-gray-800">{props.table_name} </h2>
                                    {props.has_table_filters &&
                                        <Filter onClick={() => { setShowFilters(!showFilters) }} className="cursor-pointer" />
                                    }
                                </div>

                                {props?.table_actions?.map((el, index) => {
                                    return (
                                        <button key={index} onClick={() => el.fn && el.fn()} className="bg-green-500 rounded-full text-lg text-white px-3 py-1 ">{el.icon}</button>
                                    )
                                })}
                            </div>
                            {
                                props?.has_search &&
                                <div className="pt-2">
                                    <input value={searchParams?.search_param}
                                        onChange={(e) => { setSearchParams((c) => c && { ...c, search_param: e.target.value }) }}
                                        type="text"
                                        className=" curos autofocus border mb-2 bg-gray-100 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" placeholder={t('common.search')} />

                                </div>
                            }
                        </header>

                        {
                            isLoading &&
                            <p>{t('common.please_wait')}</p>

                        }

                        {!isLoading &&
                            <div className="p-3">
                                <div className="overflow-x-auto">

                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                {preparedFields && preparedFields}


                                                {props.has_actions &&
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-center">{t('common.actions')}</div>
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
                                                                            <p> {sanitizeString(record[f.original_name] as string)}</p>
                                                                        </div>
                                                                    </td>
                                                                }

                                                            }
                                                            throw new Error(`Column [${f.original_name}] is not part of response.`)
                                                        })}

                                                        {props.has_actions &&
                                                            <td className="p-2 whitespace-nowrap">
                                                                <div className="text-lg text-center">
                                                                    {props?.actions &&
                                                                        props.actions.map((action, index) => {
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
                            </div>}
                    </div>
                </div>
            }

        </>

    );
}


export default DataTable;