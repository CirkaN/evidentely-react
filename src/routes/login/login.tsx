import axios_instance from "../../config/api_defaults";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";


interface Login {
  email: string,
  password: string
}

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  const [loginForm, setLoginForm] = useState<Login>({
    email: "",
    password: "",
  });

  const openRegistration = () => {
    navigate('/register');
  }

  const [hasErrors, setHasErrors] = useState(false);

  const loginRequest = () => {
    axios_instance().post('/auth/login', loginForm).then(response => {
      localStorage.setItem('auth_token', response.data.auth.access_token);
      navigate('/main_dashboard')
      login({
        'email': response.data.user.email,
        'id': response.data.user.id,
        'name': response.data.user.name,
        'avatar_url': response.data.user.avatar_url,
        'company_name': response.data.user.company_name,
        'business_type_slug': response.data.user.business_type_slug,
        'email_verified_at': response.data.user.email_verified_at
      })

    }).catch(() => {
      setHasErrors(true);
    })
  }

  useEffect(() => {

    const { pathname, search } = location;
    const isSuccess =
      pathname.includes("/login/registration_success") || search.includes("registration_success");

    if (isSuccess) {
      toast.success(t('registration.success'));
    }

    const isReauth =
      pathname.includes("/login") || search.includes("re-auth");

    if (isReauth) {
      localStorage.removeItem('auth_token');
      navigate('/login');
    }


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
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src="/moj_biznis_dark.webp"
              className="w-32 mx-auto" />
          </div>
          <div className="mt-10 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Ulogujte se
            </h1>
            <div className="w-full flex-1 mt-1">

              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="my-12 border-b text-center">
                  <div
                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Ulogujte se u vas nalog
                  </div>
                </div>
                {hasErrors &&
                  <p className="mt-4 text-sm text-center text-red-600">{t('login.check_credentials')}</p>}
                <div className="mx-auto max-w-xs">

                  <div>
                    <label className="">Email:</label>
                    <input
                      onChange={(e) => { setLoginForm((c) => c && { ...c, email: e.target.value }) }}
                      placeholder={t('common.enter_email')} autoFocus={true} required
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email" />
                  </div>


                  <div>
                    <label className="pt-5">Sifra:</label>
                    <input
                      onChange={(e) => { setLoginForm((c) => c && { ...c, password: e.target.value }) }} placeholder={t('common.enter_password')}
                      required
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password" />
                  </div>

                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">
                      Uloguj se
                    </span>
                  </button>
                  <button
                    onClick={() => { openRegistration() }}
                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">
                      Nemate nalog? Registrujte se
                    </span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Prihvatam
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      <span> Uslove koriscenja </span>
                    </a>
                    <span> i </span>
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      <span> Politiku Privatnosti</span>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  </>);

}
export default Login