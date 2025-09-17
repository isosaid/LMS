import {  Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
	useDeleteYpresMutation,
	useGetYpresQuery,
} from '../../../entities/IDP/model/api'
import DialogAddYpres from '../../../widgets/admin/modal-ypres/modalForAddYpres'
import BarComponent from '../../../widgets/client/proccessing/progressBar'
import DialogEditYpres from '../../../widgets/admin/modal-ypres/editModalYpres'
import toast from 'react-hot-toast'
import { API_IMAGE, Ypres } from '../../../shared/types'



const Idp = () => {
	const [fullname, setFullname] = useState('')
	const [position, setPosition] = useState('')
	const { data: ypresData } = useGetYpresQuery({ fullname, position })
	const [deleteYpres] = useDeleteYpresMutation()
	

	const formatDate = (dateStr: string): string => {
		const date = new Date(dateStr)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы с 0
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const handleDeleteYpres=async (id: number | string )=>{
		try {
			await deleteYpres(id).unwrap()
			toast.success("ИПР успешно удален")
		} catch (error) {
			toast.error("Не удалось удалить ИПР")
			console.error(error);
		}
	}

	return (
		<section className='px-[30px] py-[30px]'>
			<div className='flex justify-between items-center'>
				<p className='text-[30px] font-semibold '>
					Индивидуальный план развития
				</p>
				<DialogAddYpres />
			</div>

			<div className='flex flex-col gap-[20px] py-[30px]'>
				<p className='font-semibold text-[24px] tracking-[1px]'>Фильтр</p>
				<div className='flex items-center justify-between'>
					<div className='w-[40%]  flex flex-col gap-[10px]'>
						<label htmlFor='fio'>ФИО</label>
						<input
							type='text'
							placeholder='ФИО сотрудника'
							className='w-[100%] border border-gray-300 outline-[#3EA458] rounded-[15px] text-black px-[20px] py-[5px]'
							value={fullname}
							onChange={e => setFullname(e.target.value)}
						/>
					</div>
					<div className='w-[50%]  flex flex-col gap-[10px]'>
						<label htmlFor='fio'>Должность</label>
						<input
							type='text'
							placeholder='Должность сотрудника'
							className='w-[100%] border outline-[#3EA458] border-gray-300 rounded-[15px] text-black px-[20px] py-[5px]'
							value={position}
							onChange={e => setPosition(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className='rounded-[10px] overflow-hidden'>
				<table className='w-[100%] border border-collapse'>
					<tbody>
              <tr className='bg-[#3EA458] text-white'>
							<th className='w-[17%] border-r text-[14px] py-[10px] '>
								ФИО сотрудника
							</th>
							<th className='w-[15%] border-r text-[14px] py-[10px] '>
								Должность
							</th>
							<th className='w-[20%]  border-r text-[14px] py-[10px] '>
								Компетенция/Навыки/Знания
							</th>
							<th className='w-[18%] border-r text-[14px] py-[10px] '>Курсы</th>
							<th className='w-[10%] border-r text-[14px] py-[10px] '>Срок</th>
							<th className='w-[25%] border-r text-[14px] py-[10px] '>
								Статус
							</th>
						</tr>
						{
						ypresData?.length==0 ?    
						<tr>
							<td colSpan={6}>
								<div className=' flex items-center justify-center h-[300px] '>
							<p className='text-[30px] tracking-[1px] font-semibold italic text-green-600'> Такого индивидуального плана не существует. </p>
						</div>
							</td>
						</tr>
						 :  
						ypresData?.map((ypres: Ypres) => {
							return (
								<tr key={ypres.id}>
									<td className=' w-[17%] px-[10px] border  text-center text-[14px] py-[10px] '>
										{ypres?.user != null
											? ypres?.user?.name + ' ' + ypres?.user?.surname
											: 'FIO user'}
									</td>
									<td className=' px-[10px] w-[15%] border  text-center text-[14px] py-[10px] '>
										{ypres?.user?.position}
									</td>
									<td className='w-[20%] px-[10px]  border  text-center text-[14px] py-[10px] '>
										{ypres?.competencies?.join(', ') +
											' / ' +
											ypres?.skills?.join(', ') +
											' / ' +
											ypres?.lore?.join(', ')}
									</td>
									<td className='w-[18%] border  text-center text-[14px] py-[10px] '>
										<div className='flex flex-col gap-[10px] ml-[20px]'>
											{ ypres?.materialIds?.map(materials => {
												return (
													<div
														key={materials.id}
														className='flex border-b pb-[10px] w-[150px] gap-[10px] items-center '
													>
														<img
															src={`${API_IMAGE}${materials?.coverImage}`}
															alt={materials.title}
															className='w-[70px] rounded-[10px]'
														/>
														<p>{materials?.title}</p>
													</div>
												)
											})}
										</div>
									</td>
									<td className='w-[8%] px-[10px] border  text-center text-[14px] py-[10px] '>
										{formatDate(ypres?.time)}
									</td>
									<td className='w-[25%] px-[10px] border  text-center text-[14px] py-[10px] '>
										<div className='flex flex-col gap-[10px] justify-center items-center'>
											<p className='py-[5px] border  text-gray-400 italic tracking-[1px] rounded-[10px] w-[100px]'>
												{ypres?.status == 'completed' ? 'Завершено' : ypres?.status == 'in_progress' ? 'В процессе' : 'В ожидании'} 
											</p>
											<div>
												<BarComponent />
											</div>
											<div className='flex gap-[10px] justify-center items-center'>
												<DialogEditYpres ypres={ypres}/>
												<span
													className=' transition-all duration-150  transform hover:translate-y-[-5px]'
													onClick={() => handleDeleteYpres(ypres.id)}
												>
													{' '}
													<Trash2 color='red' />{' '}
												</span>
											</div>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</section>
	)
}

export default Idp
