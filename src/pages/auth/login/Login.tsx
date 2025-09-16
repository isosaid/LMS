import { useEffect, useState } from "react";
import { useLoginUserMutation } from '../../../entities/login/model/api'
import { IUserLogin } from '../../../shared/types'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, {data}]=useLoginUserMutation()
    const navigate = useNavigate()
    const [loading, setLoading]=useState(false)

   async function handleLogin(event: { preventDefault: () => void }) {
		event.preventDefault()
        setLoading(true)
		const loginUser: IUserLogin = {
			email: email,
			password: password,
		}
		try {
			await login(loginUser).unwrap()
            toast.success('Добро пожаловать ! ')
		} catch (error: unknown) {
        console.error(error);
    if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  ) {
    const typedError = error as { status: string | number; data: any };

    if (typedError.status === 400) {
        toast('Hello Darkness!',
         {
         icon: '😡',
        style: {
          borderRadius: '10px',
          background: '#333',
         color: '#fff',
         },
        }
   );
      toast.error("Произошла ошибка: " + typedError.data[0]);
    } else if (typedError.status === 401) {
       toast("Произошла ошибка: " + typedError.data.message,
         {
         icon: '🤬',
        style: {
          borderRadius: '10px',
          maxWidth: '700px',
          background: '#E63244',
         color: '#fff',
         },
     })
    } else {
      toast("Произошла ошибка",
         {
         icon: '🤬',
        style: {
          borderRadius: '10px',
          maxWidth: '700px',
          background: '#E63244',
         color: '#fff',
         },
     })
    }
  } else {
    toast("Неизвестная ошибка ",
         {
         icon: '🤬',
        style: {
          borderRadius: '10px',
          maxWidth: '700px',
          background: '#E63244',
         color: '#fff',
         },
     })
  }
} finally {
    setLoading(false)
}
	}
  useEffect(() => {
  if (data?.token) {
    // Сохраняем токен и время окончания жизни
    const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 часа
    const item = { value: data.token, expires };
    localStorage.setItem("access_token", JSON.stringify(item));
    localStorage.setItem("Logged", "true");
    navigate("/user");
  }

  // Проверяем токен при монтировании
  const itemStr = localStorage.getItem("access_token");
  if (itemStr) {
    const item = JSON.parse(itemStr);

    if (Date.now() > item.expires) {
      // Срок истёк → удаляем токен
      localStorage.removeItem("access_token");
      localStorage.removeItem("Logged");
    } else {
      // Токен ещё жив → пускаем на /user
      navigate("/user");
    }
  }
}, [data?.token, navigate]);

  

    return (
        
        <div className="flex h-screen ">
            {/* Левая часть - форма логина */}
            <div className="w-1/2 flex flex-col items-center justify-center px-8">
                <div className="max-w-md w-full">
                    <img src="pages/login/AGLogo.png" alt="logo" className="block mx-auto mb-5" />
                    <h2 className="text-xl font-medium mb-8 text-center">LMS платформа ООО "Авесто Групп"</h2>

                    <form onSubmit={handleLogin}  className="flex flex-col items-center gap-4">
                        <div className="w-full">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Пароль"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-[190px] bg-[#3EA458] hover:bg-green-600 text-white py-3 px-4 rounded-xl font-bold text-lg transition duration-200"
                            disabled={loading}
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>

            {/* Правая часть - изображение */}
            <div className="w-2/3 relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{
                    backgroundImage: "url('/pages/login/login.png')"
                }}>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
