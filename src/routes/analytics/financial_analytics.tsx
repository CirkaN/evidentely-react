import { useEffect, useState } from "react";
import { AnalyticFilter } from "./default";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { DatePieces, DateRangePieces } from "../../shared/interfaces/daterange-picker.interface";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import axios_instance from "../../config/api_defaults";

const FinancialAnalytics = () => {


    const [activeCalendarView, setActiveCalendarView] = useState(false);
    const [calendarValues, setCalendarValues] = useState<DatePieces>([new Date(), new Date()]);
    const [top5ServicesByAppointments, setTop5ServicesByAppointments] = useState();
    const [top5ServicesByProfit, setTop5ServicesByProfit] = useState();
    const [activeFilter, setActiveFilter] = useState<AnalyticFilter>({
        predefined_type: "year",
        start_date: new Date(new Date().getFullYear(), 0, 1),
        end_date: new Date(new Date().getFullYear() + 1, 0, 0),
    });
    
    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ')
    }
    const handlePredefinedTypeChanged = () => {
        if (activeFilter.predefined_type === 'custom') {
            setActiveCalendarView(true);
        }
        if (activeFilter.predefined_type === 'day') {
            const values = [new Date(), new Date()];
            setCalendarValues(values as DateRangePieces)
            setActiveCalendarView(false);
        }
        if (activeFilter.predefined_type === 'week') {
            const values = [new Date(new Date().setDate(new Date().getDate() - new Date().getDay())), new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))];
            setCalendarValues(values as DateRangePieces)
            setActiveCalendarView(false);
        }
        if (activeFilter.predefined_type === 'month') {
            const values = [new Date(new Date().setDate(1)), new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0))];
            setCalendarValues(values as DateRangePieces)
            setActiveCalendarView(false);
        }
        if (activeFilter.predefined_type === 'year') {
            const values = [new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999)];
            setCalendarValues(values as DateRangePieces)
            setActiveCalendarView(false);
        }
    }

    const getValuesFromCalendar = () => {
        if (calendarValues) {
            if (Array.isArray(calendarValues)) {
                return {
                    from: calendarValues[0],
                    to: calendarValues[1],
                }

            }
        }
    }

    const profitLossData = [
        {
            name: 'Jan',
            profit: 4000,
            expense: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            profit: 3000,
            expense: 1398,
            amt: 2210,
        },
        {
            name: 'Mar',
            profit: 2000,
            expense: 9800,
            amt: 2290,
        },
        {
            name: 'April',
            profit: 2780,
            expense: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            profit: 1890,
            expense: 4800,
            amt: 2181,
        },
        {
            name: 'June',
            profit: 2390,
            expense: 3800,
            amt: 2500,
        },
        {
            name: 'July',
            profit: 3490,
            expense: 4300,
            amt: 2100,
        },
        {
            name: 'July',
            profit: 3490,
            expense: 4300,
            amt: 2100,
        },
        {
            name: 'Aug',
            profit: 3490,
            expense: 4300,
            amt: 2100,
        },
        {
            name: 'Sep',
            profit: 3490,
            expense: 4300,
            amt: 2100,
        },
        {
            name: 'Oct',
            profit: 3490,
            expense: 4300,
            amt: 2100,
        },
        {
            name: 'Nov',
            profit: 3490,
            expense: 4300,
            amt: 2100,
        },
        {
            name: 'Dec',
            profit: 3490,
            expense: 4300,
            amt: 2100,
        },
    ];
    const callEndpoints = () => {
        const data = getValuesFromCalendar();
        axios_instance().post('/analytics/financial/services', data).then(response => {
            console.log(response);
            setTop5ServicesByAppointments(response.data.per_appointment)
            setTop5ServicesByProfit(response.data.per_profit)

        })

    }

    useEffect(() => {
        callEndpoints();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarValues])

    useEffect(() => {
        handlePredefinedTypeChanged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter.predefined_type])

    const mutateButtons = () => {
        return (
            <>
                <button
                    onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'day' })}
                    className={classNames(
                        activeFilter.predefined_type === 'day' ? 'underline' : '',
                        'py-2 text-md text-gray-700'
                    )}
                >
                    Day
                </button>
                <button
                    onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'week' })}
                    className={classNames(
                        activeFilter.predefined_type === 'week' ? 'underline' : '',
                        'py-2 text-md text-gray-700'
                    )}
                >
                    Week
                </button>
                <button
                    onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'month' })}
                    className={classNames(
                        activeFilter.predefined_type === 'month' ? 'underline' : '',
                        'py-2 text-md text-gray-700'
                    )}
                >
                    Month
                </button>
                <button
                    onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'year' })}
                    className={classNames(
                        activeFilter.predefined_type === 'year' ? 'underline' : '',
                        'py-2 text-md text-gray-700'
                    )}
                >
                    Year
                </button>
                <button
                    onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'custom' })}
                    className={classNames(
                        activeFilter.predefined_type === 'custom' ? 'underline' : '',
                        'py-2 text-md text-gray-700'
                    )}
                >
                    Custom
                </button>
                <DateRangePicker isOpen={activeCalendarView} onChange={setCalendarValues} value={calendarValues} />
                <button onClick={() => { callEndpoints() }} className='rounded bg-slate-600 text-slate-100 p-2 hover:bg-slate-700 mt-2 sm:mt-0'>
                    Confirm
                </button>
            </>
        );
    };

    return (<>

        <div className='flex flex-wrap justify-center space-x-3 items-center'>

            {mutateButtons()}

        </div>
        <div className="flex flex-wrap">

            <div className="w-full  sm:w-1/2 md:w-1/3 p-4">
                <div className="bg-white p-4 shadow-md">
                    <ResponsiveContainer width="100%" height="100%" aspect={1}>
                        <BarChart width={150} height={40} data={top5ServicesByAppointments}>
                            <Bar dataKey="amount" name="broj zakazivanja" fill="#8884d8" />
                            <XAxis dataKey="name" />
                            <Tooltip />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center">Top 5 usluga per appointments </p>
                </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
                <div className="bg-white p-4 shadow-md">
                    <ResponsiveContainer width="100%" height="100%" aspect={1}>
                        <BarChart
                            width={500}
                            height={300}
                            data={profitLossData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="profit" name="profit" fill="#02690b" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                            <Bar dataKey="expense" name="trosak" fill="#870309" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center">Profit vs Troskovi</p>
                </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
                <div className="bg-white p-4 shadow-md">
                    <ResponsiveContainer width="100%" height="100%" aspect={1}>
                        <BarChart width={150} height={40} data={top5ServicesByProfit}>
                            <Bar dataKey="amount" name="profit" fill="#005907" />
                            <XAxis dataKey="name" />
                            <Tooltip />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center">Top 5 usluga per profit </p>
                </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
                <div className="bg-white p-4 shadow-md">
                    Div 4
                </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
                <div className="bg-white p-4 shadow-md">
                    Div 5
                </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
                <div className="bg-white p-4 shadow-md">
                    Div 6
                </div>
            </div>

        </div>
    </>)
}

export default FinancialAnalytics;