import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import Select, { SingleValue } from 'react-select'
interface Register {
    email: string,
    password: string
}

interface RegistrationForm {
    company_name: string,
    name: string,
    password: string,
    email: string,
    business_type_slug: string
}


const Register = () => {
    const servicesTransformed = [
        {
            label: "Advokat",
            value: "advokat"
        },
        {
            label: "Kozmeticki Salon",
            value: "kozmeticki_salon"
        },
        {
            label: "Teratana",
            value: "teretana"
        },
        {
            label: "Frizerski Salon",
            value: "frizerski_salon"
        },
        {
            label: "Stomatologija",
            value: "stomatologija"
        },
        {
            label: "Salon Masaze",
            value: "salon_masaze"
        },
        {
            label: "Edukacioni centar",
            value: "edukacioni_centar"
        },
        {
            label: "Privatna skola",
            value: "privatna_skola"
        },
        {
            label: "Privatni casovi",
            value: "privatni_casovi"
        },
        {
            label: "Medicina",
            value: "medicina"
        },

    ];

    const navigate = useNavigate();
    const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
        "company_name": "",
        "name": "",
        "password": "",
        "email": "",
        "business_type_slug": "",
    });

    const openLogin = () => {
        navigate('/login');
    }
    const doRegister = () => {
        axios_instance().post('/auth/register', registrationForm).then(() => {
            navigate('/login?registration_success')
        }).catch((e) => {
            Object.keys(e.response.data.errors).forEach(field => {
                toast.error(`Field: ${field}, Error: ${e.response.data.errors[field].join(', ')}`);
            });
        })
    }
    const setBusinessType = (e: SingleValue<{ value: string; label: string; }>) => {
        if (e?.value) {
            setRegistrationForm((c) => c && { ...c, business_type_slug: e.value })
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        doRegister();
    }

    return (<>
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                            className="w-32 mx-auto" />
                    </div>
                    <div className="mt-10 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Registruj se
                        </h1>
                        <div className="w-full flex-1 mt-1">

                            <form className="mt-6" onSubmit={handleSubmit}>
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Registruj novi nalog
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <div>
                                        <label className="pt-5">Ime I Prezime:</label>
                                        <input
                                            value={registrationForm.name}
                                            onChange={(e) => { setRegistrationForm((c) => c && { ...c, name: e.target.value }) }}
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="text" placeholder="Ime I Prezime" />
                                    </div>
                                    <div>
                                        <label className="">Email:</label>
                                        <input
                                            value={registrationForm.email}
                                            onChange={(e) => { setRegistrationForm((c) => c && { ...c, email: e.target.value }) }}
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="email" placeholder="Email" />
                                    </div>


                                    <div className="">
                                        <label className="pt-5">Ime radnje:</label>
                                        <input
                                            value={registrationForm.company_name}
                                            onChange={(e) => { setRegistrationForm((c) => c && { ...c, company_name: e.target.value }) }}
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="text" placeholder="Ime radnje / firme" />
                                    </div>
                                    <div>
                                        <label className="pt-5">Sifra:</label>
                                        <input
                                            value={registrationForm.password}
                                            onChange={(e) => { setRegistrationForm((c) => c && { ...c, password: e.target.value }) }}
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="password" placeholder="Sifra" />
                                    </div>
                                    <div>
                                        <label>Delatnost:</label>

                                        <Select isSearchable={true}
                                            required={true}
                                            onChange={(e) => { setBusinessType(e) }}
                                            className="w-full rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            options={servicesTransformed} />
                                    </div>
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            Registruj se
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => { openLogin() }}
                                        className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                                        <span className="ml-3">
                                            Imate nalog? Ulogujte se
                                        </span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Prihvatam
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            <span> Uslove koriscenja </span>
                                        </a>
                                        <span> i </span>
                                        <a href="#" className="border-b border-gray-500 border-dotted">
                                            <span> Politiku Privatnosti</span>
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                        <img src="https://admin.moj-biznis.rs/moj_biznis_dark.webp" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>);


}
export default Register