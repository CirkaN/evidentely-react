const SalesHomeHeader = ()=>{
    return (
        <>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow space-y-2 ">
                        <p className="text-center">Sales this month:</p>
                        <div className="flex justify-between ">
                            <div>Total in sales:</div>
                            <div><span className="text-slate-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>Total in cost:</div>
                            <div><span className="text-red-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>Total profit:</div>
                            <div><span className="text-green-600">$1500</span></div>
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow space-y-2 ">
                        <p className="text-center">Pending sales this month:</p>
                        <div className="flex justify-between ">
                            <div>Total pending products:</div>
                            <div><span className="text-slate-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>Total pending cost:</div>
                            <div><span className="text-red-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>Total pending profit:</div>
                            <div><span className="text-green-600">$1500</span></div>
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                    <div className="bg-white p-4 rounded shadow space-y-2 ">
                        <p className="text-center">Yearly statistic:</p>
                        <div className="flex justify-between ">
                            <div>Total sold products:</div>
                            <div><span className="text-slate-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>Total cost:</div>
                            <div><span className="text-red-600">$1500</span></div>
                        </div>
                        <div className="flex justify-between">
                            <div>Total profit:</div>
                            <div><span className="text-green-600">$1500</span></div>
                        </div>
                    </div>
                </div>

            </div>

        </>)
}
export default SalesHomeHeader;