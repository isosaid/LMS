import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import { usePostUserMutation } from '../../entities/User/model/api'
import { InfoAddUser } from '../../shared/types'
import GreenButton from '../../shared/ui/button'
import MultipleFileUploadDocument from './chooseDocument'
import MultipleFileUploadWithRemove from './chooseFile'
import EmployeeEvaluationForm from './compForAddWorkers'
import BasicDatePicker from './dataPicker'
import LanguageProficiencyFormAdd from './addLanguage'
import toast from 'react-hot-toast'

export default function AddDialogWorkers() {
	const [postUser] = usePostUserMutation()
	const [openAdd, setOpenAdd] = React.useState(false)
	const [formData, setFormData] = React.useState({
		analiz: 0,
		shirotaMishleniya: 0,
		commerseThinking: 0,
		okazaniyaVliyaniya: 0,
		liderstvo: 0,
		postroenieSeti: 0,
		planirovanieAndOrg: 0,
		postanovkaZadach: 0,
		upravlenieIzmen: 0,
		orientaciya: 0,
		reshitelnost: 0,
		samorazvitie: 0,
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
		name: '',
		surname: '',
		fathername: '',
		email: '',
		password: '',
		position: '',
		department: '',
		company: '',
		supervisor: '',
		birthday: '',
		resumeId: '',
		otherDocumentsIds: [],
		tel: '',
		address: '',
		education: '',
		eduInstitution: '',
		speciality: '',
		yearsOfStudy: '',
		lengtWork: '',
		preWorkExperience: {
			com: '',
			pos: '',
			openDate: '',
		},
		foreignLang: [],
		CompEduLevel: 0,
		personalQual: {
			honesty: 0,
			responsibility: 0,
			flexibility: 0,
			empathy: 0,
		},
		potentialPos: '',
		AreasDevelop: [],
		PlanDatePromRota: '',
		emploEvalu: 0,
		projects: [],
		professionalSkills: [],
		professionalQual: keyQualities,
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
		await postUser(infoAddUser).unwrap()
		toast.success("Сотрудник успешно добавлен")
		setOpenAdd(false)
		setInfoAddUser({
			name: '',
			surname: '',
			fathername: '',
			email: '',
			password: '',
			position: '',
			department: '',
			company: '',
			supervisor: '',
			birthday: '',
			resumeId: '',
			otherDocumentsIds: [],
			tel: '',
			address: '',
			education: '',
			eduInstitution: '',
			speciality: '',
			yearsOfStudy: '',
			lengtWork: '',
			preWorkExperience: {
				com: '',
				pos: '',
				openDate: '',
			},
			foreignLang: [],
			CompEduLevel: 0,
			personalQual: {
				honesty: 0,
				responsibility: 0,
				flexibility: 0,
				empathy: 0,
			},
			potentialPos: '',
			AreasDevelop: [],
			PlanDatePromRota: '',
			emploEvalu: 0,
			projects: [],
			professionalSkills: [],
			professionalQual: keyQualities,
		})

		} catch (error) {
			console.error(error);
			toast.error('Не удалось добавить сотрудника')
		}
		
	}

	return (
		<React.Fragment>
			<GreenButton
				value={'Создать пользователя'}
				shirina={240}
				func={handleClickOpen}
			/>
			<Dialog
				open={openAdd}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{`Добавить сотрудника`}
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
							id='standard-basicaaaafaf'
							label='Email'
							variant='standard'
							placeholder='Введите имейл'
							className='w-[100%]'
							value={infoAddUser.email}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, email: e.target.value })
							}
						/>
						<TextField
							id='standard-password-input'
							label='Пароль'
							placeholder='Введите пароль'
							type='password'
							autoComplete='current-password'
							variant='standard'
							value={infoAddUser.password}
							onChange={e =>
								setInfoAddUser({ ...infoAddUser, password: e.target.value })
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
							<MultipleFileUploadWithRemove
								value={'Загрузить резюме'}
								infoAddUser={infoAddUser}
								setInfoAddUser={setInfoAddUser}
							/>
							<MultipleFileUploadDocument
								value={'Загрузить другие документы'}
								setInfoAddUser={setInfoAddUser}
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
							<LanguageProficiencyFormAdd setInfoAddUser={setInfoAddUser} />
						</div>

						<EmployeeEvaluationForm setInfoAddUser={setInfoAddUser} />

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
													setFormData({
														...formData,
														analiz: Number(e.target.value),
													})
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
														shirotaMishleniya: Number(e.target.value),
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
														commerseThinking: Number(e.target.value),
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
														okazaniyaVliyaniya: Number(e.target.value),
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
														liderstvo: Number(e.target.value),
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
														postroenieSeti: Number(e.target.value),
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
														planirovanieAndOrg: Number(e.target.value),
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
														postanovkaZadach: Number(e.target.value),
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
														upravlenieIzmen: Number(e.target.value),
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
														orientaciya: Number(e.target.value),
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
														reshitelnost: Number(e.target.value),
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
														samorazvitie: Number(e.target.value),
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
					<Button onClick={handleAddUser}>Добавить</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
