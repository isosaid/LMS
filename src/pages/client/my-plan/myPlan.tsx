import { Tab, Tabs } from '@mui/material'
import { CircleCheckBig, Download, FileText} from 'lucide-react'
import {useMemo, useState } from 'react'
import { API_IMAGE, SortType5, SortType6, Ypres } from '../../../shared/types'
import BarComponent from '../../../widgets/client/proccessing/progressBar'
import { useGetUserProfileQuery } from '../../../entities/User/model/api'
import { useGetYpresUserQuery } from '../../../entities/IDP/model/api'
import { Link } from 'react-router'


interface MaterialUser{
   YpresMaterial: {
     status: string
   }
}

const MyPlan = () => {
  const {data: userData, isLoading}=useGetUserProfileQuery([])
 const {data: ypresData, isLoading: ypresLoading}=useGetYpresUserQuery([])  
 
 const [filterMaterial,setFilterMaterial]=useState('')
 const [sortTracks,setSortTracks]=useState<SortType6>('pending')
 const [filterTracks,setFilterTracks]=useState('')
 const [filter, setFilter]=useState<SortType6>('pending')
 const [sortBy, setSortBy] = useState<SortType5>('Обучение')
 const handleSortByChange = (value: SortType5) => {
   setSortBy(value)				
  }

  console.log(userData);
  

 const filteredMaterials = useMemo(() => {
  if (!userData?.plannedMaterials) return [];

  let result = [...userData.plannedMaterials];

  if (filterMaterial) {
    result = result.filter(product =>
      product.title &&
      product.title.toLowerCase().includes(filterMaterial.toLowerCase())
    );
  }

  if (filter) {

    result = result.filter(material => {
      return material.MaterialUser.status === filter;
    });
  }

  return result;
}, [filterMaterial, filter, userData]);



 
const pendingCount = ypresData?.[0]?.materialIds.reduce((acc: number, material: MaterialUser) => {
  if (material.YpresMaterial.status === 'completed') {
    acc++;
  }
  return acc;
}, 0);




const filteredTracks = useMemo(() => {
  if (!userData?.plannedTracks) return [];

  let result = [...userData.plannedTracks];

  if (filterTracks) {
    result = result.filter(track =>
      track.title?.toLowerCase().includes(filterTracks.toLowerCase())
    );
  }

  if (sortTracks) {
    result = result.filter(track => track.TrackUser.status === sortTracks);
  }

  return result;
}, [filterTracks, sortTracks, userData]);


const formatDateToDDMMYYYY = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
};


if (isLoading || ypresLoading ) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>
   <section className='w-[77%] m-auto flex flex-col gap-[10px]'>
    <p className='text-[35px] font-semibold'>Мой учебный план </p>
    <p className='text-[22px] mb-[20px] '>Статистика</p>
    <div className='flex justify-between  items-center'>
      <div className='gap-[25px] items-center w-[350px] h-[100px] flex border border-gray-400 px-[20px] py-[10px] rounded-[20px]'>
        <div className='bg-[#3EA458] rounded-full p-[15px]'> <FileText className='w-[40px] h-[40px] text-white'/></div>
        <div className='flex flex-col gap-[10px] '>
          <p className='text-[#ADABAB]'>ИНДИВИДУАЛЬНЫЙ ПЛАН <br />
РАЗВИТИЯ</p>
          <p>{ypresData?.[0]?.materialIds?.length ?? 0} МАТЕРИАЛА</p>
        </div>
      </div>
      <div className='gap-[25px] items-center h-[100px] w-[350px] flex border border-gray-400 px-[20px] py-[10px] rounded-[20px]'>
        <div className='bg-[#3EA458] rounded-full p-[15px]'> <CircleCheckBig className='w-[40px] h-[40px] text-white'/></div>
        <div className='flex flex-col justify-between gap-[10px] '>
          <p className='text-[#ADABAB]'>ПРОЙДЕНО</p>
          <p>{pendingCount} МАТЕРИАЛОВ</p>
        </div>
      </div>
      <div className='gap-[25px] items-center h-[100px] w-[350px] flex border border-gray-400 px-[20px] py-[10px] rounded-[20px]'>
        <div className='bg-[#3EA458] rounded-full p-[15px]'> <Download className='w-[40px] h-[40px] text-white'/></div>
        <div className='flex flex-col gap-[10px] '>
          <p className='text-[#ADABAB]'>БЛИЖАЙШАЯ АКТИВНОСТЬ</p>
          <p>Не запланировано </p>
        </div>
      </div>
    </div>
    
    <div className='pt-[40px]'>
				<Tabs
						value={sortBy}
						onChange={(_, newValue) => handleSortByChange(newValue)}
						sx={{
							display: 'inline-flex',
							ml: 1,
							'& .MuiTabs-indicator': { backgroundColor: '#3EA458' },
						}}
					>
            <Tab
							sx={{
								'&.Mui-selected': { color: '#3EA458' },
							}}
							label='Обучение'
							value='Обучение'
						/>
						<Tab
							sx={{
								'&.Mui-selected': { color: '#3EA458' },
							}}
							label='Треки'
							value='Треки'
						/>
						<Tab
							sx={{
								'&.Mui-selected': {  color: '#3EA458' },
							}}
							label='ИПР'
							value='ИПР'
						/>
					</Tabs>
			</div>
      <div className='border my-[20px] flex flex-col gap-[30px] rounded-[20px] py-[30px] px-[30px] ' >
        {
          sortBy === "Обучение" &&  (
           <>
           <div className='flex  w-[100%] justify-between items-center'>
             <div className='flex w-[50%] rounded-[10px] py-[10px] gap-[20px] border  pl-[20px]' >
            <input type="text" className='w-[100%] outline-none ' placeholder='Введите наименование материала' value={filterMaterial}
  onChange={(e) => setFilterMaterial(e.target.value)}/>
            
          </div>
          <div className='flex justify-end  w-[50%]'>
              <div className={` ${filter == 'pending' ? 'bg-green-600 text-white' : 'bg-white text-[#00000080]'} transition-all duration-200 ease-in-out border py-[10px] w-[150px] text-center `} onClick={()=>setFilter('pending')}>
                <p>В ожидании</p>
              </div>
              <div className={`${filter == 'in_progress' ? 'bg-green-600 text-white' : 'bg-white text-[#00000080]'} transition-all duration-200 ease-in-out border py-[10px] w-[150px] text-center `} onClick={()=>setFilter('in_progress')}>
                <p>В процессе</p>
              </div>
              <div className={`${filter == 'completed' ? 'bg-green-600 text-white' : 'bg-white text-[#00000080]'} transition-all duration-200 ease-in-out py-[10px] border w-[150px] text-center `} onClick={()=>setFilter('completed')}>
                <p>Архив</p>
              </div>
            </div>
          </div>
       
          <div className=' flex flex-col  gap-[20px]'>
            {
              filteredMaterials?.length == 0 ? <div className='flex items-center justify-center h-[100px]'> 
                <p className='text-[25px] italic text-green-600 font-semibold tracking-[1px]'>Такого материала не существует.</p>
              </div>  :
              filteredMaterials?.map((material)=>{
                return <div key={material.id} className=' flex justify-between items-center'>
              <div className='flex gap-[30px] items-center'>
                <Link to={`/user/${material.id}`}> 
                <img src={`${API_IMAGE}${material.coverImage}`} alt="" className='rounded-[20px] w-[350px]' />
                </Link>
                
                <div className='flex flex-col gap-[10px]'>
                  <p className='ml-[20px] text-[25px] font-semibold'>{material.title}</p>
                  <div className='w-[200px]'>
                    <BarComponent/>
                  </div>
                  
                </div>

              </div>
              
                <button className='border text-[18px] rounded-[20px] py-[5px] w-[200px]'>{material.MaterialUser.status == 'pending' ? 'В ожидании' : material.MaterialUser.status == 'in_progress' ? 'В процессе' : 'Архив' }</button>
            </div>
              })
            }
          </div>
           </>
          
            
        )}

        {
          sortBy == 'Треки' && ( 
            <>
             <div className='flex  w-[100%] justify-between items-center'>
             <div className='flex w-[50%] rounded-[10px] py-[10px] gap-[20px] border  pl-[20px]' >
            <input
  type="text"
  className='w-[100%] outline-none'
  placeholder='Введите наименование трека'
  value={filterTracks}
  onChange={(e) => setFilterTracks(e.target.value)}
/>

            
          </div>
          <div className='flex justify-end  w-[50%]'>
              <div className={` ${sortTracks == 'pending' ? 'bg-green-600 text-white' : 'bg-white text-[#00000080]'} transition-all duration-200 ease-in-out border py-[10px] w-[150px] text-center `} onClick={()=>setSortTracks('pending')}>
                <p>В ожидании</p>
              </div>
              <div className={`${sortTracks == 'in_progress' ? 'bg-green-600 text-white' : 'bg-white text-[#00000080]'} transition-all duration-200 ease-in-out border py-[10px] w-[150px] text-center `} onClick={()=>setSortTracks('in_progress')}>
                <p>В процессе</p>
              </div>
              <div className={`${sortTracks == 'completed' ? 'bg-green-600 text-white' : 'bg-white text-[#00000080]'} transition-all duration-200 ease-in-out py-[10px] border w-[150px] text-center `} onClick={()=>setSortTracks('completed')}>
                <p>Архив</p>
              </div>
            </div>
          </div>
       
          <div className=' flex flex-col gap-[20px]'>
            {
              filteredTracks?.length == 0 ?  
              <div className='flex items-center justify-center h-[100px]'> 
                <p className='text-[25px] italic text-green-600 font-semibold tracking-[1px]'>Такого учебного трека не существует.</p>
              </div>  :
              filteredTracks?.map((track)=>{
                return  <Link to={`/user/track/${track.id}`}><div key={track.id} className=' flex justify-between px-[20px] rounded-[15px] bg-[#EEFFE8] py-[20px] items-center'>
              <div className='flex gap-[30px] items-center'>
                <img src={`${API_IMAGE}${track.coverImage}`} alt="" className='rounded-[20px] w-[350px] '/>
                <div className='w-[60%] flex flex-col gap-[10px]'>
                  <p className='text-[20px] font-semibold'>{track.title}</p>
                  <p className='text-[13px]'>{`${track.description}`}</p>
                </div>
              </div>
                <div className='flex flex-col items-center gap-[10px]'>
                  <button className='border text-[16px] rounded-[20px] py-[5px] w-[150px]'>В ожидании</button>
                  <div className='w-[200px]'>
                    <BarComponent/>
                  </div>
                </div>
                
            </div></Link>
                
              })
            }
          </div>
            </>
          )
        }

        {
          sortBy == 'ИПР' && ( 
            <>
            {
              ypresData?.map((ypres: Ypres)=> {
                return <div key={ypres.id} className='flex flex-col gap-[20px]'>
              <p className='text-[25px] font-semibold'>Индивидуальный план развития</p>
              <div className='flex gap-[20px]'>  
                <div className='flex flex-col gap-[20px]'>
                  <div className='flex gap-[20px] items-center'>
                    <label htmlFor="fio" className='text-[17px] font-semibold w-[150px]'>ФИО сотрудника : </label>
                    <input type="text" placeholder='ФИО' readOnly value={userData?.name + ' ' + userData?.surname} className='py-[5px] px-[20px] border w-[300px] rounded-[10px] outline-green-600'/>
                  </div>
                  <div className='flex gap-[20px] items-center'>
                    <label htmlFor="fio" className='text-[17px] font-semibold w-[150px]'>Должность : </label>
                    <input type="text" placeholder='Должность' className='py-[5px] px-[20px] border w-[400px] rounded-[10px] outline-green-600' value={userData?.position} readOnly/>
                  </div>

                  <div className='flex gap-[20px] items-center'>
                    <label htmlFor="fio" className='text-[17px] font-semibold w-[150px]'>Дата заполнения : </label>
                    <input type="date" readOnly value={ypres?.createdAt ? new Date(ypres?.createdAt).toISOString().slice(0, 10) : ''} className='py-[5px] px-[20px] border w-[200px] rounded-[10px] outline-green-600'/>
                  </div>
                </div>
                <div className='flex flex-col gap-[20px]'>
                  <div className='flex ml-[20px] gap-[20px] items-center'>
                    <label htmlFor="fio" className='text-[17px] font-semibold w-[200px]'>Период планирования : </label>
                    <input type="date" className='py-[5px] px-[20px] border w-[200px] rounded-[10px] outline-green-600' readOnly value={ypres?.time || ''}/>
                  </div>

                  <BarComponent/>
                </div>
              </div>

              <div>
                <table className='w-[100%] border border-gray-400 border-collapse'>
                  <tbody>
                    <tr className='bg-green-600 text-white'>
                      <th className=' w-[22%] border px-[10px]'>Компетенция / Навыки / Знания</th>
                      <th className=' px-[10px] border w-[15%]'>Срок</th>
                      <th className='px-[10px] border'>Курсы</th>
                      <th className=' w-[20%] border px-[10px]'>Статус</th>
                    </tr>
                    <tr>
                      <td rowSpan={2} className='py-[15px] border border-gray-400 px-[10px] text-center'><button className='bg-green-600 text-white py-[5px] px-[10px] rounded-[10px]'>{ypres?.competencies + ' / ' + ypres?.skills + ' / ' + ypres?.lore}</button></td>
                       <td className='py-[10px] border border-gray-400 px-[10px] text-center'>
                        <div className='flex  flex-col items-center justify-center gap-[10px] py-[5px]'>
                          {
                            ypres?.materialIds?.map((material)=>{
                              return <div key={material.id} className='h-[100px] flex items-center justify-center'>
                                <button key={material.id} className='bg-green-600  text-white py-[5px] px-[10px] rounded-[10px]'>{formatDateToDDMMYYYY(material?.YpresMaterial?.dedline || '2025-12-12')}</button>
                              </div>
                               
                            })
                          }
                        </div>
                        
                      </td>
                      <td className='py-[10px] border border-gray-400 px-[10px] text-center'>
                        <div className='flex  flex-col gap-[10px]'>
                          {
                            ypres?.materialIds?.map((material)=>{
                              return <Link to={`/user/${material.id}`}>
                                <div key={material.id} className='  h-[100px] flex justify-center gap-[20px] items-center'>
                             <img src={`${API_IMAGE}${material.coverImage}`} alt="" className='rounded-[20px] w-[150px]' />
                        <p className='w-[200px] text-[20px] italic font-semibold tracking-[1px]'>{material.title}</p>
                        </div>
                              </Link>
                               
                            })
                          }
                        </div>
                        </td>
                      <td className='py-[10px] border border-gray-400 px-[10px] text-center'>
                        <div className='flex flex-col gap-[20px]'>
                          {
                            ypres?.materialIds?.map((material)=>{
                              return <div key={material.id} className='flex flex-col h-[100px] gap-[10px] items-center'>
                          <button className='py-[5px] px-[20px] border rounded-[15px]'>В процессе</button>
                          <BarComponent/>
                        </div>
                            })
                          }
                        </div>
                        
                      </td>
                      
                    </tr>
                   
                  </tbody>
                </table>
              </div>
            </div>
              })
            }
            
            </>
          )
        }
      </div>
    </section>  
  </>
}

export default MyPlan