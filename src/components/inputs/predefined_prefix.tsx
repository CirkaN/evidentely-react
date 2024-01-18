import { useEffect, useState } from "react";

interface PredefinedNumberPrefixProps {
    parseNumber: (number: string | undefined) => void,
    isRequired?: boolean,
    initial_value?: string,
}

const PrefixNumberInput = (props: PredefinedNumberPrefixProps) => {
    const [prefix] = useState("+381 0")
    const [userInput, setUserInput] = useState<string>("");

    const changeUserInput = (input: string) => {
        if (input.charAt(0) === "0") {
            input = input.slice(1);
        }
        
        setUserInput(input.trim());

        props.parseNumber(input.trim());
    }
    useEffect(() => {
        if (props.initial_value) {
            setUserInput(props.initial_value)
        }
    }, [props.initial_value])
    return (
        <>
            <div className="flex">
                <input type="text" value={prefix} disabled className="p-1 w-1/4 sm:w-1/6 border text-slate-900" />
                <input required={props.isRequired ?? false}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    type="number"
                    minLength={9}
                    min={1}
                    maxLength={10}
                    value={userInput}
                    onChange={(e) => { changeUserInput(e.target.value) }} />
            </div>
        </>
    )
}
export default PrefixNumberInput;