import { Callout } from "@radix-ui/themes"
import { Info } from "react-feather"
import DataTable, { Field } from "../../../../components/datatable"

// interface ServiceTableProps {
//     filterData: {
//         start_date: string | Date,
//         end_date: string | Date
//     }
// }

const fields: Field[] = [
    {
        name: "Ime usluge",
        original_name: "name",
        editable_from_table: false,
        has_sort: false,
        show: true
    },
    {
        name: "Broj zakazivanja",
        original_name: "appointments_count",
        editable_from_table: false,
        has_sort: true,
        show: true
    },
    {
        name: "Uplate",
        original_name: "total_amount_paid",
        editable_from_table: false,
        has_sort: true,
        show: true
    },

]

const DetailedServiceTableAnalytic = () => {
    return (
        <>
            <div>
                <Callout.Root>
                    <Callout.Icon>
                        <Info size={18} />
                    </Callout.Icon>
                    <Callout.Text color="iris">
                        Uplate su vidljive samo za usluge koje imaju kompletiran status (naplaceni u potpunosti)
                    </Callout.Text>
                </Callout.Root>
            </div>
            <div className="pt-2">
                <DataTable
                    table_name="Usluge po broju zakazivanja"
                    has_actions={false}
                    fields={fields}
                    queryKey="service_analytics"
                    url="analytics/service_table/"
                />
            </div>
        </>
    )
}
export default DetailedServiceTableAnalytic