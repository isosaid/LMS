import { Link, useNavigate } from 'react-router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react'
import { Dialog } from '@mui/material'
import { useGetUserProfileQuery } from '../../../entities/User/model/api'

const Sidebar= () => {
	const [open,setOpen]=useState(false)
	const {data: userData}=useGetUserProfileQuery([])
	const navigate=useNavigate()
	const handleExit = () => {
  localStorage.removeItem("access_token");
  navigate("/");
  setOpen(false)
};
  return <>
   <header className='bg-[white] max-w-[1540px] m-auto border-b transition-all duration-200 ease-in-out'>
		<Dialog open={open } onClose={()=> setOpen(false)}>
			<div className='w-[300px]'>
				<ul className='flex flex-col  '>
				<li className='border border-gray-300 py-[10px] text-center font-semibold italic tracking-[1px] hover:text-white hover:bg-[#3EA458] transition-all duration-100' onClick={()=>setOpen(false)}><Link to='/user/profile'>Профиль</Link>   </li>
				
				<li className='border border-gray-300 py-[10px] text-center font-semibold italic tracking-[1px] hover:text-white hover:bg-[#3EA458] transition-all duration-100' onClick={()=>setOpen(false)}><Link to='/user/collegi'>Коллеги</Link> </li>
				<li className='text-red-700 border border-gray-300 py-[10px] text-center font-semibold italic tracking-[1px] hover:text-white hover:bg-red-700 transition-all duration-100' onClick={handleExit}>Выйти</li>
			</ul>
			</div>
         
		</Dialog>
		<nav className='px-[30px] py-[15px] flex justify-between items-center'>
			<div className='flex items-center gap-[50px]'>
				<img src="/pages/knowledgeBase/Rectangle (22).png" alt="" />
			</div>
			
			<div className='flex gap-[30px] items-center'>
				<p className='text-[22px] tracking-[1px] transition-all duration-300 ease-out font-semibold hover:text-[#3EA458]'>   
					<Link to={'/user'}>Пользовательская часть</Link> </p>
				<div className='flex gap-[20px]'>	
				<button>
				<Link to={'/user/profile'}> <AccountCircleIcon sx={{ fontSize: 40 }} />
 </Link> </button>
             <p className='text-[23px] cursor-pointer font-semibold text-black hover:text-[#3EA458] transition-all duration-150 ease-out' onClick={ () => setOpen(true)}>
					{userData?.name+ " " + userData?.surname}
					</p>
				</div>
			</div>
		</nav>
	</header>
  </>
}

export default Sidebar