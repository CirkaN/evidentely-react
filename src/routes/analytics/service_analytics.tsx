import { useState } from 'react';
import ServicesTenMissed from './charts/services/ten_missed';
import ServicesTenMostUsed from './charts/services/ten_most_used';
import AnalyticsDatePicker from './components/analytics_date_picker';
import { DateRangeReturnValues } from '../../shared/interfaces/daterange_analytics_filter.interface';

interface filterValues {
    start_date: Date | string
    end_date: Date | string
}

const ServiceAnalytics = () => {

    const [filterValues, setFilterValues] = useState<filterValues>({
        start_date: new Date(new Date().setDate(1)).toISOString().split('T')[0],
        end_date: new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toISOString().split('T')[0],
    })


    const applyFilter = (dates: DateRangeReturnValues) => {
        console.log(dates);
        setFilterValues({
            start_date: dates[0],
            end_date: dates[1],
        })
    }


    return (
        <>
            <AnalyticsDatePicker
                fetchFn={(input) => applyFilter(input as DateRangeReturnValues)}
            />
            <div className='h-screen pt-5'>
                <div className='flex flex-col flex-wrap sm:flex-row h-screen '>
                    <div className='w-full h-72 sm:w-1/2  sm:h-1/2'>
                        <ServicesTenMostUsed filterData={filterValues} />
                    </div>
                    <div className=' w-full h-72 sm:w-1/2  sm:h-1/2'>
                        <ServicesTenMissed filterData={filterValues} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default ServiceAnalytics;