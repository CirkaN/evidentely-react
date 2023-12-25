import { useEffect, useState } from "react";
import axios_instance from "../../../config/api_defaults";

interface HomePillProps {
    heading: string,
    filter_type: "new_clients" | "profit" | "missed_appointments" | "appointments"
    bg_color?: "warning" | "success" | "danger" | "primary",
}
interface PillAnalyticProps {
    result: number
}
interface FilterProps {
    days: number,
    type: string,
}
const AdminHomeAnalyticPill = (props: HomePillProps) => {
    const [filter, setFilter] = useState<FilterProps>({
        days: 7,
        type: props.filter_type
    });
    const [bgColor, setBgColor] = useState("primary");
    const [responseData, setResponseData] = useState<PillAnalyticProps>({
        result: 0,
    });

    const doFetch = ()=>{
        axios_instance().post(`/analytics/pill`, filter).then(r => setResponseData(r.data))
    }
    const applyColors = () => {
        if (props.bg_color === 'warning') {
            setBgColor('bg-yellow-400')
        }
        if (props.bg_color === 'primary') {
            setBgColor("bg-slate-500")
        }
        if (props.bg_color === 'success') {
            setBgColor("bg-green-600")
        }
    }

    useEffect(() => {
        applyColors();
    }, [])
    useEffect(()=>{
        doFetch();
    
    },[filter.days])

    return (
        <>
            <div className={`max-w-sm w-full border ${bgColor} border-slate-300 rounded-lg shadow  p-4 md:p-6`}>
                <div className="flex justify-between">
                    <div>
                        <h5 className="leading-none text-3xl font-bold text-white pb-2">{responseData.result}</h5>
                        <p className="text-base font-normal text-gray-700">{props.heading}</p>
                    </div>
                </div>
                <div id="area-chart"></div>
                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                    <div className="flex justify-between items-center pt-5">
                        <p className="text-sm font-medium text-center inline-flex items-center">Poslednjih {filter.days} dana</p>
                        <div className="w-48">

                            <select
                                value={filter.days}
                                onChange={(e) => { setFilter((c) => c && { ...c, days: parseInt(e.target.value) }) }}
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="7">7</option>
                                <option value="15">15</option>
                                <option value={30}>30</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminHomeAnalyticPill;