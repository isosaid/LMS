import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GreenButton from '../../shared/ui/button'
import toast from 'react-hot-toast'
import { usePutMaterialMutation } from '../../entities/materials/model/api'
import { SquarePen } from 'lucide-react'
import { useDeleteFileUrlMutation, usePostImageMutation } from '../../entities/files/model/api'
import AlertDialogEditSkills from './modal-for-skills/modalEditSkills'

export default function ResponsiveEditDialog({item} : any) {
  const [open, setOpen] = React.useState(false);
  const [title,setTitle]=React.useState(item.title)
  const [type,setType]=React.useState(item.type)
  const [opisanie,setOpisanie]=React.useState(item.description)
  const [language,setLanguage]=React.useState(item.lang)
  const [categories,setCategories]=React.useState(item.category)
  const [navik, setNavik] = React.useState<string[]>([]);
  const [degree,setDegree]=React.useState(item.levels)
  const [putMaterial]=usePutMaterialMutation()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [postImage, {data: imageData}] = usePostImageMutation();
  const [deleteFileUrl]=useDeleteFileUrlMutation()

  



   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		  const file = e.target.files?.[0];
		console.log(file);
		
		  if (!file) return;
	 
		  if (file.size > 5 * 1024 * 1024) {
			 toast.error('Размер изображения должен быть до 5 МБ');
			 return;
		  }
	 
		  try {
			 await postImage(file).unwrap();
			 toast.success('Файл успешно загружен');
			 console.log(file);
			 
		  } catch (err) {
			 toast.error('Ошибка при загрузке');
			 console.error(err);
		  }
		};

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  setType(event.target.value) 
  };
  

  const handleClickOpen = () => {
	 setOpen(true);
  };

  const handleClose = () => {
	 setOpen(false);
  };
 const editMaterial = async () => {
  const newMaterial = {
	 id: item.id,
	 title: title,
	 type: type,
	 description: opisanie,
	 coverImage: imageData?.url,
	 skills: navik,
	 lang: language,
	 category: categories,
	 levels: degree,
	 userIds: [],
  };
  


  if(imageData?.url) {
	const converted = item?.coverImage
  ?.replace(/^\/+/, "")
  .replace(/\//g, "%5C");

	  console.log(converted);
	 try {
    await deleteFileUrl(converted).unwrap();
    console.log("Фото удалено:", converted);
  } catch (err) {
    console.error("Ошибка при удалении фото:", err);
  }
   try {
	 await putMaterial(newMaterial).unwrap();
	 toast.success('Материал успешно обновлен !');
	 setOpen(false);
  } catch (error) {
	 toast.error('Ошибка при изменении материала');
	 console.error('Ошибка:', error);
  }
  } else {
	
	try {
	 await putMaterial(newMaterial).unwrap();
	 toast.success('Материал успешно обновлен !');
	 setOpen(false);
  } catch (error) {
	 toast.error('Ошибка при изменении материала');
	 console.error('Ошибка:', error);
  }
  }  
};


  return (
	 <React.Fragment>
		<SquarePen onClick={handleClickOpen} color='#3EA458' 
					 style={{
			 transition: 'all 0.3s ease',
			 cursor: 'pointer'
		  }}
		  onMouseEnter={(e) => {
			 e.currentTarget.style.color = '#ff5555';
			 e.currentTarget.style.transform = 'scale(1.2)';
		  }}
		  onMouseLeave={(e) => {
			 e.currentTarget.style.color = '#e92f2f';
			 e.currentTarget.style.transform = 'scale(1)';
					  }} /> 
		<Dialog
		  fullScreen={fullScreen}
		  open={open}
		  onClose={handleClose}
		  aria-labelledby="responsive-dialog-title"
		>
		  <DialogTitle id="responsive-dialog-title">
			 {'Изменение учебного материала'}
		  </DialogTitle>
		  <DialogContent>
				<div className='flex flex-col gap-[20px]'>
					<div className='flex gap-[20px] items-center'>
					<label htmlFor="name" className='w-[150px]'>Название : </label>
					<input type="text" id='name' className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' placeholder='Название' value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className='flex gap-[20px] items-center'>
					<label htmlFor="inpTypeMaterial" className='w-[150px]'>Тип материала : </label>
					<select name=""  id="inpTypeMaterial" onChange={handleChange} value={type} className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' >
				<option value="">Не выбрано</option>
				<option value="test">Тест</option>
				<option value="video">Видео</option>
				<option value="article">Статья</option>
				<option value="electrokurs">Электроный курс</option>
				<option value="book">Книга</option>
			 </select>
				</div>
				<div className='flex gap-[20px] items-start'>
					<label htmlFor="opisanie" className='w-[150px]'>Описание : </label>
					<textarea  id='opisanie' className='w-[400px] py-[5px] px-[10px] rounded-[10px] h-[100px] border border-gray-300 outline-[#3EA458]' placeholder='Описание материала' value={opisanie} onChange={(e) => setOpisanie(e.target.value)} />
				</div>

				<div className='flex gap-[20px] items-start'>
					<label htmlFor="file" className='w-[150px]'>Обложка : </label>
					<input type='file'  id='file' className='w-[400px] py-[5px] px-[10px]  outline-[#3EA458]' onChange={handleFileChange} />
				</div>

				<div className=''>
								  <div className='flex gap-[20px] items-center'>
									 <label htmlFor="naviki" className='w-[150px]'>Навыки : </label>
							 <AlertDialogEditSkills setNavik={setNavik} item={item}/>
								  </div>
								  {navik.length > 0 && (
						 <div className="mt-2 text-green-700">
						  Вы выбрали такие навыки как : {navik.join(', ')}
						 </div>
				)}
				</div>

				<div className='flex gap-[20px] items-center'>
					<label htmlFor="language" className='w-[150px]'>Язык : </label>
					<select name=""  id="language" value={language} onChange={(e)=>setLanguage(e.target.value)} className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' >
						<option value="no choose">Не выбрано</option>
				<option value="ru">Русский</option>
				<option value="en">Английский</option>
				<option value="tj">Таджикский</option>
			 </select>
				</div>

				<div className='flex gap-[20px] items-center'>
					<label htmlFor="inpTypeMaterial" className='w-[150px]'>Категории :  </label>
					<select name=""  id="inpTypeMaterial" value={categories} onChange={(e)=>setCategories(e.target.value)}  className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' >
				<option value="Не выбрано">Не выбрано</option>
				<option value="Hard Skills">Hard Skills</option>
				<option value="Soft Skills">Soft Skills</option>
				<option value="Cimahifjoia">Cimahifjoia</option>
  
			 </select>
				</div>


				<div className='flex gap-[20px] items-center'>
					<label htmlFor="inpTypeMaterial" className='w-[150px]'>Уровень : </label>
					<select name=""  id="inpTypeMaterial" value={degree} onChange={(e)=>setDegree(e.target.value)} className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' >
				<option value="no choose">Не выбрано</option>
				<option value="basic">Базовый</option>
				<option value="intermediate">Продвинутый</option>
				<option value="advanced">Специалист</option>
  
			 </select>
				</div>

				</div>
				
		  </DialogContent>
		  <DialogActions>
 
			<GreenButton value='Изменить материал' shirina='250' func={editMaterial}/>
		  </DialogActions>
		</Dialog>
	 </React.Fragment>
  );
}
