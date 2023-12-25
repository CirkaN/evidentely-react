import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Auth from "../auth";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { BarChart, Calendar, DollarSign, Grid, Plus, Settings, Share2, Users } from "react-feather";

const MyLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [collapsedMenies, setCollapsedMenies] = useState({
        analytics: location.pathname.startsWith("/analytics"),
        settings: false,
    });

    const navRoutes = [
        {
            name: t('navbar.main_dashboard'),
            icon: <Grid size={20} />,
            href: '/main_dashboard', current: location.pathname == "/main_dashboard"
        },
        {
            name: t('navbar.clients'),
            icon: <Users size={20} />,
            href: '/clients', current: location.pathname.startsWith("/clients")
        },
        {
            name: t('navbar.calendar'),
            icon: <Calendar size={20} />,
            href: '/calendar', current: location.pathname === "/calendar"
        },
        {
            name: t('navbar.sales'),
            icon: <DollarSign size={20} />,
            href: '/sales',
            current: location.pathname === "/sales"
        },
        {
            name: t('navbar.settings.items_and_products'),
            icon: <Plus size={20} />,
            href: 'price_plans/products',
            current: location.pathname === ("price_plans/products")
        },
        {
            name: t('navbar.settings.employees'),
            icon: <Share2 size={20} />,
            href: '/employees',
            current: location.pathname === ("employees")
        },
        {
            name: t('navbar.main_settings'),
            key: "settings",
            icon: <Settings size={20} />,
            current: location.pathname.startsWith("/company_settings"),
            items: [
                {
                    name: t('navbar.settings.sms_settings'),
                    href: '/company_settings/sms_settings',
                    current: location.pathname === ("/company_settings/sms_settings")
                }
            ]
        },
        {
            name: t('navbar.analytics_main'),
            key: "analytics",
            icon: <BarChart size={20} />,
            items: [
                {
                    name: t('navbar.analytics.clients'),
                    href: '/analytics/clients',
                    current: location.pathname === ("/analytics/clients")
                },
                {
                    name: t('navbar.analytics.finance'),
                    href: '/analytics/finance',
                    current: location.pathname === ("/analytics/finance")
                },
            ],
            current: location.pathname.startsWith("/analytics"),
        },
    ];
    const changeState = (key: keyof typeof collapsedMenies) => {
        setCollapsedMenies((c) => c && { ...c, [key]: !c[key] })
    }
    const isMenuCollapsed = (key: keyof typeof collapsedMenies) => {
        return collapsedMenies[key]
    }

    useEffect(() => {
        if (location.pathname === "/") {
            navigate('/main_dashboard');

        }
        setCollapsedMenies((c) => c && { ...c, "analytics": location.pathname.startsWith('/analytics') })
        setCollapsedMenies((c) => c && { ...c, "settings": location.pathname.startsWith('/company_settings') })
    }, [location])

    const mapRoutes = () => {
        return navRoutes.map((e) => {
            return (
                <li key={e.name}>
                    {e.href &&
                        <Link className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" to={e.href}>
                            {e.icon}
                            <span className={clsx("ms-3", e.current && "font-bold")}>{e.name}</span>
                        </Link>
                    }
                    {!e.href &&
                        <>
                            <button onClick={() => { changeState(e.key as keyof typeof collapsedMenies) }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {e.icon}
                                <span className="ms-3">{e.name}</span>
                            </button>
                            <ul className={`space-y-2 font-medium ${isMenuCollapsed(e.key as keyof typeof collapsedMenies) ? 'block' : 'hidden'}`}>
                                {e.items?.map((e) => {
                                    return (
                                        <li key={e.name}>
                                            <Link className={clsx('flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group', e.current && 'font-bold')} to={e.href}>
                                                <span className="ms-3"> {e.name}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    }

                </li>
            );
        });
    }


    const toggleNavbar = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };
    return (
        <>
            <Auth></Auth>
            <nav
                className="fixed top-0 z-50 w-full bg-white border-b
 border-gray-200 dark:bg-gray-800 dark:border-gray-700">

                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg onClick={toggleNavbar} className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>

                            <Link className="flex ms-2 md:me-24" to="/">
                                <img src="/evi_logo.png" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MOJ-BIZNIS.RS</span>
                            </Link>

                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                    </button>
                                </div>
                                <div
                                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded 
                                 shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="dropdown-user"
                                    style={{
                                        position: "absolute", inset:
                                            "0px auto auto 0px", margin:
                                            "0px",
                                        transform: "translate3d(1700.5px, 54px, 0px)"
                                    }}
                                >

                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>

                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                        </li>
                                        <li>

                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar"


                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform 
  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${isNavCollapsed ? '-translate-x-full' : ''
                    }`}

                aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {mapRoutes()}
                    </ul>
                </div>

            </aside>
            <div className="p-4 sm:ml-64">
                <div className="p-4  border-gray-200  rounded-lg dark:border-gray-700 mt-14">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default MyLayout