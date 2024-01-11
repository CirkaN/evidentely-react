import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios_instance from '../../../../config/api_defaults';
import { useQuery } from 'react-query';

interface BackendResponse {
    most_missed: {
        labels: Array<string>,
        data: Array<number>
    },
    most_used: {
        labels: Array<string>,
        data: Array<number>
    }
}
interface AnalyticsProps {
    filterData: {
        start_date: string | Date,
        end_date: string | Date
    }
}
const ServicesTenMissed = (props: AnalyticsProps) => {

    const [analyticsData, setAnalyticsData] = useState<BackendResponse>();
    const [labels, setLabels] = useState<Array<string>>([])
    const [dataForMissed, setDataForMissed] = useState<Array<number>>([])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useQuery({
        queryKey: ['most_service_missed', props.filterData],
        refetchOnWindowFocus: false,
        queryFn: () => axios_instance().post('/analytics/services_summary', props.filterData)
            .then(r => {
                setAnalyticsData(r.data)
            })
    })

    const data = {
        labels,
        datasets: [
            {
                label: "Usluge",
                data: dataForMissed,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Top 10 najvise propustenih usluga, ',
            },
        },
    };
    const injectAnalyticsData = () => {
        if (analyticsData) {
            setDataForMissed(analyticsData.most_missed.data)
            setLabels(analyticsData.most_missed.labels)
        }
    }
    useEffect(() => {
        injectAnalyticsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analyticsData])

    return (
        <>
             <Bar options={options} data={data} />
        </>

    )
}
export default ServicesTenMissed;