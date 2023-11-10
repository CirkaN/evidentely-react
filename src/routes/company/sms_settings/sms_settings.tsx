import { useState } from "react";

const SmsSettings = () => {

    const [userHasMobileVerified, setUserHasMobileVerified] = useState(true);

    const [smsSettings, setSmsSettings] = useState({
        sms_language: "sr",

    })


    return (
        <>

            {userHasMobileVerified &&

                <>
 <div className="px-4">
                        <p className="text-2xl text-center mb-5">Obavestite klijente o terminima</p>
                        <div className="flex flex-col md:flex-row">
                            <div className="mb-5 md:mr-2 w-full md:w-1/2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Potvrda termina
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    Pri kreiranju termina
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mb-5 md:ml-2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Dan Ranije
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    u 19:00h
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mb-5 md:ml-2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Istog dana
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    2h pre termina
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">Pokazite klijentima da vam je stalo</p>
                        <div className="flex flex-col md:flex-row">
                            <div className="mb-5 md:mr-2 w-full md:w-1/2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Zahvalnica
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    2 sata posle termina
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mb-5 md:ml-2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Rodjendanska cestitka
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    u 10:00 am
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="px-4">
                        <p className="text-2xl text-center mb-5">Podešavanja SMS poruke za zaposlene</p>
                        <div className="flex flex-col md:flex-row">
                            <div className="mb-5 md:mr-2 w-full md:w-1/2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Potvrda zaposlenom
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    2 sata ranije
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mb-5 md:ml-2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Potvrda zaposlenom
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    pri zakazivanju
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mb-5 md:ml-2 bg-white p-6 border-2 rounded-lg">
                                <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                                    Potvrda zaposlenom
                                </h5>
                                <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                                    pri promeni termina
                                </h5>
                                <p className="mb-4 text-base text-neutral-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum minus blanditiis quisquam animi quibusdam pariatur hic est temporibus, impedit laudantium.
                                </p>
                                <div className="flex justify-center">
                                    <button type="button" className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700">
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default SmsSettings;