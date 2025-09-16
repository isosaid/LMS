import { Checkbox } from '@mui/material'
import { FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePostTestMutation } from '../../../../../entities/test/model/api'
import GreenButton from '../../../../../shared/ui/button'
import Page from '../../../../../widgets/admin/quiz-admin/quizBuilder'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'

const AddTest = () => {
  const params=useParams()
  const navigate=useNavigate()
	const [postTest] = usePostTestMutation()
	const [mixQue, setMixQue] = useState(false)
	const [mixAns, setMixAns] = useState(false)
	const [random, setRandom] = useState(false)
	const [time, setTime] = useState('')
	const [que, setQue] = useState([])
	const [passes, setPasses] = useState(0)
	const [scores, setScores] = useState(0)


	const handleRandomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked
		setRandom(checked)
		setMixQue(checked)
		setMixAns(checked)
	}

	useEffect(() => {
		if (mixQue && mixAns && !random) {
			setRandom(true)
		} else if ((!mixQue || !mixAns) && random) {
			setRandom(false)
		}
	}, [mixQue, mixAns, random])

	const handlePostTest = async () => {
  const newTest = {
    numberOfPasses: passes,
    passingScore: scores,
    timeConstraints: time,
    enhanResults: false,
    mixQuestions: mixQue,
    mixAnswer: mixAns,
    materialIds: [Number(params.id)],
    questions: que,
  }
  try {
    await postTest(newTest).unwrap()
    toast.success('Тест добавлен')
    navigate(`/admin/${params.id}`)
    setPasses(0)
    setScores(0)
    setMixAns(false)
    setMixQue(false)
    setTime('')
    setQue([])
  } catch (error) {
    console.error(error)
    toast.error('Не удалось добавить тест')
  }
}


	return (
		<>
			<section className='px-[30px] py-[40px]'>
				<div className='flex flex-col gap-[40px]'>
					<div className='flex justify-between items-center'>
						<div className='flex gap-[10px] items-center'>
							<span>
								<FileText />{' '}
							</span>
							<p className='text-[20px] font-semibold tracking-[1px] '>ТЕСТ</p>
						</div>

						<GreenButton
							value={'Сохранить'}
							shirina={200}
							func={handlePostTest}
						/>
					</div>
					<div className='flex justify-between items-start'>
						<div className='flex flex-col gap-[20px]'>
							<div className='flex gap-[20px] items-center'>
								<label htmlFor='prox' className='text-[18px] '>
									{' '}
									Количество прохождений :{' '}
								</label>
								<input
									type='number'
									className='outline-green-600 w-[300px] py-[5px] px-[15px] rounded-[10px] border '
									placeholder='Введите кол-во прохождений'
									value={passes}
									onChange={e => setPasses(Number(e.target.value))}
								/>
							</div>
							<div className='flex gap-[20px] items-center'>
								<label htmlFor='prox' className='text-[18px] '>
									{' '}
									Проходной балл :{' '}
								</label>
								<input
									type='number'
									placeholder='Введите проходной балл'
									className='outline-green-600 w-[380px] py-[5px] px-[15px] rounded-[10px] border '
									value={scores}
									onChange={e => setScores(Number(e.target.value))}
								/>
							</div>

							
						</div>
						<div className='flex flex-col gap-[20px]'>
							<div className='flex gap-[20px] items-center'>
								<label htmlFor='prox' className='text-[18px] '>
									Ограничения по времени :{' '}
								</label>
								<input
									type='time'
									className='outline-green-600 w-[300px] py-[5px] px-[15px] rounded-[10px] border '
									placeholder='Введите кол-во прохождений'
									value={time}
									onChange={e => setTime(e.target.value)}
								/>
							</div>
							<div className='flex gap-[10px] items-center'>
								<Checkbox
									checked={mixQue}
									onChange={e => setMixQue(e.target.checked)}
									sx={{
										color: 'green',
										'&.Mui-checked': {
											color: 'green',
										},
										'&:hover': {
											backgroundColor: 'rgba(0, 128, 0, 0.04)', // зелёный ховер
										},
									}}
								/>
								<p>Перемещать вопросы</p>
							</div>
							<div className='flex gap-[10px] items-center'>
								<Checkbox
									checked={mixAns}
									onChange={e => setMixAns(e.target.checked)}
									sx={{
										color: 'green',
										'&.Mui-checked': {
											color: 'green',
										},
										'&:hover': {
											backgroundColor: 'rgba(0, 128, 0, 0.04)', // зелёный ховер
										},
									}}
								/>
								<p>Перемещать ответы</p>
							</div>
							<div className='flex gap-[10px] items-center'>
								<Checkbox
									value={random}
									onChange={handleRandomChange}
									sx={{
										color: 'green',
										'&.Mui-checked': {
											color: 'green',
										},
										'&:hover': {
											backgroundColor: 'rgba(0, 128, 0, 0.04)', // зелёный ховер
										},
									}}
								/>
								<p>Рандомайзер</p>
							</div>
						</div>
					</div>
				</div>
				<Page setQue={setQue} />
			</section>
		</>
	)
}

export default AddTest
