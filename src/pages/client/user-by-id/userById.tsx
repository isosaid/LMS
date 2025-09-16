import {  Tab, Tabs } from '@mui/material'
import { API, MyJwtPayload, OtherDocuments, SortType3 } from '../../../shared/types'
import { useEffect, useState } from 'react'
import {  useParams } from 'react-router'
import { jwtDecode} from "jwt-decode";
import EmployeeProfileForm from '../../../widgets/client/profile/employProfileForm'
import { useGetUserByIdQuery} from '../../../entities/User/model/api'
import SkillsAssisment from '../../../widgets/client/profile/skillsAssisment'
import { ArrowDownToLine } from 'lucide-react'
// import FormPasswordDialogProfile from '../../../widgets/admin/dialogChangePasswordProfile'
// import ModalForDopInfoEdit from '../../../widgets/client/modalDopInfoEdit'

const ProfileById = () => {
	const params=useParams()
	const [sortBy, setSortBy] = useState<SortType3>('Личная информация')
	const handleSortByChange = (value: SortType3) => {
					setSortBy(value)				
				}
	const [btnShow, setBtnShow]=useState(false)
	const {data,isLoading}=useGetUserByIdQuery(params.id)


	const formatFileName = (name: string) => {
  if (!name) return ''
  const parts = name.split('.')          
  const ext = parts.pop()               
  const baseName = parts.join('.')  
  const shortName = baseName.length > 5 ? baseName.slice(0, 7) + '…' : baseName
  return `${shortName}.${ext}`
}
	
	 const downloadFile = async (url: string, filename: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(link.href);
}

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

if (isLoading) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return <>
  <section className='w-[80%] m-auto overflow-hidden'>
   <div className='flex items-center justify-between '>
		<div className='flex w-[55%]  gap-[70px] items-center'>
			<img src="/pages/account/image 3 (1).png" alt="" />
			<div className='flex flex-col gap-[10px]'>
				<p className='text-[30px] tracking-[1px] text-black font-semibold'>{data?.name +" "+  data?.surname}</p>
				<p className='text-black font-semibold text-[18px]'>Должность : <span className='text-[#0000004D]'>{data?.position}</span></p>
				<p className='text-black font-semibold text-[18px]'> Отдел : <span className='text-[#0000004D]'>{data?.department}</span></p>
				<p className='text-black font-semibold text-[18px]'>Руководитель : <span className='text-[#86C696] font-semibold'>{data?.supervisor}</span></p>
				{/* <div className='flex gap-[20px] items-center'>
							<FormPasswordDialogProfile userId={data.id}/>
						</div> */}
			</div>
		</div>
		<div className='flex w-[40%] flex-col gap-[10px]'>
			<p className='text-black font-semibold text-[18px]'>Документы : </p>
			<div className='flex flex-col items-start '>
				<p className='text-[#0000004D] text-[18px] tracking-[1px]'>Резюме : </p>
				{data?.resume?.url && (
  <a
    href={`${API}/${data.resume.url}`}      
    download={data.resume.originalName}     
    target="_blank"                        
    rel="noopener noreferrer"
	 className='text-center flex flex-col items-center'
  >
    <ArrowDownToLine />
	 <p>{formatFileName(data.resume.originalName)}</p>
  </a>
)}


			</div>
			<div className='flex flex-col items-start '>
				<p className='text-[#0000004D] text-[18px] tracking-[1px]'>Другие документы : </p>
				<div className='flex gap-[20px]'>
					{data?.otherDocuments?.map((item: OtherDocuments) => (
  <div key={item.id} className='flex flex-col items-center gap-[10px]' onClick={() => downloadFile(`${API}/${item.url}`, item.originalName)}> 
      <ArrowDownToLine/>
      <p>{formatFileName(item.originalName)}</p>
  </div>
))}
				</div>
				
			</div>
			{/* <div className='flex gap-[20px] items-center'>
			            <ModalForDopInfoEdit />
						</div> */}
			
			
		</div>
	</div>
	  <div className='pt-[50px]'>
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
							label='Личная информация'
							value='Личная информация'
						/>
						<Tab
							sx={{
								'&.Mui-selected': {  color: '#3EA458' },
							}}
							label='Профессиональные навыки и качества'
							value='Профессиональные навыки и качества'
						/>
					</Tabs>
		</div>
			{
				sortBy == 'Личная информация' && (
					<>
					<EmployeeProfileForm data={data} />
					</>
				)
			} 
			{
				sortBy == 'Профессиональные навыки и качества' && (
					<>
					<SkillsAssisment data={data}/>
					</>
				)
			} 
			
			

  </section>
  </>
}

export default ProfileById