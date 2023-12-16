import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom"

const CompanySettings = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex ">

                <div className="basis-full bg-slate-100 px-10 py-10">
                    <div className="px-5">
                        <div className="pb-1 font-sans text-2xl font-semibold">{t('common.settings')}</div>
                    </div>
                    <div className="h-full px-5 py-5">
                        <div className="h-full bg-white p-5 rounded shadow-md">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CompanySettings;