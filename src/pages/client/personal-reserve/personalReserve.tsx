import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { API_IMAGE, InfoAddUser, Persons, Position, SortType8, SortType9 } from '../../../shared/types'
import { Search } from 'lucide-react'
import AIRecommendationModal from '../../../widgets/client/personal-rezerv/personalRez'
import { useGetKeyPositionsUserQuery, useGetUsersReserveQuery } from '../../../entities/personal-reserve/model/api'
import { Link } from 'react-router'






const companies=[
  {
    id: 1,
    name: 'Авесто групп',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  },
  {
    id: 2,
    name: 'Мармари',
    image: '/pages/client/a7b55b14275a9ff82ea257f2dda67d9ca72f9fc4.png'
  },
  {
    id: 3,
    name: 'КИ Сиема',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  },
  {
    id: 4,
    name: 'Сиема Молл',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  },
  {
    id: 5,
    name: 'Арвис',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  }, 
  {
    id: 6,
    name: 'Артел',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  },
  {
    id: 7,
    name: 'Акиа Авесто',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  }, 
  {
    id: 8,
    name: 'Гулистони Душанбе',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  },
  {
    id: 9,
    name: 'Minds',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  },
  {
    id: 10,
    name: 'Душанбе сити банк',
    image: '/pages/client/850b839534edf56e8b5f45f8e3a7c19228ca65cd.png'
  }
]

const PersonalReserve = () => {
  const [filterUser, setFilterUser]=useState('')
  const [filterByPosition, setFilterByPosition]=useState('')
  const {data: usersData, isLoading}=useGetUsersReserveQuery({fullname: filterUser})
  const {data: positionsData, isLoading: loadingPosition}=useGetKeyPositionsUserQuery({position: filterByPosition})
  const [sortBy, setSortBy] = useState<SortType8>('Главная')
  const [filterBy, setFilterBy] = useState<SortType9>('Все')
  const [filterComp, setFilterComp] = useState('Авесто групп')
      const handleSortByChange = (value: SortType8) => {
              setSortBy(value)	
            }
  const handleFilterByChange = (value: SortType9) => {
              setFilterBy(value)				
              console.log(value);      
            }          
 
  const selectedCompany = companies.find(c => c.name === filterComp)

const filteredEmployees = usersData?.filter((emp: InfoAddUser) => {
  if (filterBy === 'Все') return true;
  return emp.position?.includes(filterBy);
});
  

  if (isLoading || loadingPosition) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
 
  

  return <>
   <section className='w-[77%] m-auto '>
     <div className='flex items-center justify-center'>
            <Tabs
                value={sortBy}
                onChange={(_, newValue) => handleSortByChange(newValue)}
                sx={{
                  display: 'inline-flex',
                  ml: 0,
                  '& .MuiTabs-indicator': { backgroundColor: '#3EA458' },
                }}
              >
                <Tab
                  sx={{
                    '&.Mui-selected': { color: '#3EA458' },
                  }}
                  label='Главная'
                  value='Главная'
                />
                <Tab
                  sx={{
                    '&.Mui-selected': {  color: '#3EA458' },
                  }}
                  label='Структура'
                  value='Структура'
                />
                <Tab
                  sx={{
                    '&.Mui-selected': {  color: '#3EA458' },
                  }}
                  label='Сотрудники'
                  value='Сотрудники'
                />
                <Tab
                  sx={{
                    '&.Mui-selected': {  color: '#3EA458' },
                  }}
                  label='Ключевые должности'
                  value='Ключевые должности'
                />
              </Tabs>
        </div>
          {
            sortBy=='Главная' && (
              <>
              <div className='pt-[40px]'>
                <p className='text-[30px] font-semibold tracking-[2px]'>Главная</p>
                <div className='grid grid-cols-5 py-[40px] gap-x-[30px]'>
                  {
                    positionsData?.slice(0,5).map((position: Position)=>{
                      return <div key={position.id} className='flex flex-col gap-[10px]'>
                    <img src={`${API_IMAGE}${position.image}`} alt="surat" className='w-[100%] h-[150px] rounded-[10px]'/>
                    <div className='flex flex-col ml-[10px]'>
                      <p className='text-[18px] font-semibold'>{position.position}</p>
                      <p className='text-[#61788A] font-semibold'>5 roles</p>
                    </div>
                  </div>
                    })
                  }
                </div>

                <div className='flex flex-col py-[40px] gap-[10px]'>
                  <p className='text-[25px] font-semibold tracking-[1px]'>Ключевые должности</p>
                  <p className='text-[20px] mt-[10px] font-semibold tracking-[1px]'>Сотрудники</p>
                  <div className='grid grid-cols-5 py-[20px] gap-x-[30px]'>
                    {
                      usersData?.slice(0,5).map((user:Persons)=>{
                        return <Link key={user.id} to={`/user/profile/${user.id}`}>
                        <div className='flex flex-col gap-[10px] items-center'>
                      <img src="/pages/account/image 3 (1).png" alt="surat"  className='rounded-full'/>
                      <div className='text-center flex flex-col  text-[#61788A]'>
                        <p className='text-[black] text-[20px] font-semibold tracking-[1px]'>{user.name + " " + user.surname}</p>
                        <p>{user.position}</p>
                        <p>{user.address}</p>
                      </div>
                    </div>
                        </Link>
                         
                      })
                    }
                    
                  </div>
                </div>
              </div>
              </>
            )
          }

          {
            sortBy=='Сотрудники' && (
              <>
              <div className='flex flex-col gap-[20px] py-[20px]'>
               <div className='flex items-center justify-between'>
                <p className='text-[30px] font-semibold tracking-[2px]'>Сотрудники</p>
                <div className='flex gap-[20px] items-center rounded-[10px] py-[10px] px-[15px] bg-[#F0F2F5]'>
                  <Search className='text-gray-400'/>
                  <input type="text"  placeholder='Поиск по ФИО' className='bg-transparent w-[250px] outline-none' value={filterUser} onChange={(e)=>setFilterUser(e.target.value)}/>
                </div>
               </div>
               <div className='border-b-[3px] '>
            <Tabs
                value={filterBy}
                onChange={(_, newValue) => handleFilterByChange(newValue)}
                sx={{
                  display: 'inline-flex',
                  ml: 0,
                  '& .MuiTabs-indicator': { backgroundColor: '#3EA458' },
                }}
              >
                <Tab
                  sx={{
                    '&.Mui-selected': { color: '#3EA458' },
                  }}
                  label='Все'
                  value='Все'
                />
                <Tab
                  sx={{
                    '&.Mui-selected': {  color: '#3EA458' },
                  }}
                  label='Руководитель'
                  value='Руководитель'
                />
                <Tab
                  sx={{
                    '&.Mui-selected': {  color: '#3EA458' },
                  }}
                  label='Менеджер'
                  value='Менеджер'
                />
              </Tabs>
                 </div>

                 <div className='border mt-[10px] overflow-hidden rounded-[20px]'>
                  <table className='w-[100%] border border-collapse'>
                    <tbody>
                      <tr className='bg-green-600 text-white'>
                        <th className='py-[10px] border w-[30%]'>Должность</th>
                        <th className='py-[10px] border w-[30%]'>Фио</th>
                        <th className='py-[10px] border w-[10%]'>Фото</th>
                        <th className='py-[10px] border w-[30%]'>Рекомендации от ИИ</th>
                      </tr>
                      {
                        filteredEmployees?.length==0 ? <tr>
                          <td colSpan={4}>
                            <div className='flex items-center justify-center py-[60px] text-center'> 
                              <p className='text-[25px] text-green-600 font-semibold italic tracking-[1px]'>Такого пользователя не существует.</p>
                            </div>
                          </td>
                        </tr> : 
                        filteredEmployees?.map((person: Persons)=>{
                          return <tr key={person.id} onClick={() => window.location.href = `/user/profile/${person.id}`} className='hover:bg-gray-100 cursor-pointer' >
                            <td className='text-center px-[10px] py-[10px] border'>{person.position}</td>
                            <td className='text-center px-[10px] py-[10px] border'>{person.name + ' '+ person.surname+ ' ' + person.fathername}</td>
                            <td className='text-center px-[10px] py-[10px] border'><div className='flex items-center justify-center'>
                              <img src='/pages/account/image 3 (1).png' alt="" className='w-[60px] rounded-[10px]' /></div> </td>
                            <td className='text-center px-[10px] py-[10px] border'>Директор компании X </td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                 </div>
              </div>
              </>
            )
          }

          {
            sortBy=='Структура' && (
              <>
              <div className='flex py-[40px] items-start justify-between'>
                <div className='w-[20%]  flex flex-col gap-[20px]'>
                  {
                    companies.map((company)=>{
                      return <div key={company.id} className={`transition-all duration-300 ease-in-out border-2 py-[10px] text-center  rounded-[20px] ${filterComp == company.name ? 'bg-green-600 text-white' : 'bg-white text-black'} `} onClick={()=>setFilterComp(`${company.name}`)}>
                    <p className='text-[20px] tracking-[1px]'>{company.name}</p>
                  </div>
                    })
                  }

                </div>

                
                {selectedCompany && (
          <div className='w-[75%] flex flex-col gap-[20px]'>
          <p className='text-[25px] font-semibold tracking-[1px]'>Структура {selectedCompany.name}</p>
       <img src={selectedCompany.image} alt={selectedCompany.name} className='h-[350px]' />
       </div>
)}

                   
                </div>
              </>
            )
          }


           {
            sortBy=='Ключевые должности' && (
              <>
              <div className='flex flex-col gap-[30px] py-[30px]'>
                <div className='flex items-center justify-between'>
                <p className='text-[30px] font-semibold tracking-[1px]'>Ключевые должности</p>
                <div className='flex gap-[20px] items-center rounded-[10px] py-[10px] px-[15px] bg-[#F0F2F5]'>
                  <Search className='text-gray-400'/>
                  <input type="text"  placeholder='Поиск' className='bg-transparent w-[250px] outline-none' value={filterByPosition} onChange={(e)=>setFilterByPosition(e.target.value)}/>
                </div>
               </div>
               {
                positionsData?.length == 0 ? <div className='flex items-center justify-center py-[80px]'>  
                    <p className='text-[30px] font-semibold italic tracking-[1px] text-green-600'>Такой должности не существует.</p>
                  </div> : <div className='grid grid-cols-6 gap-[20px] '>
                {
                  positionsData?.map((position: Position)=>{
                    return <div key={position.id} className='flex flex-col gap-[10px]'>
                    <img src={`${API_IMAGE}${position.image}`} alt={position.position + ' фото'} className='rounded-[10px] w-[200px] h-[120px]'/>
                    <div className='flex flex-col '>
                      <p className='text-[16px] font-semibold'>{position.position}</p>
                      <p className='text-[#61788A] font-semibold'> 4 roles</p>
                    </div>
                  </div>
                  })
                }
               </div>
               }
               
              </div>
              
              </>
            )
           }


           <AIRecommendationModal data={positionsData}/>
            
          

          
   </section>
  </>
}

export default PersonalReserve