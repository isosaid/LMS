import {motion} from 'framer-motion'

const SkillsAssisment = ({data: dataProfile}: any ) => {
  
  return <>
  <section>
	 <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}>
         <div className='flex flex-col gap-[20px] py-[30px]'>
		<p className='text-[#3EA458] text-[24px] font-semibold'>Ключевые профессиональные навыки :</p>
		<div className='border border-gray-300 inline-flex'> 
			<div className=''>
				<div className='py-[20px] px-[20px] flex items-center justify-center text-center w-[220px] h-[90px]  border border-gray-300 '>
					<p>
                 Ключевые профессиональные навыки
					</p>
				</div>
				<div className='py-[20px] border border-gray-300 flex items-center justify-center text-center w-[220px] '>
					<p>Средняя оценка : </p>
				</div>
			</div>
			<div className='flex'>
				{
					dataProfile?.professionalSkills?.slice(0,6).map((item: {name: string, rating: string | number })=> {
						return <div key={item.name}>
							<div className='py-[20px] border border-gray-300 flex items-center justify-center text-center w-[166px] h-[90px] '>
								<p>{item.name}</p>
								
							</div>
							<div className='py-[20px] border border-gray-300 flex items-center justify-center text-center w-[166px] '>
								<p>{item.rating}</p>
							</div>
						</div>
					})
				}
			</div>
		</div>

		<p className='text-[#3EA458] text-[24px] font-semibold'>Ключевые профессиональные качетсва : </p>

		<div className='flex gap-[20px] '>
			<aside className='w-[700px] flex flex-col gap-[20px]'>
				<div>
					<div className='flex border border-gray-300 items-center justify-center py-[15px]'>
						<p>Мышление</p>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
								{dataProfile?.professionalQual?.[0]?.qualitie || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
							{dataProfile?.professionalQual?.[1]?.qualitie || "—"}
							</p>
						</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'> 
							{dataProfile?.professionalQual?.[2]?.qualitie || "—"}
						</div>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[0]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[1]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[2]?.grade || "—"}
							</p>
							</div>
					</div>
					
				</div>
				<div>
					<div className='flex border border-gray-300 items-center justify-center py-[15px]'>
						<p>
							Взаимодействие
						</p>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
								{dataProfile?.professionalQual?.[3]?.qualitie || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
							{dataProfile?.professionalQual?.[4]?.qualitie || "—"}
							</p>
						</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'> 
							{dataProfile?.professionalQual?.[5]?.qualitie || "—"}
						</div>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[3]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[4]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[5]?.grade || "—"}
							</p>
							</div>
					</div>
				</div>
			</aside>
			<aside className='w-[700px] flex flex-col gap-[20px]'>
				<div>
					<div className='flex items-center border border-gray-300 justify-center py-[15px]'>
						<p>Реализация задач</p>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
								{dataProfile?.professionalQual?.[6]?.qualitie || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
							{dataProfile?.professionalQual?.[7]?.qualitie || "—"}
							</p>
						</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'> 
							{dataProfile?.professionalQual?.[8]?.qualitie || "—"}
						</div>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[6]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[7]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[8]?.grade || "—"}
							</p>
							</div>
					</div>
				</div>
				<div>
					<div className='flex items-center border border-gray-300 justify-center py-[15px]'>
						<p>
							Эмоции и воля
						</p>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
								{dataProfile?.professionalQual?.[9]?.qualitie || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[80px]'>
							<p>
							{dataProfile?.professionalQual?.[10]?.qualitie || "—"}
							</p>
						</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[80px]'> 
							{dataProfile?.professionalQual?.[11]?.qualitie || "—"}
						</div>
					</div>
					<div className='flex  justify-between items-center'>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[9]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[33%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[10]?.grade || "—"}
							</p>
							</div>
						<div className=' px-[10px] w-[34%] border border-gray-300 flex items-center justify-center text-center h-[50px]'>
							<p>
								{dataProfile?.professionalQual?.[11]?.grade || "—"}
							</p>
							</div>
					</div>
				</div>
			</aside>
		</div>

		<p className='text-[#3EA458] text-[24px] font-semibold'>ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ : </p>

		<div className='flex flex-col gap-[20px]'>
			<div className='flex gap-[20px] items-center'>
				<p className='text-[18px] font-semibold'>Готовность к обучению : </p>
				<div className='py-[5px] px-[15px] text-[18px] rounded-[20px] bg-[#3EA458] text-white w-[150px] text-center'>
					<p>{dataProfile?.willToLearn ? 'Да' : 'Нет'}</p>
				</div>
			</div>
			<div className='flex gap-[20px] items-center'>
				<p className='text-[18px] font-semibold'>Участие в общественных и корпоративных мероприятиях : </p>
				<div className='py-[5px] px-[15px] text-[18px] rounded-[20px] bg-[#3EA458] text-white w-[150px] text-center'>
					<p>{dataProfile?.publicAndCorporate ? 'Да' : 'Нет'}</p>
				</div>
			</div>
			<div className='flex gap-[20px] items-center'>
				<p className='text-[18px] font-semibold'>Готовность к командировкам :  </p>
				<div className='py-[5px] px-[15px] text-[18px] rounded-[20px] bg-[#3EA458] text-white w-[150px] text-center'>
					<p>{dataProfile?.willToTravel ? 'Да' : 'Нет'}</p>
				</div>
			</div>
			<div className='flex gap-[20px] items-center'>
				<p className='text-[18px] font-semibold'>Готовность к ротации или смене должности : </p>
				<div className='py-[5px] px-[15px] text-[18px] rounded-[20px] bg-[#3EA458] text-white w-[150px] text-center'>
					<p>{dataProfile?.willToRotateChangePositions ? 'Да' : 'Нет'}</p>
				</div>
			</div>
			<div className='flex gap-[20px] items-center'>
				<p className='text-[18px] font-semibold'>Карьерные цели и ожидания : </p>
				<input type="text" placeholder={'Цели / ожидания'} value={dataProfile?.сareerGoals} className='border border-gray-400 rounded-[20px] px-[20px] py-[5px] outline-[#3EA458]' readOnly/>
			</div>
			<div className='flex gap-[20px] items-center'>
				<p className='text-[18px] font-semibold'>Хобби и интересы :  </p>
				<div className='flex items-center gap-[20px]'>
					{
						dataProfile?.hobbies?.map((hobby: string)=>{
							return <div key={hobby} className='py-[5px] px-[15px] text-[18px] rounded-[20px] bg-[#3EA458] text-white w-[150px] text-center'>
					<p>{hobby}</p>
				</div>					
				})
					}
				</div>
			</div>
			
		</div>
	</div>
		  </motion.div>
	
  </section>
  </>
}

export default SkillsAssisment