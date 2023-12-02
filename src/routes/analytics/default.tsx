import { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';


interface AnalyticFilter {
    predefined_type: 'day' | 'week' | 'month' | 'year' | 'custom',
    start_date: Date,
    end_date: Date,
}
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Analytics = () => {

    const [activeFilter, setActiveFilter] = useState<AnalyticFilter>({
        predefined_type: "day",
        start_date: new Date(),
        end_date: new Date(),
    });
    const [activeCalendarView, setActiveCalendarView] = useState(false);

    const mutateDates = () => {
        const values = [new Date(), new Date()];
        setCalendarValues(values as Value)
    }
    useEffect(() => {
        mutateDates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter.start_date, activeFilter.end_date]);
    const handlePredefinedTypeChanged = () => {
        if (activeFilter.predefined_type === 'custom') {
            setActiveCalendarView(true);
        }
        if (activeFilter.predefined_type === 'day') {
            const values = [new Date(), new Date()];
            setCalendarValues(values as Value)
        }
        if (activeFilter.predefined_type === 'week') {
            const values = [new Date(new Date().setDate(new Date().getDate() - new Date().getDay())), new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))];
            setCalendarValues(values as Value)
        }
        if (activeFilter.predefined_type === 'month') {
            const values = [new Date(new Date().setDate(1)), new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0))];
            setCalendarValues(values as Value)
        }
        if (activeFilter.predefined_type === 'year') {
            const values = [new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999)];
            setCalendarValues(values as Value)
        }
    }
    useEffect(() => {
        handlePredefinedTypeChanged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter.predefined_type])
    const [calendarValues, setCalendarValues] = useState<Value>([new Date(), new Date()]);
    const [useProfit, setUseProfit] = useState(false);

    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ')
    }
    const mutateButtons = () => {
        return (
            <>

                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'day' })}
                    className={classNames(activeFilter.predefined_type === 'day' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Day</button>
                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'week' })}
                    className={classNames(activeFilter.predefined_type === 'week' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Week</button>
                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'month' })}
                    className={classNames(activeFilter.predefined_type === 'month' ? 'underline' : '',
                        '  py-2 text-md text-gray-700')}
                >Month</button>
                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'year' })}
                    className={classNames(activeFilter.predefined_type === 'year' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Year</button>
                <button
                    onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'custom' })}
                    className={classNames(activeFilter.predefined_type === 'custom' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Custom</button>
                <DateRangePicker isOpen={activeCalendarView} onChange={setCalendarValues} value={calendarValues} />
                <button className='rounded bg-slate-600 text-slate-100 p-2 hover:bg-slate-700 '>Confirm</button>
            </>
        );
    }

    const data2 = [
        {
            name: 'Mihajlo',
            uv: 4000,
        },
        {
            name: 'Nikola',
            uv: 3000,
        },
        {
            name: 'Petar C',
            uv: 2000,
        }
    ];
    const profitData = [
        {
            name: 'Mihajlo',
            uv: 2,
        },
        {
            name: 'Nikola',
            uv: 3,
        },
        {
            name: 'Petar C',
            uv: 5,
        }
    ];

    const data = [
        {
            name: '1',
            what: 4,
        },
        {
            name: '2',
            what: 3,
        },
        {
            name: '3',
            what: 5,
        },
        {
            name: '4',
            what: 6,
        },
        {
            name: '5',
            what: 4,
        },
        {
            name: '6',
            what: 13,
        },
        {
            name: '7',
            what: 15,
        },
        {
            name: '8',
            what: 11,
        },
        {
            name: '9',
            what: 12,
        },
        {
            name: '10',
            what: 10,
        },
        {
            name: '11',
            what: 15,
        }, {
            name: '12',
            what: 15,
        },




    ];
    return (
        <>

            <div className='flex justify-center space-x-3'>
                {mutateButtons()}

            </div>


            <p>Appointments for range</p>
            <div className="flex flex-wrap justify-evenly">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
                    <ResponsiveContainer width="100%" height="100%" aspect={1}>

                        <AreaChart
                            width={400}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" name='given for a month' dataKey="what" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
                    <ResponsiveContainer width="100%" height="100%" aspect={1}>

                        <AreaChart
                            width={400}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="what" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
                    <p className='text-center font-bold'>Your top clients: 2023-10-10 - 2023-11-12</p>
                    <p className='text-center'>Filter:</p>
                    <div className='flex  justify-center '>

                        <div>
                            <button onClick={() => setUseProfit(false)} className=' p-2  rounded bg-slate-700 text-slate-100 text-md font-semibold mr-2 '>Appointments</button>
                        </div>
                        <div>
                            <button onClick={() => setUseProfit(true)} className='p-2 rounded bg-slate-700 text-slate-100 text-md font-semibold mr-2 '>Profit</button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%" aspect={1}>
                        <BarChart width={150} height={40} data={useProfit === true ? profitData : data2}>
                            <Bar dataKey="uv" fill="#8884d8" />
                            <XAxis dataKey="name" />
                            <Tooltip />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </>

    );
}

export default Analytics
