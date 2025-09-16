import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GreenButton from '../../shared/ui/button'
import toast from 'react-hot-toast'
import { usePostMaterialMutation } from '../../entities/materials/model/api'
import { usePostImageMutation } from '../../entities/files/model/api'
import AlertDialogSkills from './modal-for-skills/modalForSkills'




export default function ResponsiveAddDialog() {
    
  const [open, setOpen] = React.useState(false);
  const [postMaterial]=usePostMaterialMutation()
  const [title,setTitle]=React.useState('')
  const [type,setType]=React.useState('')
  const [opisanie,setOpisanie]=React.useState('')
  const [language,setLanguage]=React.useState('')
  const [categories,setCategories]=React.useState('')
  const [navik, setNavik] = React.useState<string[]>([]);
  const [degree,setDegree]=React.useState('')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [postImage, {data: imageData}] = usePostImageMutation();
 

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      console.log(file);
      
      if (!file) return;
  
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер изображения должен быть до 5 МБ');
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
     setType(event.target.value) 
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

 const postUser = async () => {
  const newMaterial = {
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
 
  
  
  try {
    await postMaterial(newMaterial).unwrap();
    toast.success('Материал успешно добавлен!');
    setTitle('');
    setType('');
    setOpisanie('');
    setLanguage('');
    setCategories('');
    setNavik([]);
    setDegree('');
    setOpen(false);
  } catch (error) {
    toast.error('Ошибка при добавлении материала');
    console.error('Ошибка:', error);
  }
};


  return (
    <React.Fragment>
		<Button
		onClick={handleClickOpen}
				 variant="contained"
				 sx={{
				  backgroundColor: "#4caf50", 
				  color: "white",
				  textTransform: 'none',
				 fontSize: '18px',
				 letterSpacing:'1px',
				 width: '23%',
				'&:hover': {
				 backgroundColor: "#43a047",
			 }
		  }}
		>   
					Добавить материал
					</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Добавление учебного материала'}
        </DialogTitle>
        <DialogContent>
				<div className='flex flex-col gap-[20px]'>
					<div className='flex gap-[20px] items-center'>
					<label htmlFor="name" className='w-[150px]'>Название : </label>
					<input type="text" id='name' className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' placeholder='Название' value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div className='flex gap-[20px] items-center'>
					<label htmlFor="inpTypeMaterial" className='w-[150px]'>Тип материала : </label>
					<select name=""  id="inpTypeMaterial" onChange={handleChange} defaultValue={'no choose'} className='w-[400px] py-[5px] px-[10px] rounded-[10px] border border-gray-300 outline-[#3EA458]' >
            <option value="no choose">Не выбрано</option>
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
          <AlertDialogSkills setNavik={setNavik}/>
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
 
         <GreenButton value='Добавить материал' shirina='250' func={postUser}/>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
