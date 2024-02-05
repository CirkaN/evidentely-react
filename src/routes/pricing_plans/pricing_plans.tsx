import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import clsx from "clsx";
import axios_instance from "../../config/api_defaults";
import { t } from "i18next";
import SweetAlert2 from "react-sweetalert2";
import toast from "react-hot-toast";
import { Callout } from "@radix-ui/themes";
import { Info } from "react-feather";

type PriceLinks = Record<string, string>;

const PricingPlans = () => {
    const { user, refreshUserState } = useUser();
    const [swalProps, setSwalProps] = useState({});
    const priceLinks: PriceLinks = {
        free_link: `https://billing.moj-biznis.rs/checkout/buy/d7de9e27-5d0a-4712-bbbf-21c0dfeb7485?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default`,
        premium_link: `https://billing.moj-biznis.rs/checkout/buy/a2e85f9d-c486-4b89-b405-0fe6073af18a?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default`,
        premiumplus_link: `https://billing.moj-biznis.rs/checkout/buy/b99d1ca3-1ce2-4186-b77d-1dfacf2d9405?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default`,
        premiumplusplus_link: `https://billing.moj-biznis.rs/checkout/buy/5fe513b3-fa11-49b0-bf54-d93bb819cdb7?checkout[email]=${user?.email}&checkout[name]=${user?.name}&checkout[billing_address][country]=RS&checkout[custom][billable_id]=${user?.id}&checkout[custom][billable_type]=App\\Models\\User&checkout[custom][subscription_type]=default`,
    };
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        window.createLemonSqueezy();
    }, []);
    const raiseCancelAlert = () => {
        setSwalProps({
            show: true,
            icon: "error",
            title: t("common.please_confirm"),
            text: t("subscription.cancel_plan_sweet"),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t("common.cancel"),
            confirmButtonText: t("common.accept"),
            confirmButtonColor: "red",
            onConfirm: () => {
                cancelPlan();
            },
            onResolve: setSwalOff,
        });
    };
    const raiseReactivationAlert = () => {
        setSwalProps({
            show: true,
            icon: "success",
            title: t("common.please_confirm"),
            text: t("subscription.reactivate_for_free"),
            cancelButtonColor: "red",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t("common.cancel"),
            confirmButtonText: t("common.accept"),
            confirmButtonColor: "green",
            onConfirm: () => {
                reactivatePlan();
            },
            onResolve: setSwalOff,
        });
    };

    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }

    const reactivatePlan = () => {
        axios_instance()
            .post("/subscription/resume/")
            .then((r) => {
                if (r.data.success) {
                    toast.success(t("subscription.reactivation_success"));
                    refreshUserState();
                } else {
                    toast.error("Nemate permisije za ovu akciju");
                    refreshUserState();
                }
            });
    };

    const generateButton = (type: string) => {
        if (user?.company.plan_name.toLowerCase() === type) {
            return (
                <button
                    className={clsx(
                        "lemonsqueezy-button  w-full px-4 text-center py-3 rounded-b  cursor-pointer mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  focus:outline-none focus:bg-blue-600",
                        user?.company.plan_name.toLocaleLowerCase() == type
                            ? "bg-red-500 hover:bg-red-600 "
                            : "bg-blue-500 hover:bg-blue-600",
                    )}
                    onClick={() => {
                        user.company.is_plan_cancelled &&
                        user.company.is_subscription_resumable
                            ? raiseReactivationAlert()
                            : raiseCancelAlert();
                    }}
                >
                    {user.company.is_plan_cancelled &&
                    user.company.is_subscription_resumable
                        ? "[Otkazan] Reaktiviraj"
                        : "Otkazi"}
                </button>
            );
        } else if (user?.company.plan_name.toLowerCase() === "probni") {
            return (
                <Link
                    className={clsx(
                        "lemonsqueezy-button  w-full px-4 text-center py-3 rounded-b  cursor-pointer mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  focus:outline-none focus:bg-blue-600",
                        user?.company.plan_name == "Premium"
                            ? "bg-red-500 hover:bg-red-600 "
                            : "bg-blue-500 hover:bg-blue-600",
                    )}
                    to={getPackageLink(type)}
                >
                    Odaberi Plan
                </Link>
            );
        } else {
            return (
                <button
                    className={clsx(
                        "lemonsqueezy-button  w-full px-4 text-center py-3 rounded-b  cursor-pointer mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform  focus:outline-none focus:bg-blue-600",
                        user?.company.plan_name.toLowerCase() == type
                            ? "bg-red-500 hover:bg-red-600 "
                            : "bg-blue-500 hover:bg-blue-600",
                    )}
                    onClick={() => {
                        changePlan(type);
                    }}
                >
                    Promeni plan
                </button>
            );
        }
    };
    const getPackageLink = (type: string) => {
        const productType = type.toLowerCase();
        if (productType == "premium") {
            return priceLinks.premium_link;
        }
        if (productType == "premium+") {
            return priceLinks.premiumplus_link;
        }
        if (productType == "premium++") {
            return priceLinks.premiumplusplus_link;
        }

        return "";
    };
    const changePlan = (desired_plan: string) => {
        axios_instance()
            .post(`/subscriptions/swap/${desired_plan}`)
            .then((r) => {
                console.log(r);
            });
    };
    const cancelPlan = () => {
        axios_instance()
            .post("/subscriptions/cancel/")
            .then(() => {
                toast.success(t("subscription.cancel_plan_success"));
                refreshUserState();
            });
    };
    return (
        <>
            <SweetAlert2 {...swalProps} />
            <section className="bg-white ">
                <Callout.Root>
                    <Callout.Icon>
                        <Info size={18} />
                    </Callout.Icon>
                    <Callout.Text color="iris">
                        Trenutno ste na probnom paketu aplikacije, idealan za
                        testiranje dok se odlučite za paket usluga. U ponudi
                        imamo vise tipova paketa, ukoliko vam je potreban
                        poseban izbor usluga, kontaktirajte našu korisničku
                        službu radi.
                        <p className="underline">
                            kreiranja personalizovanog paketa
                        </p>
                    </Callout.Text>
                </Callout.Root>
                <div className="container px-6 py-8 mx-auto">
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

                            {generateButton("besplatan plan")}
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

                            {generateButton("premium")}
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
                            {generateButton("premium+")}
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
                            {generateButton("premium++")}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default PricingPlans;
