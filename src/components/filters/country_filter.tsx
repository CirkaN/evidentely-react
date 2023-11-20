import { useState } from "react";

interface countryFilterProps {
    backend_key: string,

}
const CountryFilter = (props: countryFilterProps) => {
    const [myValue, setMyValue] = useState("");
    const test = (test: string) => {
        setMyValue(test);   
        console.log(test);
    }
return (
    <div>
        <select value={myValue} onChange={(e) => { test(e.target.value) }} id="country" name={props.backend_key}>
            <option value="something">Serbia</option>
            <option value="bih">Bih</option>
        </select>
    </div>
);

}

export default CountryFilter;