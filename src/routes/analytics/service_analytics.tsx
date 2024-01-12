import { useState } from 'react';
import ServicesTenMissed from './charts/services/ten_missed';
import ServicesTenMostUsed from './charts/services/ten_most_used';
import AnalyticsDatePicker from './components/analytics_date_picker';
import { DateRangeReturnValues } from '../../shared/interfaces/daterange_analytics_filter.interface';
import DetailedServiceTableAnalytic from './tables/services/detailed_service_table';

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

            <div className='flex flex-col sm:flex-row pt-10'>
                <div className='w-1/2 h-96'>
                    <ServicesTenMostUsed filterData={filterValues} />
                </div>
                <div className='w-1/2 h-96'>
                    <ServicesTenMissed filterData={filterValues} />
                </div>
            </div>

            <div className='pt-10'>
                <DetailedServiceTableAnalytic />
            </div>
        </>
    )
}
export default ServiceAnalytics;