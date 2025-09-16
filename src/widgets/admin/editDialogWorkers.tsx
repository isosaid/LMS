import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import { useEditUserMutation } from '../../entities/User/model/api'
import { InfoAddUser } from '../../shared/types'
 import BasicDatePicker from './dataPicker'
import LanguageProficiencyForm from './editLanguage'
import EmployeeEvaluationFormEdit from './compForEditWorkers'
import toast from 'react-hot-toast'
import MultipleFileUploadWithRemoveEdit from './chooseFileEdit'
import MultipleFileUploadDocumentEdit from './chooseDocumentsEdit'

export default function EditDialogWorkers({ user }: any) {
	const [editUser] = useEditUserMutation()
	const [openAdd, setOpenAdd] = React.useState(false)
	const [formData, setFormData] = React.useState({
		analiz: user?.professionalQual?.[0]?.grade,
		shirotaMishleniya: user?.professionalQual?.[1]?.grade,
		commerseThinking: user?.professionalQual?.[2]?.grade,
		okazaniyaVliyaniya: user?.professionalQual?.[3]?.grade,
		liderstvo: user?.professionalQual?.[4]?.grade,
		postroenieSeti: user?.professionalQual?.[5]?.grade,
		planirovanieAndOrg: user?.professionalQual?.[6]?.grade,
		postanovkaZadach: user?.professionalQual?.[7]?.grade,
		upravlenieIzmen: user?.professionalQual?.[8]?.grade,
		orientaciya: user?.professionalQual?.[9]?.grade,
		reshitelnost: user?.professionalQual?.[10]?.grade,
		samorazvitie: user?.professionalQual?.[11]?.grade,
	})
	
	
	const keyQualities = [
		{
			qualitie: 'Анализ информации',
			grade: Number(formData.analiz),
		},
		{
			qualitie: 'Широта мышления',
			grade: Number(formData.shirotaMishleniya),
		},
		{
			qualitie: 'Коммерческое мышление',
			grade: Number(formData.commerseThinking),
		},
		{
			qualitie: 'Оказание влияния',
			grade: Number(formData.okazaniyaVliyaniya),
		},
		{
			qualitie: 'Лидерство',
			grade: Number(formData.liderstvo),
		},
		{
			qualitie: 'Построение сети контактов',
			grade: Number(formData.postroenieSeti),
		},
		{
			qualitie: 'Планирование и организация',
			grade: Number(formData.planirovanieAndOrg),
		},
		{
			qualitie: 'Постановка задач и контроль',
			grade: Number(formData.postanovkaZadach),
		},
		{
			qualitie: 'Управление изменениями',
			grade: Number(formData.upravlenieIzmen),
		},
		{
			qualitie: 'Ориентация и достижения',
			grade: Number(formData.orientaciya),
		},
		{
			qualitie: 'Решительность',
			grade: Number(formData.reshitelnost),
		},
		{
			qualitie: 'Саморазвитие',
			grade: Number(formData.samorazvitie),
		},
	]
      
	
	const [infoAddUser, setInfoAddUser] = React.useState<InfoAddUser>({
		name: user?.name,
		surname: user?.surname,
		fathername: user?.fathername,
		position: user?.position,
		department: user?.department,
		company: user?.company,
		supervisor: user?.supervisor,
		birthday: user?.birthday,
		resumeId: user?.resumeId,
		otherDocumentsIds: user?.otherDocumentsIds,
		tel: user?.tel,
		address: user?.address,
		education: user?.education,
		eduInstitution: user?.eduInstitution,
		speciality: user?.speciality,
		yearsOfStudy: user?.yearsOfStudy,
		lengtWork: user?.lengtWork,
		preWorkExperience: {
			com: user?.preWorkExperience?.com,
			pos: user?.preWorkExperience?.pos,
			openDate: user?.preWorkExperience?.openDate,
		},
		foreignLang: user?.foreignLang,
		CompEduLevel: user?.CompEduLevel,
		personalQual: {
			honesty: user?.personalQual?.honesty,
			responsibility: user?.personalQual?.responsibility,
			flexibility: user?.personalQual?.flexibility,
			empathy: user?.personalQual?.empathy,
		},
		potentialPos: user?.potentialPos,
		AreasDevelop: user?.AreasDevelop,
		PlanDatePromRota: user?.PlanDatePromRota,
		emploEvalu: user?.emploEvalu,
		projects: user?.projects,
		professionalSkills: user?.professionalSkills,
		professionalQual: user?.professionalQual,
	})


	React.useEffect(() => {
		const updatedKeyQualities = [
			{ qualitie: 'Анализ информации', grade: formData.analiz },
			{ qualitie: 'Широта мышления', grade: formData.shirotaMishleniya },
			{ qualitie: 'Коммерческое мышление', grade: formData.commerseThinking },
			{ qualitie: 'Оказание влияния', grade: formData.okazaniyaVliyaniya },
			{ qualitie: 'Лидерство', grade: formData.liderstvo },
			{ qualitie: 'Построение сети контактов', grade: formData.postroenieSeti },
			{
				qualitie: 'Планирование и организация',
				grade: formData.planirovanieAndOrg,
			},
			{
				qualitie: 'Постановка задач и контроль',
				grade: formData.postanovkaZadach,
			},
			{ qualitie: 'Управление изменениями', grade: formData.upravlenieIzmen },
			{ qualitie: 'Ориентация и достижения', grade: formData.orientaciya },
			{ qualitie: 'Решительность', grade: formData.reshitelnost },
			{ qualitie: 'Саморазвитие', grade: formData.samorazvitie },
		]

		setInfoAddUser(prev => ({
			...prev,
			professionalQual: updatedKeyQualities,
		}))
	}, [formData])

	const handleClickOpen = () => {
		setOpenAdd(true)
	}

	const handleClose = () => {
		setOpenAdd(false)
	}

	const handleAddUser = async () => {
		try {
			await editUser({ body: infoAddUser, userId: user.id }).unwrap()
		setOpenAdd(false)
		toast.success('Данные пользователя обновлены')
		} catch (error) {
			console.error(error);
			toast.error("Не удалось обновить данные пользователя")
		}
		
	}

	return (
		<React.Fragment>
			<p
				className='hover:border-[green] hover:text-[green] transition-all cursor-pointer duration-200 border-b-2 ease-out border-gray-300 py-[5px]'
				onClick={handleClickOpen}
			>
				Изменить пользователя
			</p>
			<Dialog
				open={openAdd}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{`Изменения данных сотрудника`}
				</DialogTitle>
				<DialogContent>
					<div className='flex flex-col w-[500px]  gap-[10px]'>
						<TextField
							id='standard-afafbasics'
							label='Имя'
							variant='standard'
							placeholder='Введите имя'
							className='w-[100%]'
							value={infoAddUser.name}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, name: e.target.value })
							}
						/>
						<TextField
							id='standard-basicff'
							label='Фамилию'
							placeholder='Введите фамилию'
							variant='standard'
							className='w-[100%]'
							value={infoAddUser.surname}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, surname: e.target.value })
							}
						/>
						<TextField
							id='standard-basicafaafaf'
							label='Отчество'
							variant='standard'
							placeholder='Введите отчество'
							className='w-[100%]'
							value={infoAddUser.fathername}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, fathername: e.target.value })
							}
						/>
						<TextField
							id='standard-basicafaf'
							label='Должность'
							variant='standard'
							placeholder='Введите должность'
							className='w-[100%]'
							value={infoAddUser.position}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, position: e.target.value })
							}
						/>

						<TextField
							id='standard-basicaggaga'
							label='Отдел'
							variant='standard'
							placeholder='Введите отдел'
							className='w-[100%]'
							value={infoAddUser.department}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, department: e.target.value })
							}
						/>

						<TextField
							id='standard-basicw'
							label='Компания'
							variant='standard'
							placeholder='Введите компанию'
							className='w-[100%]'
							value={infoAddUser.company}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, company: e.target.value })
							}
						/>

						<TextField
							id='standard-basicqqq'
							label='Руководитель'
							variant='standard'
							placeholder='Введите ФИО руководителя'
							className='w-[100%]'
							value={infoAddUser.supervisor}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, supervisor: e.target.value })
							}
						/>

						<div className='flex gap-[20px] py-[10px] flex-col '>
							<MultipleFileUploadWithRemoveEdit
								value={'Загрузить резюме'}
								infoAddUser={infoAddUser}
								setInfoAddUser={setInfoAddUser}
								user={user}
							/>
							<MultipleFileUploadDocumentEdit
								value={'Загрузить другие документы'}
								setInfoAddUser={setInfoAddUser}
								user={user}
							/>
						</div>

						<div>
							<BasicDatePicker
								name={'Дата рождения'}
								setInfoAddUser={setInfoAddUser}
								infoAddUser={infoAddUser}
							/>
						</div>

						<div className='flex gap-[20px]'>
							<TextField
								id='standard-basiqqc'
								label='Номер'
								variant='standard'
								placeholder='Введите номер телефона'
								className='w-[100%]'
								value={infoAddUser.tel}
								onChange={e =>
									setInfoAddUser({ ...infoAddUser, tel: e.target.value })
								}
							/>
							<TextField
								id='standard-qqqbasic'
								label='Адресс'
								variant='standard'
								placeholder='Введите адресс'
								className='w-[100%]'
								value={infoAddUser.address}
								onChange={e =>
									setInfoAddUser({ ...infoAddUser, address: e.target.value })
								}
							/>
						</div>

						<div className='flex gap-[20px]'>
							<TextField
								id='standarafafad-basic'
								label='Образования'
								variant='standard'
								placeholder='Введите образования'
								className='w-[100%]'
								value={infoAddUser.education}
								onChange={e =>
									setInfoAddUser({ ...infoAddUser, education: e.target.value })
								}
							/>
							<TextField
								id='standarafafd-basic'
								label='Учебное заведение'
								variant='standard'
								placeholder='Введите название учебного заведения'
								className='w-[100%]'
								value={infoAddUser.eduInstitution}
								onChange={e =>
									setInfoAddUser({
										...infoAddUser,
										eduInstitution: e.target.value,
									})
								}
							/>
						</div>

						<div className='flex gap-[20px]'>
							<TextField
								id='standafafard-basic'
								label='Стаж работы'
								variant='standard'
								placeholder='Введите стаж работы '
								className='w-[100%]'
								value={infoAddUser.lengtWork}
								onChange={e =>
									setInfoAddUser({ ...infoAddUser, lengtWork: e.target.value })
								}
							/>
							<TextField
								id='standafafaard-basic'
								label='Специальность'
								variant='standard'
								placeholder='Введите специальность'
								className='w-[100%]'
								value={infoAddUser.speciality}
								onChange={e =>
									setInfoAddUser({ ...infoAddUser, speciality: e.target.value })
								}
							/>
						</div>

						<div className='flex flex-col gap-[10px] py-[10px]'>
							<p className='text-[18px] tracking-[1px] font-semibold '>
								Предыдущий опыт работы :
							</p>
							<div className='flex gap-[20px]'>
								<TextField
									id='standarfdsd-basic'
									label='Компания'
									variant='standard'
									placeholder='Введите название компании '
									className='w-[100%]'
									value={infoAddUser.preWorkExperience?.com}
									onChange={e =>
										setInfoAddUser({
											...infoAddUser,
											preWorkExperience: {
												...infoAddUser.preWorkExperience,
												com: e.target.value,
											},
										})
									}
								/>
								<TextField
									id='ssdgtandard-basic'
									label='Должность'
									variant='standard'
									placeholder='Введите должность'
									className='w-[100%]'
									value={infoAddUser.preWorkExperience?.pos}
									onChange={e =>
										setInfoAddUser({
											...infoAddUser,
											preWorkExperience: {
												...infoAddUser.preWorkExperience,
												pos: e.target.value,
											},
										})
									}
								/>
							</div>
							<div className='pt-[10px]'>
								<BasicDatePicker
									name={'Дата работы'}
									setInfoAddUser={setInfoAddUser}
									infoAddUser={infoAddUser}
								/>
							</div>
						</div>

						<div>
							<LanguageProficiencyForm
								setInfoAddUser={setInfoAddUser}
								infoAddUser={infoAddUser}
							/>
						</div>

						<EmployeeEvaluationFormEdit setInfoAddUser={setInfoAddUser} infoAddUser={infoAddUser} />

						<p className='text-[20px] pb-[20px] font-semibold tracking-[1px]'>
							Ключевые личные качества человека :
						</p>
						<div className='flex flex-col gap-[20px] '>
							<aside className='w-[500px] flex flex-col gap-[20px]'>
								<div>
									<div className='flex border border-gray-300 items-center justify-center py-[15px]'>
										<p>Мышление</p>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[0].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[1].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											{keyQualities[2].qualitie}
										</div>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.analiz}
												onChange={e =>
													setFormData({ ...formData, analiz: e.target.value })
												}
											/>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.shirotaMishleniya}
												onChange={e =>
													setFormData({
														...formData,
														shirotaMishleniya: e.target.value,
													})
												}
											/>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.commerseThinking}
												onChange={e =>
													setFormData({
														...formData,
														commerseThinking: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
								<div>
									<div className='flex border border-gray-300 items-center justify-center py-[15px]'>
										<p>Взаимодействие</p>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[3].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[4].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											{keyQualities[5].qualitie}
										</div>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.okazaniyaVliyaniya}
												onChange={e =>
													setFormData({
														...formData,
														okazaniyaVliyaniya: e.target.value,
													})
												}
											/>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.liderstvo}
												onChange={e =>
													setFormData({
														...formData,
														liderstvo: e.target.value,
													})
												}
											/>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.postroenieSeti}
												onChange={e =>
													setFormData({
														...formData,
														postroenieSeti: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
							</aside>
							<aside className='w-[500px] flex flex-col gap-[20px]'>
								<div>
									<div className='flex items-center border border-gray-300 justify-center py-[15px]'>
										<p>Реализация задач</p>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[6].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[7].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											{keyQualities[8].qualitie}
										</div>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.planirovanieAndOrg}
												onChange={e =>
													setFormData({
														...formData,
														planirovanieAndOrg: e.target.value,
													})
												}
											/>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.postanovkaZadach}
												onChange={e =>
													setFormData({
														...formData,
														postanovkaZadach: e.target.value,
													})
												}
											/>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.upravlenieIzmen}
												onChange={e =>
													setFormData({
														...formData,
														upravlenieIzmen: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
								<div>
									<div className='flex items-center border border-gray-300 justify-center py-[15px]'>
										<p>Эмоции и воля</p>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[9].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											<p>{keyQualities[10].qualitie}</p>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
											{keyQualities[11].qualitie}
										</div>
									</div>
									<div className='flex  justify-between items-center'>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.orientaciya}
												onChange={e =>
													setFormData({
														...formData,
														orientaciya: e.target.value,
													})
												}
											/>
										</div>
										<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.reshitelnost}
												onChange={e =>
													setFormData({
														...formData,
														reshitelnost: e.target.value,
													})
												}
											/>
										</div>
										<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
											<input
												type='number'
												className='w-[100px] rounded-[10px] outline-none border px-[10px]'
												placeholder='от 0 - 100'
												value={formData.samorazvitie}
												onChange={e =>
													setFormData({
														...formData,
														samorazvitie: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Отмена</Button>
					<Button onClick={handleAddUser}>Изменить</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
