import { FormEvent, useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { t } from "i18next";

interface ProfileSettingsInterface {
    name: string | undefined,
    email: string | undefined,
    photo: string | undefined | File,
    user_settings: {
        email_daily_report: boolean,
        email_weekly_report: boolean,
        email_monthly_report: boolean,
        email_promo: boolean,
    }
}
interface UserSettingsProps {
    email_daily_report: true,
    email_weekly_report: true,
    email_monthly_report: true,
    email_promo: true
}

interface UserDTO {
    id: number,
    avatar_url: string,
    name: string,
    email: string
}

const ProfileSettings = () => {
    const { user, login } = useUser();
    const [currentUserData, setCurrentUserData] = useState<UserDTO>();
    const [userSettings, setUserSettings] = useState<ProfileSettingsInterface>({
        name: user?.name,
        photo: undefined,
        email: user?.email,
        user_settings: {
            email_daily_report: true,
            email_weekly_report: true,
            email_monthly_report: true,
            email_promo: true
        }
    });
    const applyData = (data: UserSettingsProps) => {
        setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_daily_report: data.email_daily_report } })
        setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_weekly_report: data.email_weekly_report } })
        setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_monthly_report: data.email_monthly_report } })
        setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_promo: data.email_promo } })
    }
    const fetchCurrentData = () => {
        axios_instance().get('/user_settings').then(r => applyData(r.data));
        axios_instance().post('/auth/me').then(r => applyFreshData(r.data));
    }
    const applyFreshData = (data:UserDTO) => {
        login({
            id: data.id,
            name: data.name,
            email: data?.email,
            avatar_url: data.avatar_url
        });
        setCurrentUserData(data);
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        saveGeneralInfo();
    }
    const handleSubmitPromo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        saveForm();
    }
    const saveForm = () => {
        axios_instance().put(`/user_settings/${user?.id}`, userSettings.user_settings).then(() => {
            refreshData();
            toast.success(t('toasts.profile_changed_succesfully'))
        });
    }
    const saveGeneralInfo = () => {
        axios_instance().put(`/clients/${user?.id}`, {
            name: userSettings.name,
            email: userSettings.email,
        }).then(() => {
            refreshData();
            toast.success(t('toasts.profile_changed_succesfully'))
        });
    }
    const saveAvatar = () => {
        const formData = new FormData();
        if (userSettings.photo) {
            formData.append('file', userSettings.photo);
        }
        formData.append('type', 'image');

        axios_instance().post(`user_settings/${user?.id}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(() => {
            toast.success('Slika uspesno izmenjena')
            refreshData();
        }).catch(() => {
            toast.error(t('toasts.please_upload_valid_avatar'))
        })
    }
    const refreshData = () => {
        fetchCurrentData();

    }
    useEffect(() => {
        fetchCurrentData();
    }, [])
    useEffect(() => {
        if (currentUserData) {
            setUserSettings((c) => c && { ...c, name: currentUserData.name })
            setUserSettings((c) => c && { ...c, email: currentUserData.email })
        }
    }, [currentUserData])



    return (

        <div className="flex">
            <div className="w-1/3 hidden sm:block">

            </div>
            <div className="w-full sm:w:1/3">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profil</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Ove informacije se odnose samo na vas profil.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Slika profila
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <img src={currentUserData?.avatar_url} width={150} height={150} alt="" />
                                    <input
                                        type="file"
                                        onChange={(e) => { setUserSettings((c) => c && { ...c, photo: e.target.files ? e.target.files[0] : undefined }) }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => { saveAvatar() }}
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Informacije o korisniku</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Molimo unesite tacne informacije kako bi smo mogli da saljemo dnevne / nedeljne / mesecne izvestaje .</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Ime i prezime
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={userSettings.name}
                                            onChange={(e) => { setUserSettings((c) => c && { ...c, name: e.target.value }) }}
                                            required={true}
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        E-mail adresa
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={userSettings.email}
                                            onChange={(e) => { setUserSettings((c) => c && { ...c, email: e.target.value }) }}
                                            required={true}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Drzava
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            required={true}
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>Srbija</option>
                                            {/* <option>Canada</option>
                                            <option>Mexico</option> */}
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="street-address"
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {t('common.save')}
                            </button>

                        </div>
                    </form>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifikacije</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Izaberite vrstu notifikacija koje biste zeleli dobijate na vas e-mail
                        </p>

                        <div className="mt-10 space-y-10">
                            <form onSubmit={handleSubmitPromo}>
                                <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">Putem e-adrese (email)</legend>
                                    <div className="mt-6 space-y-6">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    checked={userSettings.user_settings.email_daily_report}
                                                    onChange={(e) => { setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_daily_report: e.target.checked } }) }}
                                                    id="comments"
                                                    name="comments"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="comments" className="font-medium text-gray-900">
                                                    Dnevni izvestaj
                                                </label>
                                                <p className="text-gray-500">Dobijte besplatan dnevni izvestaj na osnovu podataka iz aplikacije (dugovanja/profit) (13PM).</p>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    checked={userSettings.user_settings.email_weekly_report}
                                                    onChange={(e) => { setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_weekly_report: e.target.checked } }) }}
                                                    id="email_weekly_report"
                                                    name="email_weekly_report"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="candidates" className="font-medium text-gray-900">
                                                    Nedeljni izvestaj
                                                </label>
                                                <p className="text-gray-500">Dobijte besplatan nedeljni izvestaj na osnovu podataka iz aplikacije (dugovanja/profit).</p>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    checked={userSettings.user_settings.email_monthly_report}
                                                    onChange={(e) => { setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_monthly_report: e.target.checked } }) }}
                                                    id="email_monthly_report"
                                                    name="email_monthly_report"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="candidates" className="font-medium text-gray-900">
                                                    Mesecni izvestaj
                                                </label>
                                                <p className="text-gray-500">Dobijte besplatan mesecni izvestaj na osnovu podataka iz aplikacije (dugovanja/profit).</p>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                    checked={userSettings.user_settings.email_promo}
                                                    onChange={(e) => { setUserSettings((c) => c && { ...c, user_settings: { ...c.user_settings, email_promo: e.target.checked } }) }}
                                                    id="promo"
                                                    name="promo"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="promo" className="font-medium text-gray-900">
                                                    Akcije
                                                </label>
                                                <p className="text-gray-500">Budite obavesteni o akcijama i novinama u softveru.</p>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {t('common.save')}
                                    </button>
                                </div>
                            </form>
                            {/* <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">Notifikacije putem mobilnog uredjaja</legend>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Ove notifikacije saljemo putem SMS-a, koriste se poruke sa vaseg naloga</p>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="push-everything"
                                                name="push-notifications"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                Nedeljni izvestaj o dugovanjima
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="push-email"
                                                name="push-notifications"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Podsetnik pred termin (2h ranije)
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="push-nothing"
                                                name="push-notifications"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                Ne zelim SMS obavestenja
                                            </label>
                                        </div>
                                    </div>
                                </fieldset> */}
                        </div>
                    </div>
                </div>





            </div>

            <div className="w-1/3 hidden sm:block">

            </div>

        </div>

    )
}
export default ProfileSettings;