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
import axios_instance from "../../../config/api_defaults";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface GraphProps {
    user_id: number | string;
}
interface DataInterface {
    missed: number;
    completed: number;
}
interface BackendResponse {
    data: {
        labels: Array<number | string>;
        data: Array<DataInterface>;
    };
}
const ClientAppointmentSummaryGraph = (props: GraphProps) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );
    const [analyticsData, setAnalyticsData] = useState<BackendResponse>();
    const [labels, setLabels] = useState<Array<number | string>>([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Istorija zakazivanja u proslih 6 meseci",
            },
        },
    };

    const data = {
        //labels
        labels,
        datasets: [
            {
                label: "Ukupno otkazanih termina",
                data: analyticsData?.data.data.map((e) => e.missed),
                backgroundColor: "rgba(255, 157, 0, 0.8)",
            },
            {
                label: "Ukupno kompletiranih termina",
                data: analyticsData?.data.data.map((e) => e.completed),
                backgroundColor: "rgba(0, 181, 89, 0.8)",
            },
        ],
    };
    const injectAnalyticsData = () => {
        if (analyticsData) {
            setLabels(analyticsData.data.labels);
        }
    };
    useQuery({
        queryKey: ["client_history__analytics"],
        queryFn: () =>
            axios_instance()
                .post(`/analytics/user/${props.user_id}/appointments_history`)
                .then((r) => setAnalyticsData(r.data)),
    });
    useEffect(() => {
        injectAnalyticsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [analyticsData]);
    return <Bar options={options} data={data} />;
};
export default ClientAppointmentSummaryGraph;
