import { Form, FormError, FormInput, FormLabel, FormStoreState, FormSubmit, useFormStore } from "@ariakit/react";
import "../../tailwind.css"
import axios_instance from "../../config/api_defaults";
import { useEffect, useState } from "react";
import { useLoggedUser } from "../../services/clients/currentUserService";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

interface Login {
    email: string,
    password: string
}
interface BEData {
    access_token: string,
}

const Login = () => {
    const { isUserLogged } = useLoggedUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            if (isUserLogged()) {
                navigate('/calendar');
            }
        }
    },[isUserLogged]);

    const form = useFormStore({ defaultValues: { password: "", email: "" } });
    const [formErrors, setFormErrors] = useState([]);

    const loginRequest = (state: FormStoreState) => {
        axios_instance.post('/auth/login', state.values)
            .catch(reason => {
                setFormErrors(reason.response.data.errors.email);
                console.log(reason.response.data);
            })
            .then((response: AxiosResponse<BEData> | void) => {
                if (response && response.status === 200) {
                    const data: BEData = response.data;
                    localStorage.setItem("auth_token", data.access_token);
                    navigate('/calendar');
                }
            });
    }

    form.useSubmit(async (state) => {
        loginRequest(state)
    });

    const listItems = formErrors.map((element) => {
        return (<p className="text-xl">{element}</p>)
    })

    return (

        <>
            <div className="flex flex-col">
                <div>
                    <p className="text-2xl">Welcome Back!</p>
                    {listItems}

                </div>
                <div className="w-full max-w-xs">
                    <Form
                        store={form}
                        aria-labelledby="add-new-participant"
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <div className="mb-4">
                            <FormLabel className="block text-gray-700 text-sm font-bold mb-2" name={form.names.email}>Email</FormLabel>
                        </div>
                        <FormInput
                            type="text"
                            name={form.names.email}
                            placeholder="johndoe@example.com"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required />
                        <FormError name={form.names.email} className="error" />


                        <div className="mb-4">
                            <FormLabel className="block text-gray-700 text-sm font-bold mb-2" name={form.names.email}>Password</FormLabel>
                        </div>
                        <FormInput
                            type="password"
                            name={form.names.password}
                            placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                            required />
                        <FormError name={form.names.password} className="error" />

                        <div className="flex items-center justify-between">

                            <FormSubmit className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</FormSubmit>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </Form>

                    <p className="text-center text-gray-500 text-xs">
                        &copy;2023 NCODESOFT. ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>
        </>
    );
}
export default Login