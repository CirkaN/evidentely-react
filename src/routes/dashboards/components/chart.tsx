
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import axios_instance from '../../../config/api_defaults';
import { useEffect, useState } from 'react';

interface BackendResponse {
    data: Array<number | string>,
    labels: Array<number | string>
}

const DashboardChart = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const [analyticsData, setAnalyticsData] = useState<BackendResponse>();
    const [labels, setLabels] = useState<Array<number | string>>([]);
    const [dataForAnalytics, setDataForAnalytics] = useState<Array<number | string>>([]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Broj termina u tekucem mesecu',
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Broj ukupnih termina',
                data: dataForAnalytics,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const injectAnalyticsData = () => {
        if (analyticsData) {
            setDataForAnalytics(analyticsData.data)
            setLabels(analyticsData.labels)
        }
    }
    useQuery({
        queryKey: ['main_dashboard_analytics'],
        queryFn: () => axios_instance().post('/analytics/main_dashboard').then(r => setAnalyticsData(r.data))
    })
    useEffect(() => {
        injectAnalyticsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analyticsData])
    return (<>
        <Line options={options} data={data} />;</>)
}
export default DashboardChart;