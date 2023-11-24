import { Link, Outlet, useLocation } from "react-router-dom"

const ServiceMain = () => {
    const location = useLocation(); // use useLocation hook to get the current location

    const navigation = [
        { name: 'Proizvodi', href: '/company_settings/price_plans/products', current: location.pathname === "/company_settings/price_plans/products" },
        { name: 'Usluge', href: '/company_settings/price_plans/services', current: location.pathname === "/company_settings/price_plans/services" },
        { name: 'Paketi', href: '/company_settings/price_plans/packages', current: location.pathname === "/company_settings/price_plans/packages" },
    ]

    const transformedHtml = navigation.map((element) => {

        const classNames = (...classes: string[]) => {
            return classes.filter(Boolean).join(' ')
        }

        return <li key={element.name} role="presentation">
            <Link
                to={element.href}
                className={classNames('my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:isolate hover:border-slate-500  focus:isolate focus:border-transparent border-primary-400 ', element.current ? "bg-slate-500 text-white" : "text-neutral-500")}
            >{element.name}</Link>
        </li>
    })


    return (
        <>
            <ul
                className="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0"
                id="tabs-tab3"
                role="tablist"
                data-te-nav-ref>
                {transformedHtml}
            </ul>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default ServiceMain