import { Tab, Tabs } from '@mui/material'
import { IUser, Position, SortType7 } from '../../../shared/types'
import { useState } from 'react'
import GreenButton from '../../../shared/ui/button'
import AddDialogKadrRezerv from '../../../widgets/admin/add-dialog-kadr-rezerv/addDialogKadrrezerv'
import { useGetUsersQuery } from '../../../entities/User/model/api'
import AlertDialogKr from '../../../widgets/admin/dialog-for-kr/page'
import { useGetKeyPositionsQuery } from '../../../entities/personal-reserve/model/api'
import AlertDialogShowOrHide from '../../../widgets/admin/dialog-for-kr/showOrHide'


const TalentPool = () => {
  const [sortBy, setSortBy] = useState<SortType7>('Сотрудники из резерва')
  const [fullname, setFullname]=useState('')
    const [company, setCompany]=useState('')
    const [position, setPosition]=useState('')
    const [company2, setCompany2]=useState('')
    const [position2, setPosition2]=useState('')
    const [lengthWork, setLengthWork]=useState('')
    const [supervisor, setSupervisor]=useState('')
    const [department, setDepartment]=useState('')
   const { data: users, refetch } = useGetUsersQuery({
     fullname: fullname, 
     company: company, 
     position: position,
     supervisor: supervisor,
     department: department,
  }) as { data?: IUser[], refetch: () => void };
  const {data: positionData, refetch: refetch2}=useGetKeyPositionsQuery({
    company: company2,
    position: position2,
    lengtWork: lengthWork
  })
     
  
    const handleSortByChange = (value: SortType7) => {
            setSortBy(value)				
          }


     const handleSbrosFilter =()=>{
       setFullname('')
       setCompany('')
       setPosition('')
       setSupervisor('')
       setDepartment('')
       setCompany2('')
       setPosition2('')
       setLengthWork('')
     }     

  return <>
  <section className='px-[30px] py-[40px]'> 
    <p className='text-[30px] tracking-[1px] font-semibold pb-[30px]'>Кадровый резерв</p>
    <div >
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
                  label='Сотрудники из резерва'
                  value='Сотрудники из резерва'
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
                sortBy == 'Сотрудники из резерва' && (
                  <>
                   <div className='flex pt-[20px] flex-col gap-[10px]'>
                    <p className='text-[22px] font-semibold tracking-[1px]'>Фильтр</p>
                    <div className='grid grid-cols-3 gap-x-[20px] gap-y-[10px]'>
                     <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="fio">ФИО</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='fio' placeholder='ФИО' value={fullname} onChange={(e)=> setFullname(e.target.value)}  />
                     </div>
                     <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="dolzh">Должность</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='dolzh' placeholder='Введите название должности' 
                      value={position} onChange={(e)=> setPosition(e.target.value)} />
                     </div>
                     <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="otdel">Отдел</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='otdel' placeholder='Введите названия отдела' 
                      value={department} onChange={(e)=> setDepartment(e.target.value)} />
                     </div>
                     <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="comp">Компания</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='comp' placeholder='Введите названия компании' 
                      value={company} onChange={(e)=> setCompany(e.target.value)} />
                     </div>
                     <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="supervisor">Руководитель</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='supervisor' placeholder='Введите ФИО руководителя' 
                      value={supervisor} onChange={(e)=> setSupervisor(e.target.value)} />
                     </div>
                     <div className='flex items-end justify-center'>
                      <GreenButton value={'Сбросить фильтры'} shirina={250} func={handleSbrosFilter}/>
                     </div>
                    </div>
                    <div className='rounded-[15px] mt-[20px] overflow-hidden'>
                      <table className='w-[100%] border border-collapse rounded-[15px] '>
                        <tbody>
                          <tr className='bg-green-600  text-white'>
                            <th className='py-[10px]'>ФИО</th>
                            <th className='py-[10px]'>Компания</th>
                            <th className='py-[10px]'>Должность</th>
                            <th className='py-[10px]'>Отдел</th>
                            <th className='py-[10px]'>Действия</th>
                          </tr>
                          {
                             users?.length == 0 ? <tr>
                              <td colSpan={5}>
                                <div className='flex items-center justify-center h-[200px]'>
                    <p className='italic text-[25px] font-semibold text-green-600'>
                       Такого сотрудника не существует.
                    </p>
                  </div>
                              </td>
                             </tr> :  users?.map((person)=> {
                              return <tr key={person.id}>
                            <td className='py-[10px] px-[20px] w-[20%] text-center border'>{person.name + ' ' + person.surname + ' ' + person.fathername}</td>
                            <td className='py-[10px] w-[15%] text-center border'>{person.company}</td>
                            <td className='py-[10px] w-[25%] text-center border'>{person.position}</td>
                            <td className='py-[10px] w-[17%] text-center border'>{person.department}</td>
                            <AlertDialogKr person={person} refetch={refetch}/>
                            
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
                sortBy == 'Ключевые должности' && (
                  <>
                  <div className='flex pt-[20px] flex-col gap-[20px]'>
                    <div className='flex items-center justify-between'>
                      <p className='text-[25px] font-semibold tracking-[1px]'>Фильтр</p>
                      <div className='flex gap-[20px] items-center'>
                        <GreenButton value={'Сбросить фильтры'} shirina={250} func={handleSbrosFilter}/>
                        <AddDialogKadrRezerv/>
                      </div>
                    </div>
                    <div className='grid grid-cols-3 gap-[20px]'>
                      <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="fio">Должность</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='fio' placeholder='Введите должность' value={position2} onChange={(e)=> setPosition2(e.target.value)}/>
                     </div>
                     <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="fio">Опыт работы</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='fio' placeholder='Введите опыт работы' value={lengthWork} onChange={(e)=> setLengthWork(e.target.value)}/>
                     </div>
                     <div className='flex flex-col gap-[10px]'>
                      <label htmlFor="fio">Компания</label>
                      <input type="text" className='py-[5px] w-[100%] px-[20px] rounded-[15px] outline-green-600 border border-gray-400' id='fio' placeholder='Введите название компании' 
                      value={company2} onChange={(e)=> setCompany2(e.target.value)}/>
                     </div>
                    </div>

                    <div className='rounded-[15px] mt-[20px] overflow-hidden'>
                      <table className='w-[100%] border border-collapse'>
                        <tbody>
                          <tr className='bg-green-600 text-white'>
                            <th className='py-[10px]'>Должность</th>
                            <th>Компания</th>
                            <th>Отдел</th>
                            <th>Опыт работы</th>
                            <th>Действие</th>
                          </tr>

                          {
                              positionData?.length == 0 ? <tr>
                                <td colSpan={5}>
                                  <div className='flex items-center justify-center h-[200px]'>
                    <p className='italic text-[25px] font-semibold text-green-600'>
                       Такой должности не существует.
                    </p>
                  </div>
                                </td>
                              </tr> :    positionData?.map((data: Position)=>{
                              return <tr key={data.id}>
                                <td className='py-[10px] w-[20%] text-center border'>{data.position}</td>
                                
                                <td className='py-[10px] w-[20%] text-center border'>{data.company}</td>
                                <td className='py-[10px] w-[20%] text-center border'>{data.department}</td>
                                <td className='py-[10px] w-[20%] text-center border'>{data.lengtWork}</td>
                                <AlertDialogShowOrHide data={data} refetch={refetch2}/>
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
  </section>
  </>
}

export default TalentPool