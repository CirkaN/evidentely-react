import { useEffect } from "react";
import { Link } from "react-router-dom";

const PricingPlans = () => {
    const changeToFree = () => {
        console.log("initate free plan");
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.createLemonSqueezy();
    }, []);
    return (
        <>
            <section>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Broj SMS poruka
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Cena
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Dopuni se
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    100 SMS-ova
                                </th>
                                <td className="px-6 py-4">1.100 RSD </td>
                                <td className="px-6 py-4">
                                    <Link
                                        className="lemonsqueezy-button bg-blue-600 pt-2 pb-2 pr-4 pl-4 rounded text-white"
                                        to="https://billing.moj-biznis.rs/checkout/buy/1207a923-f6d2-444d-9db3-2fd2d6d20e59?embed=1"
                                    >
                                        Kupi
                                    </Link>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    200 SMS-ova
                                </th>
                                <td className="px-6 py-4">2.200 RSD</td>
                                <td className="px-6 py-4">
                                    <Link
                                        className="lemonsqueezy-button bg-blue-600 pt-2 pb-2 pr-4 pl-4 rounded text-white"
                                        to="https://billing.moj-biznis.rs/checkout/buy/1207a923-f6d2-444d-9db3-2fd2d6d20e59?embed=1"
                                    >
                                        Kupi
                                    </Link>
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    500 SMS-ova
                                </th>
                                <td className="px-6 py-4">5.600 RSD </td>
                                <td className="px-6 py-4">
                                    <Link
                                        className="lemonsqueezy-button bg-blue-600 pt-2 pb-2 pr-4 pl-4 rounded text-white"
                                        to="https://billing.moj-biznis.rs/checkout/buy/1207a923-f6d2-444d-9db3-2fd2d6d20e59?embed=1"
                                    >
                                        Kupi
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="bg-white ">
                <div className="container px-6 py-8 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold  lg:text-3xl ">
                                Paketi usluga
                            </h2>
                            <p className="mt-4 text-gray-500 ">
                                Svi paketi se naplacuju mesecno, u svakom
                                trenutku mozete menjati planove, sa tim sto
                                ukoliko vec imate placeni plan koji zelite da
                                promenite za neki drugi, ukoliko birate plan
                                ispod vaseg, on ce biti postavljen nakon isteka
                                vec placenog paketa, dok ako se odlucite za
                                unapredjenje usluga, vas paket ce biti odmah
                                promenjen.
                            </p>
                            <p className="mt-4 text-gray-500 ">
                                Dostupne SMS poruke koje imate se ne gube
                                prilikom prelaska na plan iznad / ispod
                            </p>
                            <Link
                                className="mt-4 text-blue-500 text-lg text-center cursor-pointer lemonsqueezy-button"
                                to="https://billing.moj-biznis.rs/checkout/buy/1207a923-f6d2-444d-9db3-2fd2d6d20e59?embed=1"
                            >
                                Ukoliko zelite da dopunite vas SMS kredit,
                                kliknite ovde
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div className=" flex flex-col justify-between bg-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 ">
                            <div className="px-6 py-4">
                                <p className="text-lg font-medium text-gray-800 ">
                                    Besplatan Plan
                                </p>

                                <h4 className="mt-2 text-3xl font-semibold text-gray-800 ">
                                    0.00 RSD{" "}
                                    <span className="text-base font-normal text-gray-600 ">
                                        / Mesecno
                                    </span>
                                </h4>

                                <p className="mt-4 text-gray-500">
                                    Idealan za testiranje softvera.
                                </p>

                                <div className="mt-8 space-y-8">
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            5 sms poruka (jednokratno)
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Do 10 termina mesecno
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Do 5 klijenata
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Analitika
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Email/Chat podrska
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Izmena SMS poruka
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Kreiranje SMS kampanja
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            500MB cloud prostora
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    changeToFree();
                                }}
                                className="w-full px-4 py-3 rounded-b mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Izaberi Plan
                            </button>
                        </div>

                        <div className="flex flex-col justify-between bg-gray-200  transition-colors duration-300 transform rounded-lg hover:bg-gray-300 ">
                            <div className="px-6 py-4">
                                <p className="text-lg font-medium text-gray-800 ">
                                    Premium
                                </p>

                                <h4 className="mt-2 text-3xl font-semibold text-gray-800 ">
                                    1.400 RSD{" "}
                                    <span className="text-base font-normal text-gray-600">
                                        / Mesecno
                                    </span>
                                </h4>

                                <p className="mt-4 text-gray-500">
                                    Idealan za biznise koji imaju do 10
                                    klijenata.
                                </p>

                                <div className="mt-8 space-y-8">
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Neogranicen broj termina
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Neogranicen broj klijenata
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            100 besplatnih SMS poruka
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Analitka (Usluge/Klijenti)
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            2GB cloud prostora
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Izmena SMS poruka po zelji
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Kreiranje SMS kampanja
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Email,Mobilna podrska
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Nedeljni i mesecni izvestaji
                                        </span>
                                    </div>

                                    {/* <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>

                        <span className="mx-4 text-gray-700">Prenos 15% neiskoriscenih SMS poruka u naredni mesec</span>
                    </div> */}
                                </div>
                            </div>

                            <Link
                                className="lemonsqueezy-button w-full px-4 text-center py-3 rounded-b  cursor-pointer mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500  hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                to="https://billing.moj-biznis.rs/checkout/buy/a2e85f9d-c486-4b89-b405-0fe6073af18a?embed=1"
                            >
                                Izaberi Plan
                            </Link>
                        </div>

                        <div className="flex flex-col justify-between transition-colors duration-300 transform bg-slate-600 hover:bg-gray-700 rounded-lg">
                            <div className="px-6 py-4">
                                <p className="text-lg font-medium text-gray-100">
                                    Premium+
                                </p>

                                <h4 className="mt-2 text-3xl font-semibold text-gray-100">
                                    2.500 RSD
                                    <span className="text-base font-normal text-gray-400">
                                        / Mesecno
                                    </span>
                                </h4>

                                <p className="mt-4 text-gray-300">
                                    Pogodan za biznise koji imaju od 10-25
                                    klijenata.
                                </p>

                                <div className="mt-8 space-y-8">
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-300">
                                            150 besplatnih SMS poruka
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-300">
                                            Analtika (Usluge/Klijenti)
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-300">
                                            10GB cloud prostora
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-300">
                                            Izmena SMS poruka po zelji
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-300">
                                            Kreiranje SMS kampanja
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-300">
                                            Email,Mobilna podrska
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-300">
                                            Nedeljni i mesecni izvestaji
                                        </span>
                                    </div>
                                    {/* <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="mx-4 text-gray-300">Prenos 15% neiskoriscenih SMS poruka u naredni mesec
                          </span>
                      </div> */}
                                </div>
                            </div>

                            <Link
                                className="lemonsqueezy-button py-3 rounded-b w-full px-4 text-center  mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500  hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                to="https://billing.moj-biznis.rs/checkout/buy/b99d1ca3-1ce2-4186-b77d-1dfacf2d9405?embed=1"
                            >
                                Izaberi Plan
                            </Link>
                        </div>

                        <div className="flex flex-col justify-between bg-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 ">
                            <div className="px-6 py-4">
                                <p className="text-lg font-medium text-gray-800 ">
                                    Premium++
                                </p>

                                <h4 className="mt-2 text-3xl font-semibold text-gray-800 ">
                                    5.500 RSD{" "}
                                    <span className="text-base font-normal text-gray-600 ">
                                        / Mesecno
                                    </span>
                                </h4>

                                <p className="mt-4 text-gray-500">
                                    Pogodno za biznise koji broje velik broj
                                    klijenata.
                                </p>

                                <div className="mt-8 space-y-8">
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Neogranicen broj termina
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Neogranicen broj klijenata
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            450 besplatnih SMS poruka
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Analitka (Usluge/Klijenti)
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            100GB cloud prostora
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Izmena SMS poruka po zelji
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Kreiranje SMS kampanja
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Prioritetna podrska
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="mx-4 text-gray-700">
                                            Nedeljni i mesecni izvestaji
                                        </span>
                                    </div>
                                    {/* 
                  <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>

                      <span className="mx-4 text-gray-700">Prenos 35% neiskoriscenih SMS poruka u naredni mesec</span>
                  </div> */}
                                </div>
                            </div>

                            <Link
                                className="lemonsqueezy-button w-full px-4 text-center rounded-b py-3 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500  hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                to="https://billing.moj-biznis.rs/checkout/buy/5fe513b3-fa11-49b0-bf54-d93bb819cdb7?embed=1"
                            >
                                Izaberi Plan
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default PricingPlans;
