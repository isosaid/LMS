import { useEffect, useState } from 'react'
import { useActiveUserMutation, useBlockUserMutation, useDeleteUserMutation, useGetUsersQuery } from '../../../entities/User/model/api'
import GreenButton from '../../../shared/ui/button'
import { Checkbox } from '@mui/material'
import { IUser } from '../../../shared/types'
import AlertDialog from '../../../widgets/admin/dialogForWorkers'
import AddDialogWorkers from '../../../widgets/admin/addDialogWorkers'
import toast from 'react-hot-toast'
import UserExport from '../../../widgets/admin/export-worker/exportWorker'

const Workers = () => {
  const [fullname, setFullname]=useState('')
  const [company, setCompany]=useState('')
  const [email, setEmail]=useState('')
  const [position, setPosition]=useState('')
  const [supervisor, setSupervisor]=useState('')
  const [department, setDepartment]=useState('')
  const [filter, setFilter]=useState('')
 const { data } = useGetUsersQuery({
   fullname: fullname, 
   company: company, 
   email: email, 
   position: position,
   supervisor: supervisor,
   department: department,
}) as { data?: IUser[] };
const [activeUser]=useActiveUserMutation()
const [blockUser]=useBlockUserMutation()
const [deleteUser]=useDeleteUserMutation()
 const [selectWorkers, setSelectWorkers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
  if (event.target.checked) {
    setSelectWorkers((prev) => [...prev, id]);
  } else {
    setSelectWorkers((prev) => prev.filter((workerId) => workerId !== id));
  }
};
useEffect(() => {
  if (!data) return;
  setSelectAll(selectWorkers.length === data.length);
}, [selectWorkers, data]);
const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  const checked = event.target.checked;
  setSelectAll(checked);

  if (checked) {
    const allIds = data?.map(user => user.id) || [];
    setSelectWorkers(allIds);
  } else {
    setSelectWorkers([]);
  }
};

console.log(data);


const handleChangeSelect=async (event: React.ChangeEvent<HTMLSelectElement>)=>{
   console.log(event.target.value);
   setFilter(event.target.value)
   if(event.target.value == 'activation'){
    try {
      await activeUser(selectWorkers).unwrap()
      toast.success('Пользователи активированы')
    setFilter('')
    } catch (error) {
      console.error(error);
      toast.error('Не удалось активировать пользователей')
    }
   } else if(event.target.value == 'block') {
    try {
      await blockUser(selectWorkers).unwrap()
      toast.success('Пользователи заблокированы')
    setFilter('')
    } catch (error) {
      console.error(error);
      toast.error('Не удалось заблокировать пользователей')
    }

   } else if(event.target.value == 'delete') {
    try {
      await deleteUser(selectWorkers).unwrap()
      toast.success('Пользователи удалены')
    setFilter('')
    } catch (error) {
      console.error(error);
      toast.error('Не удалось удалить пользователей')
    }
   } else {
    console.log('Viberite deistvie');
   }
   
}

const sbros=()=>{
    setCompany('')
    setFullname('')
    setEmail('')
    setPosition('')
    setSupervisor('')
    setDepartment('')
}
  return <>
   <section className='px-[30px] flex flex-col gap-[30px]'>
       <div className='flex justify-between items-center pt-[40px]'>
        <p className='text-[30px] font-bold tracking-[1px]'>Сотрудники</p>
        <div className='flex gap-[20px] items-center'>
          <UserExport users={data || []} />

          
          <AddDialogWorkers/>
        </div>
       </div>
       <div className='w-[300px] bg-orange-600'>
       </div>
       
       <div className='flex flex-col gap-[30px]'>
        <div className='flex gap-[30px] items-center '>
          <p className='text-[25px] font-semibold tracking-[1px]'>Фильтр</p>
          <GreenButton value={"Сбросить"} shirina={150} func={sbros}/>
        </div>
        <div className='grid grid-cols-3 gap-[20px]'>
          <div className='flex  flex-col gap-[10px] items-start'>
            <label htmlFor="fio">ФИО</label>
            <input type="text" id='fio' placeholder='Поиск по ФИО' className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]' value={fullname} onChange={(e)=> setFullname(e.target.value)} />
          </div>
          <div className='flex  flex-col gap-[10px] items-start'>
            <label htmlFor="логин">Логин</label>
            <input type="text" id='логин' placeholder='Поиск по логину' className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]'  value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div className='flex  flex-col gap-[10px] items-start'>
            <label htmlFor="рук">ФИО руководителя</label>
            <input type="text" id='рук' placeholder='Поиск по ФИО руководителя' className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]' value={supervisor} onChange={(e)=> setSupervisor(e.target.value)} />
          </div>
          <div className='flex  flex-col gap-[10px] items-start'>
            <label htmlFor="компания">Компания</label>
            <input type="text" id='компания' placeholder='Поиск по названию компании' className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]' value={company} onChange={(e)=> setCompany(e.target.value)} />
          </div>
          <div className='flex  flex-col gap-[10px] items-start'>
            <label htmlFor="должность">Должность</label>
            <input type="text" id='должность' placeholder='Поиск по должности' className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]' value={position} onChange={(e)=> setPosition(e.target.value)} />
          </div>
          <div className='flex  flex-col gap-[10px] items-start'>
            <label htmlFor="отдел">Отдел</label>
            <input type="text" id='отдел' placeholder='Поиск по отделу' className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]' value={department} onChange={(e)=> setDepartment(e.target.value)} />
          </div>
        </div>
       </div>
       <div className='border rounded-[20px] border-gray-300 p-[30px] flex flex-col gap-[30px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[60px] items-center'>
          <p className='font-semibold text-[18px]'>ВЫБРАНО СОТРУДНИКОВ : {selectWorkers.length}</p>
          <select name="" id="" className='border border-gray-300 rounded-[10px] py-[5px] px-[20px] outline-[#3EA458]' value={filter} onChange={(e)=>handleChangeSelect(e)}>
            <option value="">Не выбрано</option>
            <option value="activation">Активировать пользователя</option>
            <option value="block">Заблокировать пользователя</option>
            {/* <option value="delete">Удалить пользователя</option> */}
          </select>
        </div>
          <div className='flex gap-[30px] py-[10px] items-center justify-center border border-gray-300 rounded-[10px]  w-[450px]'>
          <p className='text-black font-semibold'>Всего {data?.length}</p>
          <p className='text-[#3EA458] font-semibold'> Активных {data?.filter((item) => item.block === false).length} </p>
          <p className='text-red-600 font-semibold'>Отключенных {data?.filter((item) => item.block === true).length}</p>
        </div>
        </div>
        
        
        <div className='rounded-[20px]'>
          <table className='w-[100%] border-collapse border border-gray-300'>
            <tbody>
              <tr className='bg-[#3EA458] text-white'>
                <th className='w-[5%]'> 
                  <div>
                  <Checkbox
  checked={selectAll} 
  sx={{color: 'white'}}
  onChange={handleSelectAll}
/>


                  </div>
                  </th>
                  <th className='py-[10px] px-[5px] text-[14px] w-[17%]'>Фио</th>
                  <th className='py-[10px] px-[5px] text-[14px] w-[13%] '>Логин</th>
                  <th className='py-[10px] px-[5px] text-[14px] w-[13%]'>Компания</th>
                  <th className='py-[10px] px-[5px] text-[14px] w-[18%]'>Должность</th>
                  <th className='py-[10px] px-[5px] text-[14px] w-[15%]'>Отдел</th>
                  <th className='py-[10px] px-[5px] text-[14px]'>Руководитель</th>
                  <th className='py-[10px] px-[5px] text-[14px]'> Активность </th>
              </tr>
              {   data?.length == 0 ? <tr className='border'> 
                <td className=' text-[18px] font-semibold  text-center h-[100px]' colSpan={8}>
                  <div className='flex items-center justify-center h-[100px]'>
                    <p className='italic text-[25px] font-semibold text-green-600'>
                       Такого сотрудника не существует.
                    </p>
                  </div>
                   
                  </td> 
                  </tr> :
                  data?.map((user)=>{
                    return <tr key={user.id} className="text-center border border-gray-300 hover:bg-gray-100 cursor-pointer"
                    >
                <td className='text-center px-[5px] w-[5%] '>
                  <div >
                 <Checkbox
  checked={selectWorkers.includes(user.id)}
  onChange={(event) => handleChange(event, user.id)}
/>

                  </div>
                   </td>
                   <td className='w-[17%] px-[5px] text-[14px] py-[10px] '>
                    <div className='flex items-center justify-center gap-[10px]' onClick={() => window.location.href = `/user/profile/${user.id}`}>
                      <img src="/pages/account/image 3 (1).png" alt={user.name}  className='w-[30px]'/>
                      <p className='text-center w-[150px]'>{user.name+ ' ' + user.surname }</p>
                    </div>
                   </td>
                   <td className='text-center text-[14px] py-[10px] w-[10%]  px-[5px]' onClick={() => window.location.href = `/user/profile/${user.id}`}>{user.email}</td>
                   <td className='text-center  text-[12px] py-[10px] w-[13%]  px-[5px] ' onClick={() => window.location.href = `/user/profile/${user.id}`}>{user.company}</td>
                   <td className='text-center text-[12px] py-[10px] w-[18%]  px-[5px]' onClick={() => window.location.href = `/user/profile/${user.id}`}> {user.position}</td>
                   <td className='text-center text-[12px] py-[10px] w-[15%]  px-[5px]' onClick={() => window.location.href = `/user/profile/${user.id}`}> {user.department}</td>
                   <td className='text-center px-[5px] text-[12px]' onClick={() => window.location.href = `/user/profile/${user.id}`}>{user.supervisor} </td>
                   <AlertDialog user={user}/>
                   
              </tr>
                  })
              }
            </tbody>
          </table>
        </div>
       </div>
   </section>
  </>
}

export default Workers