import {  Navigate, NavLink, Outlet } from "react-router"
import Sidebar from '../../widgets/admin/sidebar/sidebar'
import { Book, Bookmark, ChartNoAxesCombined, Gem, Settings, User } from 'lucide-react'
import { useEffect, useState } from 'react'

function LayoutAdmin() {
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
        <Sidebar/>
        <main className='max-w-[1540px] m-auto'>
             <section className=' flex h-[100vh] justify-between items-start'>
                <aside className='w-[20%] border-r  h-full '>

                      <NavLink
                    to='/admin'
                    end
                    className={({ isActive }) =>
                  `pl-[30px] transition-all duration-300 ease-in-out  py-[15px] flex items-center gap-[10px] hover:bg-[#D8EDDE] ${
                   isActive ? 'bg-[#D8EDDE]' : '' }`}>
                     <Book color='#3EA458' />
                      <p>Материалы</p>
                      </NavLink>
                    <NavLink
                    to='/admin/education-tracks'
                    
                    className={({ isActive }) =>
                  `pl-[30px] transition-all duration-300 ease-in-out  py-[15px] flex items-center gap-[10px] hover:bg-[#D8EDDE] ${
                   isActive ? 'bg-[#D8EDDE]' : '' }`}>
                     <Bookmark color='#3EA458' />
                      <p>Учебные треки</p>
                      </NavLink>
                      <NavLink
                    to='/admin/idp'
                    
                    className={({ isActive }) =>
                  `pl-[30px] transition-all duration-300 ease-in-out  py-[15px] flex items-center gap-[10px]  hover:bg-[#D8EDDE] ${
                   isActive ? 'bg-[#D8EDDE]' : '' }`}>
                     <ChartNoAxesCombined color='#3EA458' />
                      <p>ИПР</p>
                      </NavLink>
                      <NavLink
                    to='/admin/workers'
                    
                    className={({ isActive }) =>
                  `pl-[30px] transition-all duration-300 ease-in-out  py-[15px] flex items-center gap-[10px] hover:bg-[#D8EDDE] ${
                   isActive ? 'bg-[#D8EDDE]' : '' }`}>
                     <User color='#3EA458' />
                      <p>Сотрудники</p>
                      </NavLink>
                      <NavLink
                    to='/admin/access-control'
                    
                    className={({ isActive }) =>
                  `pl-[30px] py-[15px] flex items-center gap-[10px] transition-all duration-300 ease-in-out hover:bg-[#D8EDDE]  ${
                   isActive ? 'bg-[#D8EDDE]' : '' }`}>
                     <Settings color='#3EA458' />
                      <p>Настройки доступа</p>
                      </NavLink>
                      <NavLink
                    to='/admin/talent-pool'
                    
                    className={({ isActive }) =>
                  `pl-[30px] py-[15px] flex items-center gap-[10px] transition-all duration-300 ease-in-out hover:bg-[#D8EDDE]  ${
                   isActive ? 'bg-[#D8EDDE]' : '' }`}>
                     <Gem color='#3EA458' />
                      <p>Кадровый резерв</p>
                      </NavLink>
                </aside>
                <aside className='w-[80%] '>
                     <Outlet />
                </aside>
              
        </section>
        </main>
           
        </>
    )
}

export default LayoutAdmin
