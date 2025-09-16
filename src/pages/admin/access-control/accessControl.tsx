import { useEffect, useState } from 'react'
import { useGetUsersQuery, useRoleUserMutation } from '../../../entities/User/model/api'
import GreenButton from '../../../shared/ui/button'
import { Checkbox } from '@mui/material'
import { IUser } from '../../../shared/types'
import AlertDialogControl from '../../../widgets/admin/access-control-modals/controlModal'
import toast from 'react-hot-toast'

const AccessControl = () => {
  const [fullname, setFullname]=useState('')
  const [filter, setFilter]=useState('')
  const [role,setRole]=useState('')  
 const { data } = useGetUsersQuery({
   fullname: fullname, 
   role: role
}) as { data?: IUser[] };

 const [selectWorkers, setSelectWorkers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [roleUser]=useRoleUserMutation()



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

const handleChangeSelect= async(event: React.ChangeEvent<HTMLSelectElement>)=>{
   setFilter(event.target.value)
   if(event.target.value == 'Администратор'){
    try {
      await roleUser({
    "value": "ADMIN",
   "userIds": selectWorkers
  }).unwrap()
  toast.success('Роли успешно изменены на ADMIN')
    setFilter('')
    } catch (error) {
      console.error(error);
      toast.error('Не удалось поменять роли на ADMIN')
    }
    
   } else if(event.target.value == 'Пользователь') {
    try {
      await roleUser({
    "value": "USER",
   "userIds": selectWorkers
  }).unwrap()
  toast.success('Роли успешно изменены на USER')
    setFilter('')
    } catch (error) {
      console.error(error);
      toast.error(`Не удалось поменять роли на USER `)
    }
   } else {
    console.log('Viberite deistvie');
   }
   
}

const sbros=()=>{
    setRole('')
    setFullname('')
}
  return <>
   <section className='px-[30px] flex flex-col gap-[10px]'>
       <div className='flex justify-between items-center pt-[40px]'>
        <p className='text-[30px] font-bold tracking-[1px]'>Настройки доступа</p>
       </div>
       <div className='w-[300px] bg-orange-600'>
       </div>
       
       <div className='flex flex-col gap-[30px]'>
        <div className='flex justify-between items-center '>
          <p className='text-[25px] font-semibold tracking-[1px]'>Фильтр</p>
        </div>
        <div className='flex justify-between items-end pb-[30px] gap-[20px]'>
          <div className='flex gap-[40px] items-center'>
            <div className='flex w-[350px] flex-col gap-[10px] items-start'>
            <label htmlFor="fio">Поиск по ФИО</label>
            <input type="text" id='fio' placeholder='Поиск по ФИО' className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]' value={fullname} onChange={(e)=> setFullname(e.target.value)} />
          </div>
          <div className='flex  flex-col w-[350px] gap-[10px] items-start'>
            <label htmlFor="dostup">Уровень доступа</label>
            <select name="" id="dostup" className='border border-gray-300 rounded-[15px] w-[100%]  outline-[#3EA458] px-[15px] py-[5px]' value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="">Не выбрано</option>
              <option value="ADMIN">Администратор</option>
              <option value="USER">Пользователь</option>
            </select>
          </div>
          </div>
          
          <GreenButton value={"Сбросить"} shirina={150} func={sbros}/>
          
        </div>
       </div>
       <div className='border rounded-[20px] border-gray-300 p-[30px] flex flex-col gap-[30px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[60px] items-center'>
          <p className='font-semibold text-[18px]'>ВЫБРАНО СОТРУДНИКОВ : {selectWorkers.length}</p>
          <select name="" id="" className='border border-gray-300 rounded-[10px] py-[5px] px-[20px] outline-[#3EA458]' value={filter} onChange={(e)=>handleChangeSelect(e)}>
            <option value="">Не выбрано</option>
            <option value="Администратор">Администратор</option>
            <option value="Пользователь">Пользователь</option>
          </select>
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
                  <th className='py-[10px] px-[5px] text-[14px] w-[25%]'> Роль </th>
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
                    return <tr key={user.id} className='border border-gray-300'>
                <td className='text-center px-[5px] w-[5%] '>
                  <div >
                 <Checkbox
  checked={selectWorkers.includes(user.id)}
  onChange={(event) => handleChange(event, user.id)}
/>

                  </div>
                   </td>
                   <td className='w-[17%] px-[5px] text-[14px] py-[10px] '>
                    <div className='flex items-center justify-center gap-[10px]'>
                      <img src="../../../../public/pages/account/image 3 (1).png" alt=""  className='w-[30px]'/>
                      <p className='text-center w-[150px]'>{user.name+ ' ' + user.surname }</p>
                    </div>
                   </td>
                   <td className='text-center text-[14px] py-[10px] w-[10%]  px-[5px]'>{user.email}</td>
                   <td className='text-center  text-[12px] py-[10px] w-[13%]  px-[5px] '>{user.company}</td>
                   <td className='text-center text-[12px] py-[10px] w-[18%]  px-[5px]'> {user.position}</td>
                   <td className='text-center text-[12px] py-[10px] w-[15%]  px-[5px]'> {user.department}</td>
                   
                  <AlertDialogControl user={user}/>
                   
                   
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

export default AccessControl