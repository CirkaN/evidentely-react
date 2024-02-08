import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
type PriceLinks = Record<string, string>;
const RechargeSms = () => {
    const { user } = useUser();
    const devPriceLinks: PriceLinks = {
        first_plan: `https://billing.moj-biznis.rs/checkout/buy/1207a923-f6d2-444d-9db3-2fd2d6d20e59?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default&embed=1`,
        second_plan: `https://billing.moj-biznis.rs/checkout/buy/9d64cf5e-93fb-416b-97e0-2003f730e68a?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default&embed=1`,
        third_plan: `https://billing.moj-biznis.rs/checkout/buy/e6b79fe7-f1bc-439a-8bc3-139b6c5b778e?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default&embed=1`,
    };

    const prodPriceLinks: PriceLinks = {
        first_plan: `https://billing.moj-biznis.rs/checkout/buy/195e3c89-f0a4-49c1-a4ca-0ce29456be71?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default&embed=1`,
        second_plan: `https://billing.moj-biznis.rs/checkout/buy/05963242-b6dd-44e6-ab66-9995955d0089?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default&embed=1`,
        third_plan: `https://billing.moj-biznis.rs/checkout/buy/bcc4306a-d3db-4b2e-82e6-4a29e7eef26b?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default&embed=1`,
    };

    const priceLinks =
        import.meta.env.VITE_ENV == "production"
            ? prodPriceLinks
            : devPriceLinks;
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
                                            to={priceLinks.first_plan}
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
                                            to={priceLinks.second_plan}
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
                                            to={priceLinks.third_plan}
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
