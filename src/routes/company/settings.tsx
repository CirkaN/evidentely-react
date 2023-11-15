import { Settings, Star, Users } from "react-feather";
import { Outlet, useNavigate } from "react-router-dom"

const CompanySettings = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex ">
                <div className="basis-1/3">
                    <div className="min-h-screen rounded-sm border bg-slate-50">
                        <p className="py-10 text-center text-xl">Podesavanja</p>
                        <p className="text-center text-gray-700">
                            <button className="flex items-center space-x-1 rounded-md p-1 px-4" onClick={() => { navigate('employees') }}>
                                <Users className="w-4 h-4" />
                                <span>Zaposleni</span>
                            </button>                    </p>
                        <p className="text-center text-gray-700">
                        <button className="flex items-center space-x-1 rounded-md p-1 px-4" onClick={() => { navigate('sms_settings') }}>
                                <Settings className="w-4 h-4" />
                                <span>Sms Podesavanja</span>
                            </button>  
                        </p>
                        <p className="text-center text-gray-700">
                        <button className="flex items-center space-x-1 rounded-md p-1 px-4" onClick={() => { navigate('price_plans/products') }}>
                                <Star className="w-4 h-4" />
                                <span>Usluge I Proizvodi</span>
                            </button>  
                        </p>
                        {/* <p className="text-center text-gray-700">
                        <button className="space-x-1 rounded-md p-1 px-20" onClick={() => { navigate('settings') }}>[F] Lista troskova</button>
                    </p> */}
                    </div>
                </div>
                <div className="basis-full bg-slate-100 px-10 py-10">
                    <div className="px-5">
                        <div className="pb-1 font-sans text-2xl font-semibold">Podesavanja</div>
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