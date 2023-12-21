const AdminHomeAnalyticPill = () => {
    return (
        <>
            <div className="max-w-sm w-full border border-slate-300 rounded-lg shadow  p-4 md:p-6">
                <div className="flex justify-between">
                    <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-900  pb-2">32.4k</h5>
                        <p className="text-base font-normal text-gray-700">Clients this week</p>
                    </div>
                </div>
                <div id="area-chart"></div>
                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                    <div className="flex justify-between items-center pt-5">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center">Last 7 days</p>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AdminHomeAnalyticPill;