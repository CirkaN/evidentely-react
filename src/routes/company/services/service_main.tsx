import { Link, Outlet, useLocation } from "react-router-dom"

const ServiceMain = () => {
    const location = useLocation();

    const navigation = [
        { name: 'Usluge', href: 'services', current: location.pathname === "/price_plans/services" },
        { name: 'Proizvodi', href: 'products', current: location.pathname === "/price_plans/products" },
        // { name: 'Paketi', href: 'packages', current: location.pathname === "/price_plans/packages" },
        { name: 'Paketi clanarina', href: 'gym_membership_plans', current: location.pathname === "/price_plans/gym_membership_plans" },

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