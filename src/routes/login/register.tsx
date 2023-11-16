import { useTranslation } from "react-i18next"
interface Register {
    email: string,
    password: string
}


const Register = () => {
    const { t } = useTranslation();
    alert('WIP PAGE')
    return (<>
        <div className="max-h-screen">
            <section className="flex min-h-screen items-center justify-center border-red-500 bg-gray-200">
                <div className="flex max-w-3xl rounded-2xl bg-gray-100 p-5 shadow-lg">
                    <div className="px-5 md:w-1/2">
                        <h2 className="text-2xl font-bold text-[#002D74]">{t('register.register')}</h2>
                        <p className="mt-4 text-sm text-[#002D74]">{t('register.register_text')}</p>
                        <form className="mt-6" action="#" method="POST">
                            <div>
                                <label className="block text-gray-700">{t('common.email')}</label>
                                <input type="email" name="" id="" placeholder="Enter Email Address" className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700">{t('common.password')}</label>
                                <input type="password" name="" id="" placeholder="Enter Password" className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            </div>


                            <button type="submit" className="mt-6 block w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400 focus:bg-blue-400">{t('register.register_button')}</button>
                        </form>

                        <div className="mt-3 flex items-center justify-between text-sm">
                            <p>{t('register.already_has_account')}</p>
                            <button className="ml-3 rounded-xl border border-blue-400 bg-white px-5 py-2 duration-300 hover:scale-110">{t('login.login_button')}</button>
                        </div>
                    </div>

                    <div className="hidden w-1/2 md:block">
                        <img src="https://image.similarpng.com/very-thumbnail/2020/12/Lorem-ipsum-logo-isolated-clipart-PNG.png" className="rounded-2xl" alt="page img" />
                    </div>
                </div>
            </section>
        </div>


    </>);


}
export default Register