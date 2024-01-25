import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios_instance from "../../../../config/api_defaults";

interface BackendResponse {
    most_missed: {
        labels: Array<string>;
        data: Array<number>;
    };
    most_used: {
        labels: Array<string>;
        data: Array<number>;
    };
}

interface AnalyticsProps {
    filterData: {
        start_date: string | Date;
        end_date: string | Date;
    };
}
const ServicesTenMostUsed = (props: AnalyticsProps) => {
    const [analyticsData, setAnalyticsData] = useState<BackendResponse>();
    const [labels, setLabels] = useState<Array<string>>([]);
    const [analyticData, setData] = useState<Array<number>>([]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );

    useQuery({
        queryKey: ["ten_service_used", props.filterData],
        refetchOnWindowFocus: false,
        queryFn: () =>
            axios_instance()
                .post("/analytics/services_summary", props.filterData)
                .then((r) => {
                    setAnalyticsData(r.data);
                }),
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Usluge",
                data: analyticData,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Top 10 najvise koristenih usluga, ",
            },
        },
    };
    const injectAnalyticsData = () => {
        if (analyticsData) {
            setData(analyticsData.most_used.data);
            setLabels(analyticsData.most_used.labels);
        }
    };
    useEffect(() => {
        injectAnalyticsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analyticsData]);

    return <Bar options={options} data={data} />;
};
export default ServicesTenMostUsed;
