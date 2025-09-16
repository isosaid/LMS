import { Navigate, Outlet } from "react-router";
import Header from '../../widgets/client/header/ui/header';
import { useEffect, useState } from 'react';

function Layout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuth(!!token);
  }, []);

  if (isAuth === null) return null;

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <main className="max-w-[1540px] m-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
