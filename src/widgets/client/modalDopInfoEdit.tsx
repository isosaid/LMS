
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TextField } from '@mui/material'
import {useGetUserProfileQuery, useUpdateUserMutation } from '../../entities/User/model/api'
import GreenButton from '../../shared/ui/button'
import toast from 'react-hot-toast'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
	 children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function ModalForDopInfoEdit() {
	const [updateUser]=useUpdateUserMutation()
	const {data: userData }=useGetUserProfileQuery([])	
 const [courses, setCourses] = React.useState(['']);
 
 const [trening, setTrening] = React.useState(['']);
 const [program, setProgram] = React.useState(['']);
 const [hobby, setHobby] = React.useState(['']);
 const [careerGoalss, setCareersGoal]=React.useState('')
 const [willLearn, setWillLearn]=React.useState('')
 const [openModalEdit,setOpenModalEdit]=React.useState(false)
 const [publicAndCorporate, setPublicAndCorporate]=React.useState('')
 const [willToTravel, setWillToTravel]=React.useState('')
 const [rotate, setRotate]=React.useState('')
const [certificate, setCertificate] = React.useState<{ name: string; dateReceived: string }[]>([
  { name: "", dateReceived: "22.05.1099" },
]);
const handleOpen = ()=>{
	setOpenModalEdit(true)
}


 React.useEffect(()=>{
	if(userData?.courses){
		setCourses(userData?.courses)
	}
	if(userData?.trainings){
		setTrening(userData?.trainings)
	}
	if(userData?.programs){
		setProgram(userData?.programs)
	}
	if(userData?.hobbies){
		setHobby(userData?.hobbies)
	}
	if(userData?.сareerGoals) {
		setCareersGoal(userData?.сareerGoals)
	}
	if(userData?.willToLearn) {
		setWillLearn('yes')
	} else {
		setWillLearn('no')
	}

	if(userData?.willToTravel) {
		setWillToTravel('yes')
	} else {
		setWillToTravel('no')
	}

	if(userData?.publicAndCorporate) {
		setPublicAndCorporate('yes')
	} else {
		setPublicAndCorporate('no')
	}


	if(userData?.willToRotateChangePositions) {
		setRotate('yes')
	} else {
		setRotate('no')
	}

	

	
 }, [userData?.courses, userData?.trainings, userData?.programs, userData?.hobbies,  userData?.careerGoals, userData?.сareerGoals, userData?.willToLearn,userData?.willToTravel, userData?.willToRotateChangePositions, userData?.publicAndCorporate])


 React.useEffect(() => {
  if (userData?.docName) {
    const formattedCertificates = userData.docName.map((doc: any) => 
      typeof doc === "string"
        ? { name: doc, dateReceived: "" }
        : doc 
    );
    setCertificate(formattedCertificates);
  }
}, [userData?.docName]);


const handleCertificateChange = (
  index: number,
  key: "name" | "dateReceived",
  value: string
) => {
  const updatedCertificates = certificate.map((cert, i) =>
    i === index ? { ...cert, [key]: value } : cert
  );
  setCertificate(updatedCertificates);
};


const addCertificate = () => {
  setCertificate([...certificate, { name: "", dateReceived: "25.05.2025" }]);
};



const removeCertificate = (index: number) => {
  const updatedCourses = certificate.filter((_, i) => i !== index);
  setCertificate(updatedCourses);
};
 

 const handleHobbyChange = (index: number, value: string) => {
  const updatedCourses = [...hobby];
  updatedCourses[index]= value;
  setHobby(updatedCourses);
};

const addHobby= () => {
  setHobby([...hobby, '']);
};

const removeHobby = (index: number) => {
  const updatedCourses = hobby.filter((_, i) => i !== index);
  setHobby(updatedCourses);
};
 

const handleProgramChange = (index: number, value: string) => {
  const updatedCourses = [...program];
  updatedCourses[index]= value;
  setProgram(updatedCourses);
};

const addProgram= () => {
  setProgram([...program, '']);
};

const removeProgram = (index: number) => {
  const updatedCourses = program.filter((_, i) => i !== index);
  setProgram(updatedCourses);
};


const handleCourseChange = (index: number, value: string) => {
  const updatedCourses = [...courses];
  updatedCourses[index]= value;
  setCourses(updatedCourses);
};

const handleTreningChange = (index: number, value: string) => {
  const updatedCourses = [...trening];
  updatedCourses[index] = value;
  setTrening(updatedCourses);
};
const addTrening= () => {
  setTrening([...trening, '']);
};

const removeTrening = (index: number) => {
  const updatedCourses = trening.filter((_, i) => i !== index);
  setTrening(updatedCourses);
};

const addCourse = () => {
  setCourses([...courses, '']);
};

const removeCourse = (index: number) => {
  const updatedCourses = courses.filter((_, i) => i !== index);
  setCourses(updatedCourses);
};
  
  const handleClose = () => {
	 setOpenModalEdit(false);
  };


  const sendDopInfo=async ()=>{
	const userDopInfo={
  "courses": courses,
  "trainings": trening,
  "programs": program,
  "willToLearn": willLearn == 'yes' ? true : false,
  "publicAndCorporate": publicAndCorporate == 'yes' ? true : false,
  "willToTravel": willToTravel == 'yes' ? true : false,
  "willToRotateChangePositions": rotate == 'yes' ? true : false,
  "сareerGoals": careerGoalss,
  "docName": certificate,
  "hobbies": hobby
	}
	try {
	await updateUser(userDopInfo).unwrap()
	toast.success('Ваши данные успешно обновлены')
	setOpenModalEdit(false)
	} catch (error) {
		console.error(error);
		toast.error('Не удалось обновить данные пользователя')
	}
	
  }


  return (
	 <React.Fragment>
		<div>
			<GreenButton value={'Изменить профиль'} shirina={200} func={handleOpen}/>
		</div>
		<Dialog
		  open={openModalEdit}
		  slots={{
			 transition: Transition,
		  }}
		  keepMounted
		  onClose={handleClose}
		  aria-describedby="alert-dialog-slide-description"
		>
			
		  <DialogContent>
			
			<p className='text-[24px] font-semibold text-center'>Дополнительная информация </p>
			 <div className='w-[500px] flex flex-col gap-[30px]'>
				<div className='flex flex-col gap-[10px]'>
				  <TextField id="two" label="ФИО" placeholder='Введите ФИО' variant="standard" className='w-[100%]' value={userData?.name + ' ' + userData?.surname+ " " + userData?.fathername} 
				  />
				<TextField id="twoafaf" label="Почта" placeholder='Введите почту' variant="standard" className='w-[100%]' value={userData?.email	|| ''} />
				<TextField id="twogf" label="Должность" placeholder='Введите должность' variant="standard" className='w-[100%]' value={userData?.position || ''}/>
				<TextField id="twoee" label="Руководитель" placeholder='Введите руководителя' variant="standard" className='w-[100%]' value={userData?.supervisor || ''} />
				

				</div>
				
			  <div className='flex flex-col gap-[10px]'>
			  <div className='flex flex-col gap-[10px]'>
					<p className='text-[18px] tracking-[1px]'>Курсы </p>
					{
						courses?.map((course, index)=>{
							return  <div key={index}  className='flex gap-[10px] items-center'>
							 <TextField  label={`Название курса`}  variant="standard" className='w-[100%]' value={course}
						  onChange={(e) => handleCourseChange(index, e.target.value)} /> 
						  <button
						 className="py-[5px] px-[10px] text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
							 onClick={() => removeCourse(index)}
							 >
									✕
							  </button>
							</div>
							
						})
					}
					<div className='flex justify-end items-center'> 
						<button className='py-[5px] rounded-[10px] border border-gray-300 px-[20px]' onClick={addCourse}>
							Добавить курс
						</button>
						
					</div>
				</div>

				<div className='flex flex-col gap-[10px]'>
					<p className='text-[18px] tracking-[1px]'>Тренинги</p>
					{
						trening?.map((trening, index)=>{
							return  <div key={index}  className='flex gap-[10px] items-center'>
							 <TextField  label={`Название тренинга`}  variant="standard" className='w-[100%]' value={trening}
						  onChange={(e) => handleTreningChange(index, e.target.value)} /> 
						  <button
						 className="py-[5px] px-[10px] text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
							 onClick={() => removeTrening(index)}
							 >
									✕
							  </button>
							</div>
							
						})
					}
					<div className='flex justify-end items-center'> 
						<button className='py-[5px] rounded-[10px] border border-gray-300 px-[20px]' onClick={addTrening}>
							Добавить тренинг
						</button>
						
					</div>
				</div>

				<div className='flex flex-col gap-[10px]'>
					<p className='text-[18px] tracking-[1px]'>Программы</p>
					{
						program?.map((program, index)=>{
							return  <div key={index}  className='flex gap-[10px] items-center'>
							 <TextField  label={`Название программы`}  variant="standard" className='w-[100%]' value={program}
						  onChange={(e) => handleProgramChange(index, e.target.value)} /> 
						  <button
						 className="py-[5px] px-[10px] text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
							 onClick={() => removeProgram(index)}
							 >
									✕
							  </button>
							</div>
							
						})
					}
					<div className='flex justify-end items-center'> 
						<button className='py-[5px] rounded-[10px] border border-gray-300 px-[20px]' onClick={addProgram}>
							Добавить программу
						</button>
						
					</div>
				</div>


				<div className='flex flex-col gap-[10px]'>
					<p className='text-[18px] tracking-[1px]'>Сертификаты </p>
					{
						certificate?.map((program, index)=>{
							return  <div key={index}  className='flex gap-[10px] items-center'>
							 <TextField  label={`Название программы`}  variant="standard" className='w-[100%]' value={program.name}
						  onChange={(e) => handleCertificateChange(index, 'name',e.target.value)} /> 
						  <button
						 className="py-[5px] px-[10px] text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
							 onClick={() => removeCertificate(index)}
							 >
									✕
							  </button>
							</div>
							
						})
					}
					<div className='flex justify-end items-center'> 
						<button className='py-[5px] rounded-[10px] border border-gray-300 px-[20px]' onClick={addCertificate}>
							Добавить сертификат
						</button>
						
					</div>
				</div>
			  </div>

				

				<div className='flex flex-col gap-[20px]'>
					<div className='flex gap-[20px] items-center'>
						<p className='font-semibold text-[18px] w-[300px]'>Готовность  к обучению :</p>
						<select name="" id="" className='border border-gray-300 py-[5px] px-[10px] rounded-[15px] w-[200px] outline-green-600'
						value={willLearn} onChange={(e)=>setWillLearn(e.target.value)}
						>
							<option value="">Не выбрано</option>
							<option value="yes">Да</option>
							<option value="no">Нет</option>
						</select>
					</div>
					<div className='flex gap-[20px] items-center'>
						<p className='font-semibold text-[18px] w-[300px]'>Участие в общественных и корпоративных мероприятиях : </p>
						<select name="" id="" className='border border-gray-300 py-[5px] px-[10px] rounded-[15px] w-[200px] outline-green-600'
						value={publicAndCorporate} onChange={(e)=>setPublicAndCorporate(e.target.value)}
						>
							<option value="">Не выбрано</option>
							<option value="yes">Да</option>
							<option value="no">Нет</option>
						</select>
					</div>
					<div className='flex gap-[20px] items-center'>
						<p className='font-semibold text-[18px] w-[300px]'>Готовность к командировкам : </p>
						<select name="" id="" className='border border-gray-300 py-[5px] px-[10px] rounded-[15px] w-[200px] outline-green-600' 
						value={willToTravel} onChange={(e)=>setWillToTravel(e.target.value)}
						>
							<option value="">Не выбрано</option>
							<option value="yes">Да</option>
							<option value="no">Нет</option>
						</select>
					</div>
					<div className='flex gap-[20px] items-center'>
						<p className='font-semibold text-[18px] w-[300px]'>Готовность к ротации или смене должности : </p>
						<select name="" id="" className='border border-gray-300 py-[5px] px-[10px] rounded-[15px] w-[200px] outline-green-600' value={rotate} onChange={(e)=>setRotate(e.target.value)}>
							<option value="">Не выбрано</option>
							<option value="yes">Да</option>
							<option value="no">Нет</option>
						</select>
					</div>
					<div className='flex gap-[20px] items-center'>
						<p className='font-semibold text-[18px] w-[300px]'>Карьерные цели и ожидания: </p>
						<TextField id="three" label="Цели / ожидания"  variant="standard"  value={careerGoalss} onChange={(e)=>setCareersGoal(e.target.value)} />
					</div>

					<div className='flex justify-between items-start'>
						<p className='font-semibold text-[18px] w-[200px]'>Хобби и интересы : </p>
						<div className='flex flex-col gap-[10px]'>
							{
							hobby.map((item, index)=>{
								return <div key={index} className=' flex gap-[10px] items-center text-black text-center'>
									<input type="text" className='bg-transparent py-[5px] px-[10px] outline-none border-2' value={item}
						  onChange={(e) => handleHobbyChange(index, e.target.value)} placeholder='Название Хобби' />
									<button
						 className="py-[5px] px-[10px] text-sm text-black rounded "
							 onClick={() => removeHobby(index)}
							 >
									✕
							  </button>
							  
						</div>
							})
						}
						<div className='flex justify-end items-center'> 
						<button className='py-[5px] rounded-[10px] border border-gray-300 px-[20px]' onClick={addHobby}>
							Добавить хобби
						</button>
						
					</div>
						</div>
						
						
					</div>
					
				</div>
			 </div>
		  </DialogContent>
		  <DialogActions>
			 <Button onClick={handleClose}>Отмена</Button>
			 <Button onClick={sendDopInfo}>Подтвердить</Button>
		  </DialogActions>
		</Dialog>
	 </React.Fragment>
  );
}
