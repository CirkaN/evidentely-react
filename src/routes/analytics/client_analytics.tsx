import { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';


export interface AnalyticFilter {
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

    const top5ClientsPerAppointment = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },

    ];
 
    
    return (
        <>

<div className='flex flex-wrap justify-center space-x-3 items-center'>
                {mutateButtons()}
            </div>

          
            <div className='flex flex-wrap flex-col sm:flex-row pt-20'>

                <div className='w-full sm:w-1/3 h-96 mb-10 '>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={top5ClientsPerAppointment}>
                            <Bar dataKey="uv" fill="#8884d8" />
                          
                            <XAxis dataKey="name" />
                            <YAxis />

                            <Tooltip />
                            <Legend />

                        </BarChart>
                    </ResponsiveContainer>
                    <p className='text-center'>Klijenti sa najvecim brojem termina</p>
                </div>

                <div className='w-full sm:w-1/3 h-96 mb-10 '>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={top5ClientsPerAppointment}>
                            <Bar dataKey="uv" fill="#5C8374" />
                          
                            <XAxis dataKey="name" />
                            <YAxis />

                            <Tooltip />
                            <Legend />

                        </BarChart>
                    </ResponsiveContainer>
                    <p className='text-center'>Klijenti sa najvecim profitom</p>
                </div>

                <div className='w-full sm:w-1/3 h-96 mb-10 '>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={top5ClientsPerAppointment}>
                            <Bar dataKey="uv" fill="#B31312" />
                          
                            <XAxis dataKey="name" />
                            <YAxis />

                            <Tooltip />
                            <Legend />

                        </BarChart>
                    </ResponsiveContainer>
                    <p className='text-center'>Klijenti sa najvecim brojem propustenih termina</p>
                </div>





            </div>



        </>

    );
}

export default Analytics
