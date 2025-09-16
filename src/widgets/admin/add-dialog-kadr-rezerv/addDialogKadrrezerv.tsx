import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import * as React from 'react'
import { InfoAddDolzhnost } from '../../../shared/types'
import GreenButton from '../../../shared/ui/button'
import LanguageProficiencyFormAdd from '../addLanguage'
import CompForAddDolzhnost from './compForAddDolzhnost'
import { useAddPositionMutation } from '../../../entities/personal-reserve/model/api'
import toast from 'react-hot-toast'
import { usePostImageMutation } from '../../../entities/files/model/api'

// Список компетенций — один источник правды
const QUALITIES = [
  'Анализ информации',
  'Широта мышления',
  'Коммерческое мышление',
  'Оказание влияния',
  'Лидерство',
  'Построение сети контактов',
  'Планирование и организация',
  'Постановка задач и контроль',
  'Управление изменениями',
  'Ориентация на достижения',
  'Решительность',
  'Саморазвитие',
] as const

// Приводим к целому числу и ограничиваем 0–100
function clampInt(value: unknown, min = 0, max = 100): number {
  const n = Math.floor(Number(value))
  if (Number.isNaN(n)) return min
  return Math.min(max, Math.max(min, n))
}

function createInitialInfo(): InfoAddDolzhnost {
  return {
    position: '',
    department: '',
    company: '',
    address: '',
    education: '',
    lengtWork: '',
    image: '',
    foreignLang: [],
    сompEduLevel: 0,
    personalQual: { honesty: 0, responsibility: 0, flexibility: 0, empathy: 0 },
    emploEvalu: 0,
    professionalSkills: [
      { skill: '', grade: 0 }
    ],
    professionalQual: QUALITIES.map(q => ({ qualitie: q, grade: 0 })),
  }
}


interface ApiError {
  data?: {
    message?: string;
  };
}

// Type guard для проверки ошибки API
function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'data' in error;
}

export default function AddDialogKadrRezerv() {
  const [addPosition] = useAddPositionMutation()
  const [postImage] = usePostImageMutation()
  const [openAdd, setOpenAdd] = React.useState(false)
  const [infoAddUser, setInfoAddUser] = React.useState<InfoAddDolzhnost>(createInitialInfo)
  const [imageUrl, setImageUrl] = React.useState<string>('')

  const resetForm = () => {
    setInfoAddUser(createInitialInfo())
    setImageUrl('')
  }

  const handleQualityChange = (index: number, value: string) => {
    setInfoAddUser(prev => {
      const next = { ...prev }
      const list = [...next.professionalQual]
      list[index] = { ...list[index], grade: clampInt(value) }
      next.professionalQual = list
      return next
    })
  }

  const handleAddPosition = async () => {
    const payload = {
      position: infoAddUser.position,
      department: infoAddUser.department,
      company: infoAddUser.company,
      address: infoAddUser.address,
      education: infoAddUser.education,
      lengtWork: infoAddUser.lengtWork,
      сompEduLevel: infoAddUser.сompEduLevel,
      image: imageUrl, 
      personalQual: {
        honesty: clampInt(infoAddUser.personalQual.honesty, 0, 100),
        responsibility: clampInt(infoAddUser.personalQual.responsibility, 0, 100),
        flexibility: clampInt(infoAddUser.personalQual.flexibility, 0, 100),
        empathy: clampInt(infoAddUser.personalQual.empathy, 0, 100),
      },
      emploEvalu: clampInt(infoAddUser.emploEvalu, 0, 100),
      foreignLang: (infoAddUser.foreignLang || [])
        .filter(l => l.language)
        .map(({ language, level }) => ({ lang: language, level })),
      professionalSkills: (infoAddUser.professionalSkills || [])
        .filter(s => s.skill)
        .map(({ skill, grade }) => ({ skill, grade: clampInt(grade, 0, 100) })),
      professionalQual: (infoAddUser.professionalQual || []).map(q => ({
        qualitie: q.qualitie,
        grade: Number(clampInt(q.grade, 0, 100)),
      })),
    }
    
    try {
      await addPosition(payload).unwrap()
      toast.success("Должность успешно добавлена")
      resetForm()
      setOpenAdd(false)
    } catch (error: unknown) {
      console.error('Ошибка при добавлении позиции:', error)
      if (isApiError(error)) {
        toast.error(`Ошибка. ${error.data?.message || 'Должность не добавлена'}`)
      } else {
        toast.error("Ошибка. Должность не добавлена")
      }
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер изображения должен быть до 5 МБ');
      return;
    }

    try {
      // Используем unwrap() для получения данных
      const response = await postImage(file).unwrap();
      // Предполагаем, что ответ содержит url
      setImageUrl((response as any).url); // Временное решение
      toast.success('Файл успешно загружен');
    } catch (err: unknown) {
      toast.error('Ошибка при загрузке');
      console.error(err);
    }
  };

  return (
    <>
      <GreenButton value="Добавить должность" shirina={240} func={() => setOpenAdd(true)} />
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Добавить должность</DialogTitle>
        <DialogContent>
          <div className="flex flex-col w-[500px] gap-[10px]">
            <TextField label="Должность" variant="standard" value={infoAddUser.position} onChange={e => setInfoAddUser({ ...infoAddUser, position: e.target.value })} />
            <TextField label="Отдел" variant="standard" value={infoAddUser.department} onChange={e => setInfoAddUser({ ...infoAddUser, department: e.target.value })} />
            <TextField label="Компания" variant="standard" value={infoAddUser.company} onChange={e => setInfoAddUser({ ...infoAddUser, company: e.target.value })} />
            <TextField label="Адрес" variant="standard" value={infoAddUser.address} onChange={e => setInfoAddUser({ ...infoAddUser, address: e.target.value })} />
            <TextField label="Образование" variant="standard" value={infoAddUser.education} onChange={e => setInfoAddUser({ ...infoAddUser, education: e.target.value })} />
            <TextField label="Стаж работы" variant="standard" value={infoAddUser.lengtWork} onChange={e => setInfoAddUser({ ...infoAddUser, lengtWork: e.target.value })} />
            <div className='pt-[20px]'>
              <input type='file' id='file' className='w-[260px] outline-[#3EA458]' onChange={handleFileChange} />
            </div>

            <LanguageProficiencyFormAdd setInfoAddUser={setInfoAddUser} />
            <CompForAddDolzhnost setInfoAddUser={setInfoAddUser} />

            {infoAddUser.professionalQual.map((q, index) => (
              <div key={q.qualitie} className="flex justify-between items-center border p-2 rounded-[8px]">
                <p>{q.qualitie}</p>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  className="w-[100px] rounded-[10px] outline-none border px-[10px]"
                  placeholder="0–100"
                  value={q.grade}
                  onChange={e => handleQualityChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Отмена</Button>
          <Button onClick={handleAddPosition}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}