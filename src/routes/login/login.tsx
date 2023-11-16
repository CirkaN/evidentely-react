import axios_instance from "../../config/api_defaults";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Login {
  email: string,
  password: string
}

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<Login>({
    email: "",
    password: "",
  });

  const [hasErrors, setHasErrors] = useState(false);

  const loginRequest = () => {
    axios_instance().post('/auth/login', loginForm).then(response => {
      localStorage.setItem('auth_token', response.data.access_token);
      const tokenExpireAt = new Date(Date.now() + response.data.expires_in * 1000).toISOString().replace('T', ' ').split('.')[0];
      localStorage.setItem('token_expires_at',tokenExpireAt);
      const lastCheck = new Date(Date.now()).toISOString().replace('T', ' ').split('.')[0];
      localStorage.setItem('last_check', lastCheck)
      navigate('/clients')
    }).catch(() => {
      setHasErrors(true);
    })
  }

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      axios_instance().post('/auth/me').then(res => {
        if (res.status === 200) {
          navigate('/clients')
        }
      }).catch(e => {
        if (e.response.status === 401) {
          localStorage.removeItem("auth_token");
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginRequest()
  }
  return (<>
    <div className="max-h-screen">
      <section className="flex min-h-screen items-center justify-center border-red-500 bg-gray-200">
        <div className="flex max-w-3xl rounded-2xl bg-gray-100 p-5 shadow-lg">
          <div className="px-5 md:w-1/2">
            <h2 className="text-2xl font-bold text-[#002D74]">{t('login.login')}</h2>
            {hasErrors &&
              <p className="mt-4 text-sm text-center text-red-600">{t('login.check_credentials')}</p>}

            <form className="mt-6" onSubmit={handleSubmit} >
              <div>
                <label className="block text-gray-700">{t('common.email')}</label>
                <input onChange={(e) => { setLoginForm((c) => c && { ...c, email: e.target.value }) }} type="email" name="" id="" placeholder={t('common.enter_email')} className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus={true} required />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">{t('common.password')}</label>
                <input onChange={(e) => { setLoginForm((c) => c && { ...c, password: e.target.value }) }} type="password" name="" id="" placeholder={t('common.enter_password')} className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none" required />
              </div>

              <div className="mt-2 text-right">
                <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">{t('login.lost_password')}</a>            </div>

              <button type="submit" className="mt-6 block w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400 focus:bg-blue-400">{t('login.login_button')}</button>
            </form>

            <div className="mt-3 flex items-center justify-between text-sm">
              <p>{t('login.dont_have_account')}</p>
              <button className="ml-3 rounded-xl border border-blue-400 bg-white px-5 py-2 duration-300 hover:scale-110">{t('login.register_button')}</button>
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
export default Login