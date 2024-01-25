import { useEffect, useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
type Value = ValuePiece | [ValuePiece, ValuePiece];
type ValuePiece = Date | string | null;

interface AnalyticsDatePickerProps {
    fetchFn: (calendarValues: Value) => void;
}

const AnalyticsDatePicker = (props: AnalyticsDatePickerProps) => {
    interface AnalyticFilter {
        predefined_type: "day" | "week" | "month" | "year" | "custom";
        start_date: Date | string;
        end_date: Date | string;
    }
    const [activeFilter, setActiveFilter] = useState<AnalyticFilter>({
        predefined_type: "month",
        start_date: new Date(new Date().setDate(1)).toISOString().split("T")[0],
        end_date: new Date(
            new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0),
        )
            .toISOString()
            .split("T")[0],
    });
    const [calendarValues, setCalendarValues] = useState<Value>([
        new Date(new Date().setDate(1)).toISOString().split("T")[0],
        new Date(
            new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0),
        )
            .toISOString()
            .split("T")[0],
    ]);
    const [activeCalendarView, setActiveCalendarView] = useState(false);
    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(" ");
    };

    const handlePredefinedTypeChanged = () => {
        if (activeFilter.predefined_type === "custom") {
            setActiveCalendarView(true);
        }
        if (activeFilter.predefined_type === "day") {
            const values = [new Date(), new Date()];
            //  props.fetchFn(values as Value);
            setCalendarValues(values as Value);
        }
        if (activeFilter.predefined_type === "week") {
            const values = [
                new Date(
                    new Date().setDate(
                        new Date().getDate() - new Date().getDay(),
                    ),
                ),
                new Date(
                    new Date().setDate(
                        new Date().getDate() - new Date().getDay() + 7,
                    ),
                ),
            ];
            // props.fetchFn(values as Value);
            setCalendarValues(values as Value);
        }
        if (activeFilter.predefined_type === "month") {
            const values = [
                new Date(new Date().setDate(1)),
                new Date(
                    new Date(
                        new Date().setMonth(new Date().getMonth() + 1),
                    ).setDate(0),
                ),
            ];
            //props.fetchFn(values as Value);
            setCalendarValues(values as Value);
        }
        if (activeFilter.predefined_type === "year") {
            const values = [
                new Date(new Date().getFullYear(), 0, 1),
                new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999),
            ];
            //    props.fetchFn(values as Value);
            setCalendarValues(values as Value);
        }
    };
    const mutateButtons = () => {
        return (
            <>
                <button
                    onClick={() =>
                        setActiveFilter(
                            (c) => c && { ...c, predefined_type: "day" },
                        )
                    }
                    className={classNames(
                        activeFilter.predefined_type === "day"
                            ? "underline"
                            : "",
                        " py-2 text-md text-gray-700",
                    )}
                >
                    Dan
                </button>
                <button
                    onClick={() =>
                        setActiveFilter(
                            (c) => c && { ...c, predefined_type: "week" },
                        )
                    }
                    className={classNames(
                        activeFilter.predefined_type === "week"
                            ? "underline"
                            : "",
                        " py-2 text-md text-gray-700",
                    )}
                >
                    Nedelja
                </button>
                <button
                    onClick={() =>
                        setActiveFilter(
                            (c) => c && { ...c, predefined_type: "month" },
                        )
                    }
                    className={classNames(
                        activeFilter.predefined_type === "month"
                            ? "underline"
                            : "",
                        "  py-2 text-md text-gray-700",
                    )}
                >
                    Mesec
                </button>
                <button
                    onClick={() =>
                        setActiveFilter(
                            (c) => c && { ...c, predefined_type: "year" },
                        )
                    }
                    className={classNames(
                        activeFilter.predefined_type === "year"
                            ? "underline"
                            : "",
                        " py-2 text-md text-gray-700",
                    )}
                >
                    Godina
                </button>
                <button
                    onClick={() =>
                        setActiveFilter(
                            (c) => c && { ...c, predefined_type: "custom" },
                        )
                    }
                    className={classNames(
                        activeFilter.predefined_type === "custom"
                            ? "underline"
                            : "",
                        " py-2 text-md text-gray-700",
                    )}
                >
                    Odaberi
                </button>
                <DateRangePicker
                    isOpen={activeCalendarView}
                    onChange={setCalendarValues}
                    value={calendarValues}
                />
                <button
                    onClick={() => {
                        props.fetchFn(calendarValues);
                    }}
                    className="rounded bg-slate-600 text-slate-100 p-2 hover:bg-slate-700"
                >
                    Potvrdi
                </button>
            </>
        );
    };
    useEffect(() => {
        handlePredefinedTypeChanged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter.predefined_type]);
    return (
        <>
            <div className="flex flex-wrap justify-center space-x-3 items-center">
                {mutateButtons()}
            </div>
        </>
    );
};
export default AnalyticsDatePicker;
