import { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import axios_instance from '../../config/api_defaults';


export interface AnalyticFilter {
    predefined_type: 'day' | 'week' | 'month' | 'year' | 'custom',
    start_date: Date | string,
    end_date: Date | string,
}
type ValuePiece = Date | string | null;

interface TopCompleted {
    user_id: number,
    name: string,
    completed_appointments_count: number
}
interface TopMissed {
    user_id: number,
    name: string,
    missed_appointments_count: number
}
interface TopProfit {
    user_id: number,
    name: string,
    total_amount_paid: number
}

interface BackendClientAnalyticResponse {
    top_completed: TopCompleted[],
    top_missed: TopMissed[],
    top_profit: TopProfit[]
}

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Analytics = () => {

    const [activeFilter, setActiveFilter] = useState<AnalyticFilter>({
        predefined_type: "month",
        start_date: new Date(new Date().setDate(1)).toISOString().split('T')[0],
        end_date: new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0],
    });

    const [activeCalendarView, setActiveCalendarView] = useState(false);

    const [topCompletedClients, setTopCompletedClients] = useState<TopCompleted[]>([]);
    const [topMissedClients, setTopMissedClients] = useState<TopMissed[]>([]);
    const [topProfitClients, setTopProfitClients] = useState<TopProfit[]>([]);


    const [calendarValues, setCalendarValues] = useState<Value>([
        new Date(new Date().setDate(1)).toISOString().split('T')[0],
        new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0]
    ]);

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

    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ')
    }
    const mutateButtons = () => {
        return (
            <>

                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'day' })}
                    className={classNames(activeFilter.predefined_type === 'day' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Dan</button>
                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'week' })}
                    className={classNames(activeFilter.predefined_type === 'week' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Nedelja</button>
                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'month' })}
                    className={classNames(activeFilter.predefined_type === 'month' ? 'underline' : '',
                        '  py-2 text-md text-gray-700')}
                >Mesec</button>
                <button onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'year' })}
                    className={classNames(activeFilter.predefined_type === 'year' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Godina</button>
                <button
                    onClick={() => setActiveFilter((c) => c && { ...c, predefined_type: 'custom' })}
                    className={classNames(activeFilter.predefined_type === 'custom' ? 'underline' : '',
                        ' py-2 text-md text-gray-700')}
                >Odaberi</button>
                <DateRangePicker isOpen={activeCalendarView} onChange={setCalendarValues} value={calendarValues} />
                <button onClick={() => { fetchData() }} className='rounded bg-slate-600 text-slate-100 p-2 hover:bg-slate-700'>Potvrdi</button>
            </>
        );
    }
    const fetchData = () => {
        const calendar = calendarValues as Array<Value>
        if (calendar) {
            axios_instance().post('/analytics/client_main', {
                start_date: calendar[0],
                end_date: calendar[1],
            }).then(r => { applyLiveData(r.data) });
        }
    }
    const applyLiveData = (r: BackendClientAnalyticResponse) => {
        if (r.top_completed) {
            setTopCompletedClients(r.top_completed)
        }
        if (r.top_missed) {
            setTopMissedClients(r.top_missed)
        }
        if (r.top_profit) {
            setTopProfitClients(r.top_profit)
        }

    }
    useEffect(() => {
        fetchData();
    }, [])



    return (
        <>

            <div className='flex flex-wrap justify-center space-x-3 items-center'>
                {mutateButtons()}
            </div>

            <div className='flex flex-wrap flex-col sm:flex-row pt-20'>
                <div className='w-full sm:w-1/3 h-96 mb-10 border '>
                    {topCompletedClients.length > 0 &&
                        <>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={150} height={40} data={topCompletedClients}>
                                    <Bar dataKey="completed_appointments_count" name='Broj kompletiranih termina' fill="#8884d8" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                            <p className='text-center'>Klijenti sa najvecim brojem termina</p>
                        </>}
                    {topCompletedClients.length < 1 &&
                        <p className='text-center py-[150px]'>Trenutno nemamo podataka za prikaz, vremenom kada unesete dovoljno podataka
                            ovde ce se pojaviti grafikon</p>
                    }
                </div>

                <div className='w-full sm:w-1/3 h-96 mb-10  border'>
                    {topProfitClients.length > 0 &&
                        <>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={150} height={40} data={topProfitClients}>
                                    <Bar dataKey="total_amount_paid" name="Profit" fill="#5C8374" />

                                    <XAxis dataKey="name" />
                                    <YAxis />

                                    <Tooltip />
                                    <Legend />

                                </BarChart>
                            </ResponsiveContainer>
                            <p className='text-center'>Klijenti sa najvecim profitom</p>
                        </>
                    }

                    {topProfitClients.length < 1 &&
                        <p className='text-center py-[150px]'>Trenutno nemamo podataka za prikaz, vremenom kada unesete dovoljno podataka
                            ovde ce se pojaviti grafikon</p>
                    }
                </div>

                <div className='w-full sm:w-1/3 h-96 mb-10 border '>
                    {topMissedClients.length > 0 &&
                        <>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={150} height={40} data={topMissedClients}>
                                    <Bar dataKey="missed_appointments_count" name='Broj propustenih termina' fill="#B31312" />

                                    <XAxis dataKey="name" />
                                    <YAxis />

                                    <Tooltip />
                                    <Legend />

                                </BarChart>
                            </ResponsiveContainer>
                            <p className='text-center'>Klijenti sa najvecim brojem propustenih termina</p>
                        </>
                    }
                    {topMissedClients.length < 1 &&
                        <p className='text-center py-[150px]'>Trenutno nemamo podataka za prikaz, vremenom kada unesete dovoljno podataka
                            ovde ce se pojaviti grafikon</p>
                    }
                </div>
            </div>
        </>

    );
}

export default Analytics
