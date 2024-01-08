import { ReactNode, createContext, useContext, useState } from "react";

interface ActivePricePlan {
    available_sms:number,
    price_plan_name:string,
    expires_for_human:string
}
interface ActivePricePlanProps {
    children: ReactNode,
}
interface ActivePricePlanContextProps {
    activePlan: ActivePricePlan | null;
    setActivePlan: (activePlan: ActivePricePlan) => void;
}

const ActivePricePlanContext = createContext<ActivePricePlanContextProps | null>(null);

const useActivePlan = () => {
    const context = useContext(ActivePricePlanContext);
    if (!context) {
        throw new Error('useActivePlan must be used within a ActivePlanProvider');
    }
    return context;
};

const ActivePlanProvider = (props: ActivePricePlanProps) => {
    const storedActivePlan = JSON.parse(localStorage.getItem('active_price_plan') || 'null');
    const [activePlan, setPlan] = useState<ActivePricePlan | null>(storedActivePlan);

    const setActivePlan = (newActivePlan: ActivePricePlan) => {
        setPlan(() => {
            localStorage.setItem('active_price_plan', JSON.stringify(newActivePlan));
            return newActivePlan;
        });

    };

    const contextValues = {
        activePlan,
        setActivePlan
    }
    return <ActivePricePlanContext.Provider value={contextValues}>{props.children}</ActivePricePlanContext.Provider>
}


// eslint-disable-next-line react-refresh/only-export-components
export { ActivePlanProvider, useActivePlan }


