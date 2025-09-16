import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GreenButton, { SecondaryButton } from '../../shared/ui/button'
import toast from 'react-hot-toast'
import { usePostTrackMutation } from '../../entities/tracks/model/api'
import { useGetMaterialsQuery } from '../../entities/materials/model/api'
import { Checkbox } from '@mui/material'
import { useGetUsersQuery } from '../../entities/User/model/api'
import {usePostImageMutation } from '../../entities/files/model/api'
import { API_IMAGE, Users } from '../../shared/types'

interface Material {
	id: number 
	title: string
	coverImage: string
}

export default function ResponsiveAddDialogTraks() {
	const {data: materialData}=useGetMaterialsQuery([])
	const {data: userData}=useGetUsersQuery([])	
  const [open, setOpen] = React.useState(false);
  const [title,setTitle]=React.useState('')
  const [teaches,setTeaches]=React.useState('')
  const [category,setCategory]=React.useState('')
  const [duration,setDuration]=React.useState('')
  const [skills, setSkills]=React.useState('')
  const [competencies, setCompetencies]=React.useState('')
  const [opisanie,setOpisanie]=React.useState('')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [postTrack]= usePostTrackMutation()
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [userIds, setUserIds] = React.useState<number[]>([]);
   const [postImage, {data: imageData}] = usePostImageMutation();


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		  const file = e.target.files?.[0];
		
		  if (!file) return;
	 
		  if (file.size > 5 * 1024 * 1024) {
			 toast.error('Размер изображения должен быть до 5 МБ');
			 return;
		  }
	 
		  try {
			 await postImage(file).unwrap();
			 toast.success('Файл успешно загружен');			 
		  } catch (err) {
			 toast.error('Ошибка при загрузке');
			 console.error(err);
		  }
		};


   const handleCheckboxChange = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
		  setSelectedIds((prev) => [...prev, id]);
		} else {
		  setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
		}
	 };

	  const handleCheckboxChangeUser = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
		  setUserIds((prev) => [...prev, id]);
		} else {
		  setUserIds((prev) => prev.filter((selectedId) => selectedId !== id));
		}
	 };
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  setCategory(event.target.value)
  };
  const handleClickOpen = () => {
	 setOpen(true);
  };

  const handleClose = () => {
	 setOpen(false);
  };

  const postUser =async ()=>{
	const newTrack={
	 title: title,
	 description: opisanie,
	 teaches: teaches,
	 category: category,
	 duration: Number(duration),
	 skills: skills.split(','),
	 competencies: competencies.split(','),
	 materialIds: selectedIds,
	 userIds: userIds,
	 coverImage: imageData?.url 
	}   
	try {
		await postTrack(newTrack).unwrap()
		setOpen(false)
		toast.success('Трек успешно добавлен')
	setTitle('')
	setOpisanie('')
	setTeaches('')
	setSkills('')
	setCompetencies('')
	setCategory('')
	setDuration('')
	setSelectedIds([])
	setUserIds([])	
	} catch (error) {
		toast.error('Не удалось добавить трек')
		console.error(error);
		
	}
}

  return (
	 <React.Fragment>
		<GreenButton value={'Добавить трек'} shirina={250} func={handleClickOpen}/>
		<Dialog
		  fullScreen={fullScreen}
		  open={open}
		  onClose={handleClose}
		  aria-labelledby="responsive-dialog-title"
		>
		  <DialogTitle id="responsive-dialog-title">
			 {'Создание трека'}
		  </DialogTitle>
		  <DialogContent>
				<div className='flex flex-col gap-[20px]'>
					<div className='flex gap-[20px] items-center'>
					<label htmlFor="name" className='w-[150px]'>Название : </label>
					<input type="text" id='name' className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' placeholder='Название' value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className='flex gap-[20px] items-start'>
					<label htmlFor="opisanie" className='w-[150px]'>Краткое описание: <br /> Макс 140 знаков. </label>
					<textarea  id='opisanie' className='w-[400px] py-[5px] px-[10px] rounded-[10px] h-[150px] border border-gray-300 outline-[#3EA458]' placeholder='Четко и ёмко сформулированная суть подборки' value={opisanie} onChange={(e) => setOpisanie(e.target.value)} />
				</div>
				<div className='flex gap-[20px] items-start'>
					<label htmlFor="opisanie" className='w-[150px]'>Чему учит 
подборка: </label>
					<textarea  id='opisanie' className='w-[400px] py-[5px] px-[10px] rounded-[10px] h-[150px] border border-gray-300 outline-[#3EA458]' placeholder='Подробный текст о том, какие навыки будут приобретены после изучения' value={teaches} onChange={(e) => setTeaches(e.target.value)} />
				</div>

				<div className='flex gap-[20px] items-start'>
					<label htmlFor="file" className='w-[150px]'>Обложка : </label>
					<input type='file'  id='file' className='w-[400px] py-[5px] px-[10px]  outline-[#3EA458]'  onChange={handleFileChange}/>
				</div>

				<div className='flex gap-[20px] items-center'>
					<label htmlFor="naviki" className='w-[150px]'>Навыки : </label>
					<input type="text" id='naviki' className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' placeholder='Введите название навыки из справочника (до 50 навыков)' value={skills} onChange={(e) => setSkills(e.target.value)} />
				</div>
				<div className='flex gap-[20px] items-center'>
					<label htmlFor="naviki" className='w-[150px]'>Компетенция : </label>
					<input type="text" id='naviki' className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' placeholder='Выберите до 10 компетенции из списка' 
					value={competencies} onChange={(e) => setCompetencies(e.target.value)} 
					/>
				</div>

				<div className='flex gap-[20px] items-center'>
					<label htmlFor="language" className='w-[150px]'>Категория </label>
					<select name=""  id="language" value={category} onChange={handleChange} className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' >
						<option value="">Не выбрано</option>
						<option value="HardSkills">Hard Skills</option>
						<option value="SoftSkills">Soft Skills</option>
			 </select>
				</div>

				<div className='flex gap-[20px] items-center'>
					<label htmlFor="naviki" className='w-[150px]'>Длительность в днях </label>
					<input type="number" id='naviki' className='w-[300px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' placeholder='Укажите число' 
					value={duration} onChange={(e) => setDuration(e.target.value)} 
					/>
				</div>

				<div className='flex flex-col gap-[20px]'>

					<div className='flex  justify-between items-center'>
						<p className='text-[22px] font-semibold'>Содержание трека:</p>
					</div>
					<div className='w-[100%] px-[20px] h-[200px] overflow-auto flex flex-col  gap-[10px]'>
						{
							materialData?.map((material: Material)=>{
								return <div key={material.id} className='flex justify-between items-center'>
									<img src={`${API_IMAGE}${material.coverImage}`} className='w-[100px]' alt="" />
									<p>
										{material.title}
									</p>
									 <Checkbox checked={selectedIds?.includes(material.id)}
															 onChange={handleCheckboxChange(material.id)} />
									</div>
							})
						}
					</div>
				</div>

            <div className='flex flex-col gap-[20px]'>

					<div className='flex  justify-between items-center'>
						<p className='text-[22px] font-semibold'>Доступ сотрудникам :</p>
					</div>
					<div className='w-[100%] px-[20px] h-[200px] overflow-auto flex flex-col  gap-[10px]'>
						{
							userData?.map((user: Users)=>{
								return <div key={user.id} className='flex justify-between items-center'>
									<img src="/pages/account/image 3 (1).png" className='w-[30px]' alt="" />
									<p>
										{user.name+" "+ user.surname}
									</p>
									 <Checkbox checked={userIds?.includes(user.id)}
															 onChange={handleCheckboxChangeUser(user.id)} />
									</div>
							})
						}
					</div>
				</div>


				</div>
				
		  </DialogContent>
		  <DialogActions>
          <div className='flex gap-[20px]'>
				<SecondaryButton value={'Отмена'} shirina={150} func={handleClose} />
				<GreenButton value='Создать' shirina='250' func={postUser}/>
			 </div>
			
		  </DialogActions>
		</Dialog>
	 </React.Fragment>
  );
}
