import {  Heart } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react'
import { Dialog } from '@mui/material'
import { useGetUserProfileQuery } from '../../../../entities/User/model/api'
import { MyJwtPayload } from '../../../../shared/types'
import { jwtDecode } from 'jwt-decode'

const Header = () => {
	const [open,setOpen]=useState(false)
	const {data: userData}=useGetUserProfileQuery([])
	const [btnShow, setBtnShow]=useState(false)
	

	useEffect(() => {
	  const token = localStorage.getItem("access_token");
	
	  if (token && typeof token === "string") {
		 try {
			const decoded: MyJwtPayload = jwtDecode(token);
			if(decoded.roles[0] == 'ADMIN') {
				setBtnShow(true)
			}
		 } catch (err) {
			console.error("Ошибка при декодировании токена:", err);
		 }
	  } else {
		 console.warn("Токен отсутствует или невалиден");
	  }
	}, [btnShow]);	
	
	
	const navigate=useNavigate()
	const handleExit = () => {
  localStorage.removeItem("access_token");
  navigate("/");
  setOpen(false)
};
  return <>
   <header className='bg-[white] shadow-md transition-all duration-200 ease-in-out fixed top-0 w-full z-30 '>
		<Dialog open={open } onClose={()=> setOpen(false)}>
			<div className='w-[300px]'>
				<ul className='flex flex-col  '>
					<Link to='/user/profile'>
					<li className='border border-gray-300 py-[10px] text-center font-semibold italic tracking-[1px] hover:text-white hover:bg-[#3EA458] transition-all duration-100' onClick={()=>setOpen(false)}>Профиль   </li></Link>
				
				<Link to='/user/collegi'>
				<li className='border border-gray-300 py-[10px] text-center font-semibold italic tracking-[1px] hover:text-white hover:bg-[#3EA458] transition-all duration-100' onClick={()=>setOpen(false)}> Коллеги</li></Link> 
				
				<li className='text-red-700 border border-gray-300 py-[10px] text-center font-semibold italic tracking-[1px] hover:text-white hover:bg-red-700 transition-all duration-100' onClick={handleExit}>Выйти</li>
			</ul>
			</div>
         
		</Dialog>
		<div className='max-w-[1540px] m-auto'>
<nav className='px-[30px]  flex justify-between items-center'>
			<div className='flex items-center gap-[50px]'>
				<img src="/pages/knowledgeBase/Rectangle (22).png" alt="icon company avesto" />
			<ul className='flex gap-[30px] text-[23px] font-semibold'>
				<li className='py-[20px]'>
						<NavLink to='/user'  className={({ isActive }) => ` ${isActive ? " text-[#3EA458] " : "text-black hover:text-[#3EA458]"}  relative px-2 py-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px]
    after:bg-[#3EA458] after:scale-x-0 after:transition-transform after:duration-300
    ${isActive ? "after:scale-x-100" : ""}`} end> База знаний </NavLink>
				</li>
				<li className='py-[20px]'>
            <NavLink to={'/user/my-plan'} className={({ isActive }) => ` ${isActive ? " text-[#3EA458] " : "text-black hover:text-[#3EA458]"}  relative px-2 py-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px]
    after:bg-[#3EA458] after:scale-x-0 after:transition-transform after:duration-300
    ${isActive ? "after:scale-x-100" : ""}`}>
            Мой план
				</NavLink>
				</li>
				{
				btnShow ? <li className='py-[20px]'>
            <NavLink to={'/user/personal-reserve'} className={({ isActive }) => ` ${isActive ? " text-[#3EA458] " : "text-black hover:text-[#3EA458]"}  relative px-2 py-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px]
    after:bg-[#3EA458] after:scale-x-0 after:transition-transform after:duration-200
    ${isActive ? "after:scale-x-100" : ""}`}>
            Кадровый резерв
				</NavLink>
				</li> : ''
			}
				
			</ul>
			</div>
			
			<div className='flex items-center gap-[20px]'>
				<div className='flex gap-[10px] items-center'>
					<Link to={'/user/favorites'}>
				<button className='hover:bg-green-600 p-[8px] hover:text-white rounded-full'> <Heart  width={30} height={30}/> </button>
					</Link>
				</div>
				<div className='flex gap-[15px]'>	
				<button>
				<Link to={'/user/profile'}> <AccountCircleIcon sx={{ fontSize: 40 }} />
 </Link> </button>
             <p className='text-[23px] font-semibold cursor-pointer text-black hover:text-[#3EA458] transition-all duration-150 ease-out' onClick={ () => setOpen(true)}>
					{userData?.name + ' ' + userData?.surname}
					</p>
				</div>
			</div>
		</nav>
		</div>
		
	</header>
	<div className='h-[120px]'></div>
  </>
}

export default Header