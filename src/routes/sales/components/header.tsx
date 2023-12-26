import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios_instance from "../../../config/api_defaults";

interface SaleStats {
    current_month:{
        total_sold_value:string,
        total_profit:string,
        total_expenses:string
    },
    current_year:{
        total_sold_value:string,
        total_profit:string,
        total_expenses:string
    },
    pending_sales_data:{
        total_sold_value:string,
        total_profit:string,
        total_expenses:string
    }
}
const SalesHomeHeader = () => {
    const [salesStats, setSalesStats] = useState<SaleStats>();
    const { isLoading } = useQuery({
        queryKey: ['sale_stats'],
        queryFn: () => axios_instance().post('/analytics/sales_summary').then(r => setSalesStats(r.data))
    })
    const formatCurrency = (t: string | number | null | undefined) => {
        const currencyFormat = new Intl.NumberFormat('sr-RS', {
            style: 'currency',
            currency: 'RSD',
        });
        if (!t) {
            return currencyFormat.format(0);
        } else {
            return currencyFormat.format(parseInt(t.toString()));
        }

    }
    const { t } = useTranslation();
    return (
        <>
            {!isLoading &&
                <div className="flex flex-wrap -mx-2 ">
                    <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4  border-2">
                        <div className="bg-white p-4 rounded shadow space-y-2 ">
                            <p className="text-center">{t('sales.summary_this_month')}:</p>
                            <div className="flex justify-between ">
                                <div>{t('sales.summary_value_sold_this_month')}:</div>
                                <div><span className="text-slate-600">{formatCurrency(salesStats?.current_month.total_sold_value)}</span></div>
                            </div>
                            <div className="flex justify-between">
                                <div>{t('sales.summary_total_cost')}:</div>
                                <div><span className="text-red-600">{formatCurrency(salesStats?.current_month.total_expenses)}</span></div>
                            </div>
                            <div className="flex justify-between">
                                <div>{t('sales.summary_total_profit')}:</div>
                                <div><span className="text-green-600">{formatCurrency(salesStats?.current_month.total_profit)}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 border-2">
                        <div className="bg-white p-4 rounded shadow space-y-2 ">
                            <p className="text-center">{t('sales.summary_pending_sales_this_month')}:</p>
                            <div className="flex justify-between ">
                                <div>{t('sales.summary_total_unpaid_product_value')}:</div>
                                <div><span className="text-slate-600">{formatCurrency(salesStats?.pending_sales_data.total_sold_value)}</span></div>
                            </div>
                            <div className="flex justify-between">
                                <div>{t('sales.summary_total_pending_cost')}:</div>
                                <div><span className="text-red-600">{formatCurrency(salesStats?.pending_sales_data.total_expenses)}</span></div>
                            </div>
                            <div className="flex justify-between">
                                <div>{t('sales.summary_total_pending_profit')}</div>
                                <div><span className="text-green-600">{formatCurrency(salesStats?.pending_sales_data.total_profit)}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 border-2">
                        <div className="bg-white p-4 rounded shadow space-y-2 ">
                            <p className="text-center">{t('sales.summary_yearly_statistic')}:</p>
                            <div className="flex justify-between ">
                                <div>{t('sales.summary_total_products_sold_in_value')}:</div>
                                <div><span className="text-slate-600">{formatCurrency(salesStats?.current_year.total_sold_value)}</span></div>
                            </div>
                            <div className="flex justify-between">
                                <div>{t('sales.summary_total_products_sold_cost')}:</div>
                                <div><span className="text-red-600">{formatCurrency(salesStats?.current_year.total_expenses)}</span></div>
                            </div>
                            <div className="flex justify-between">
                                <div>{t('sales.summary_total_profit')}:</div>
                                <div><span className="text-green-600">{formatCurrency(salesStats?.current_year.total_profit)}</span></div>
                            </div>
                        </div>
                    </div>

                </div>}

        </>)
}
export default SalesHomeHeader;