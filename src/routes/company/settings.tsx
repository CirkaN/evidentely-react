import { Outlet, useNavigate } from "react-router-dom"

const CompanySettings = ()=>{
    const navigate  = useNavigate();
    return (
        <>
        <div className="flex ">
            <div className="basis-1/3">
                <div className="min-h-screen rounded-sm border bg-slate-50">
                    <p className="py-10 text-center text-xl">Podesavanja</p>
                    <p className="text-center text-gray-700">
                        <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('employees') }}>[F] Zaposleni</button>
                    </p>
                    <p className="text-center text-gray-700">
                        <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('sms_settings') }}> [F] Sms podesavanja</button>
                    </p>
                    <p className="text-center text-gray-700">
                        <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('price_plans/products') }}>[F] Price Plans</button>
                    </p>
                    {/* <p className="text-center text-gray-700">
                        <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('settings') }}>[F] Lista troskova</button>
                    </p> */}
                </div>
            </div>
            <div className="basis-full bg-slate-100 px-10 py-10">
                <div className="px-5">
                    <div className="pb-1 font-sans text-2xl font-semibold">Podesavanja</div>
                    primer/tidajem
                </div>

                <div className="h-full px-5 py-5">
                    <div className="h-full bg-white p-5 rounded shadow-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    </>

    )
}

export default CompanySettings;