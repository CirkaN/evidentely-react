import { useTranslation } from "react-i18next";

const SalesHomeHeader = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow space-y-2 ">
                        <p className="text-center">{t('sales.summary_this_month')}:</p>
                        <div className="flex justify-between ">
                            <div>Total in sales:</div>
                            <div><span className="text-slate-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>{t('sales.summary_total_cost')}:</div>
                            <div><span className="text-red-600">$500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>{t('sales.summary_total_profit')}:</div>
                            <div><span className="text-green-600">$1000</span></div>
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow space-y-2 ">
                        <p className="text-center">{t('sales.summary_pending_sales_this_month')}:</p>
                        <div className="flex justify-between ">
                            <div>{t('sales.summary_total_unpaid_product_value')}:</div>
                            <div><span className="text-slate-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>{t('sales.summary_total_pending_cost')}:</div>
                            <div><span className="text-red-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>{t('sales.summary_total_pending_profit')}</div>
                            <div><span className="text-green-600">$1500</span></div>
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow space-y-2 ">
                        <p className="text-center">{t('sales.summary_yearly_statistic')}:</p>
                        <div className="flex justify-between ">
                            <div>{t('sales.summary_total_products_sold_in_value')}:</div>
                            <div><span className="text-slate-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>{t('sales.summary_total_products_sold_cost')}:</div>
                            <div><span className="text-red-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>{t('sales.summary_total_profit')}:</div>
                            <div><span className="text-green-600">$1500</span></div>
                        </div>
                    </div>
                </div>

            </div>

        </>)
}
export default SalesHomeHeader;