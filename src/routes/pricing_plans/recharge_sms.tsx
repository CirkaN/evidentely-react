import { Link } from "react-router-dom";

const RechargeSms = () => {
    return (
        <>
            <section>
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold  lg:text-3xl ">
                            Dopuna SMS kredita
                        </h2>
                        <p className="mt-4 text-gray-500 ">
                            Ovde mozete dopuniti vase SMS poruke ukoliko ste
                            potrosili sve besplatne SMS poruke iz paketa iz
                            pretplate.
                        </p>
                        <p className="mt-4 text-gray-500 ">
                            U toku je promocija u kojoj za svaki kupljeni SMS
                            zadrzavate pravo da ga iskorstite u bilo kom
                            periodu, tj vase sms poruke nemaju rok trajanja, sve
                            dok ste u pretplati na nekom od paketa.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center pt-[100px]">
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
                </div>
            </section>
        </>
    );
};
export default RechargeSms;
