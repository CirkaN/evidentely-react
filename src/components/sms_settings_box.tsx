import { useTranslation } from "react-i18next";

interface SmsSettingsProps {
    headerText: string;
    subHeaderText: string;
    mainText: string;
    type: string;
    onClickFunction: () => unknown;
}

const SmsSettingsBox = (props: SmsSettingsProps) => {
    const { t } = useTranslation();
    return (
        <div className="mb-5 md:mr-2 w-full md:w-1/2 bg-white p-6 border-2 rounded-lg">
            <h5 className="mb-2 text-xl text-center font-medium leading-tight text-neutral-800">
                {props.headerText}
            </h5>
            <h5 className="mb-2 text-md text-center font-medium leading-tight text-neutral-800">
                {props.subHeaderText}
            </h5>
            <p className="mb-4 text-base text-neutral-600">{props.mainText}</p>
            <div className="flex justify-center">
                <button
                    onClick={() => {
                        props.onClickFunction();
                    }}
                    type="button"
                    className="hover:bg-slate-300 inline-block rounded bg-slate-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                >
                    {t("common.change")}
                </button>
            </div>
        </div>
    );
};
export default SmsSettingsBox;
