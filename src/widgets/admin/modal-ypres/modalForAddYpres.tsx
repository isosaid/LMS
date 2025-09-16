import { Checkbox } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import * as React from 'react'
import { usePostYpresMutation } from '../../../entities/IDP/model/api'
import { useGetUsersQuery } from '../../../entities/User/model/api'
import { useGetMaterialsQuery } from '../../../entities/materials/model/api'
import GreenButton from '../../../shared/ui/button'
import toast from 'react-hot-toast'
import IDPDialogSkills from '../modal-for-skills/modalSkillsIDP'
import { API_IMAGE, Users } from '../../../shared/types'


interface Material {
	id: number 
	coverImage:string 
	title: string
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function DialogAddYpres() {
	const { data: materialData } = useGetMaterialsQuery([])
	const [selectedIds, setSelectedIds] = React.useState<number[]>([])
	const [open, setOpen] = React.useState(false)
	const [sotrudnik, setSotrudnik] = React.useState('')
	const [description, setDescription] = React.useState('')
	const [date, setDate] = React.useState('')
 const [navik, setNavik] = React.useState<string[]>([]);
	const [competenciya, setCompetenciya] = React.useState('Компетенция')
	const [knowledge, setKnowledge] = React.useState('Знания')
	const [massivAll, setMassivAll] = React.useState<string[]>([])
	const { data: userData } = useGetUsersQuery([])
	const [postYpres] = usePostYpresMutation()
	const [materialDeadlines, setMaterialDeadlines] = React.useState<{ [key: number]: string }>({})


	React.useEffect(() => {
		setMassivAll([
			...navik,
			...competenciya.split(','),
			...knowledge.split(','),
		])
	}, [navik, competenciya, knowledge])

const handleCheckboxChange =
  (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(prev => [...prev, id])
      setMaterialDeadlines(prev => ({ ...prev, [id]: '' })) 
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id))
      setMaterialDeadlines(prev => {
        const updated = { ...prev }
        delete updated[id]
        return updated
      })
    }
  }


	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handlePostYpres = async () => {
  const newYpres = {
    description: description,
    coverImage: 'img.png',
    skills: navik,
    competencies: competenciya.split(','),
    time: date,
    lore: knowledge.split(','),
    materialIds: selectedIds.map(id => ({
      materialId: id,
      dedline: materialDeadlines[id] || '',
      status: 'pending'
    })),
    userId: Number(sotrudnik),
  }

  try {
	await postYpres(newYpres).unwrap()
	toast.success('ИПР успешно добавлен')
	setOpen(false)
  setCompetenciya('Компетенция')
  setNavik([])
  setDate('')
  setDescription('')
  setSotrudnik('')
  setSelectedIds([])
  setKnowledge('Знания')
  setMaterialDeadlines({})

  } catch (error) {
	toast.error('Не удалось добавить ИПР')
	console.log(error);
	
  }
}     
	return (
		<React.Fragment>
			<GreenButton value={'Создать ИПР'} shirina={200} func={handleClickOpen} />
			<Dialog
				open={open}
				slots={{
					transition: Transition,
				}}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>{'Создание индивидуального плана развития '}</DialogTitle>
				<DialogContent>
					<div className='w-[500px] box-border flex flex-col gap-[20px]'>
						<div className='flex justify-between items-start'>
							<p className='text-[18px]'>Выбор струдника : </p>
							<select
								name=''
								id=''
								className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
								value={sotrudnik}
								onChange={e => setSotrudnik(e.target.value)}
							>
								<option value=''>Не выбрано</option>
								{userData?.map((user: Users) => {
									return (
										<option key={user.id} value={user.id}>
											{user.name + ' ' + user.surname}
										</option>
									)
								})}
							</select>
						</div>
						<div className='flex justify-between items-start'>
							<p className='text-[18px] '>
								Краткое описание : <br />
								Макс 140 знаков.
							</p>
							<textarea
								name=''
								id=''
								className='py-[10px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%] h-[100px]'
								placeholder='Четко и ёмко сформулированная суть Индивидуального плана развития'
								value={description}
								onChange={e => setDescription(e.target.value)}
							></textarea>
						</div>
						<div className=''>
										  <div className='flex gap-[20px] items-center'>
											 <label htmlFor="naviki" className='w-[150px]'>Навыки : </label>
									 <IDPDialogSkills setNavik={setNavik}/>
										  </div>
										  {navik.length > 0 && (
								 <div className="mt-2 text-green-700">
								  Вы выбрали такие навыки как : {navik.join(', ')}
								 </div>
						)}
											
						
										</div>
						<div className='flex justify-between items-center'>
							<p className='text-[18px] '>Компетенция :</p>
							<input
								type='text'
								placeholder='Введите названия компетенций'
								className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
								value={competenciya}
								onChange={e => setCompetenciya(e.target.value)}
							/>
						</div>
						<div className='flex justify-between items-center'>
							<p className='text-[18px] '>Знания :</p>
							<input
								type='text'
								placeholder='Введите название знания'
								className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
								value={knowledge}
								onChange={e => setKnowledge(e.target.value)}
							/>
						</div>
						<div className='flex justify-between items-center'>
							<p className='text-[18px] '>Дата :</p>
							<input
								type='date'
								placeholder='Введите название знания'
								className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
								value={date}
								onChange={e => setDate(e.target.value)}
							/>
						</div>

						<div className='flex border-t border-b py-[20px] flex-col gap-[20px]'>
							<p className='text-[18px] font-semibold'>Содержания ИПР :</p>
							<div className='flex gap-[10px] flex-wrap'>
								{massivAll.map((item, index) => {
									return (
										<div
											key={index}
											className='bg-green-700 rounded-[10px] text-white py-[5px] px-[15px]'
										>
											<p>{item}</p>
										</div>
									)
								})}
							</div>
						</div>

						<div className='flex flex-col gap-[20px]'>
							<div className='flex  justify-between items-center'>
								<p className='text-[22px] font-semibold'>
									Не забудьте добавить материалы :{' '}
								</p>
							</div>
							<div className='w-[100%] px-[20px] h-[200px] overflow-auto flex flex-col  gap-[10px]'>
								{materialData?.map((material: Material) => {
  const isSelected = selectedIds.includes(material.id)
  return (
    <div
      key={material.id}
      className='flex justify-between items-center gap-[10px]'
    >
      <img
        src={`${API_IMAGE}${material.coverImage}`}
        className='w-[100px]'
        alt={material.title}
      />
      <p className='w-[200px]'>{material.title}</p>
      {isSelected && (
        <input
          type='date'
          className='border rounded-[8px] px-[5px]'
          value={materialDeadlines[material.id] || ''}
          onChange={e =>
            setMaterialDeadlines(prev => ({
              ...prev,
              [material.id]: e.target.value,
            }))
          }
        />
      )}
      <Checkbox
        checked={isSelected}
        onChange={handleCheckboxChange(material.id)}
      />
    </div>
  )
})}

							</div>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						sx={{
							color: 'green',
							border: '1px solid green',
							letterSpacing: '1px',
						}}
					>
						Отмена
					</Button>
					<Button
						onClick={handlePostYpres}
						sx={{
							color: 'white',
							backgroundColor: 'green',
							letterSpacing: '1px',
						}}
					>
						Создать
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
