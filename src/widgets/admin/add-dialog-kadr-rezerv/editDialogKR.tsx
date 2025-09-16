import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import { InfoAddDolzhnost } from '../../../shared/types'
import { useEditPositionMutation } from '../../../entities/personal-reserve/model/api'
import LanguageFormEdit from './dialogEnglishEdit'
import CompForEditDolzhnost from './compEditDialogCR'
import toast from 'react-hot-toast'
import { useDeleteFileUrlMutation, usePostImageMutation } from '../../../entities/files/model/api'

function clampInt(value: unknown, min = 0, max = 100): number {
  const n = Math.floor(Number(value))
  if (Number.isNaN(n)) return min
  return Math.min(max, Math.max(min, n))
}


interface ApiError {
  data?: {
    message?: string
  }
}

// Type guard для проверки ошибки API
function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'data' in error
}

interface EditDialogProps {
  data: {
    id: number
    position?: string
    department?: string
    company?: string
    address?: string
    image?: string
    education?: string
    lengtWork?: string
    foreignLang?: Array<{ lang: string; level: string }>
    сompEduLevel?: number
    personalQual?: { honesty: number; responsibility: number; flexibility: number; empathy: number }
    emploEvalu?: number
    professionalSkills?: Array<{ skill: string; grade: number }>
    professionalQual?: Array<{ qualitie: string; grade: number }>
  }
}

export default function EditDialogKadrRezerv({ data }: EditDialogProps) {
  const [editPosition] = useEditPositionMutation()
  const [openAdd, setOpenAdd] = React.useState(false)
  const [postImage] = usePostImageMutation()
  const [deleteFileUrl] = useDeleteFileUrlMutation()
  const [imageUrl, setImageUrl] = React.useState<string>('')

  const qualitiesTemplate = {
    analiz: '',
    shirotaMyshleniya: '',
    commerseThinking: '',
    okazaniyaVliyaniya: '',
    liderstvo: '',
    postroenieSeti: '',
    planirovanieAndOrg: '',
    postanovkaZadach: '',
    upravlenieIzmen: '',
    orientaciya: '',
    reshitelnost: '',
    samorazvitie: '',
  }

  const makeKeyQualities = (data: any) => [
    { qualitie: 'Анализ информации', grade: Number(data.analiz) || 0 },
    { qualitie: 'Широта мышления', grade: Number(data.shirotaMyshleniya) || 0 },
    { qualitie: 'Коммерческое мышление', grade: Number(data.commerseThinking) || 0 },
    { qualitie: 'Оказание влияния', grade: Number(data.okazaniyaVliyaniya) || 0 },
    { qualitie: 'Лидерство', grade: Number(data.liderstvo) || 0 },
    { qualitie: 'Построение сети контактов', grade: Number(data.postroenieSeti) || 0 },
    { qualitie: 'Планирование и организация', grade: Number(data.planirovanieAndOrg) || 0 },
    { qualitie: 'Постановка задач и контроль', grade: Number(data.postanovkaZadach) || 0 },
    { qualitie: 'Управление изменениями', grade: Number(data.upravlenieIzmen) || 0 },
    { qualitie: 'Ориентация на достижения', grade: Number(data.orientaciya) || 0 },
    { qualitie: 'Решительность', grade: Number(data.reshitelnost) || 0 },
    { qualitie: 'Саморазвитие', grade: Number(data.samorazvitie) || 0 },
  ]

  const [formData, setFormData] = React.useState<{ [key: string]: string }>(() => {
    if (!data) return qualitiesTemplate
    return {
      analiz: data.professionalQual?.[0]?.grade?.toString() || '',
      shirotaMyshleniya: data.professionalQual?.[1]?.grade?.toString() || '',
      commerseThinking: data.professionalQual?.[2]?.grade?.toString() || '',
      okazaniyaVliyaniya: data.professionalQual?.[3]?.grade?.toString() || '',
      liderstvo: data.professionalQual?.[4]?.grade?.toString() || '',
      postroenieSeti: data.professionalQual?.[5]?.grade?.toString() || '',
      planirovanieAndOrg: data.professionalQual?.[6]?.grade?.toString() || '',
      postanovkaZadach: data.professionalQual?.[7]?.grade?.toString() || '',
      upravlenieIzmen: data.professionalQual?.[8]?.grade?.toString() || '',
      orientaciya: data.professionalQual?.[9]?.grade?.toString() || '',
      reshitelnost: data.professionalQual?.[10]?.grade?.toString() || '',
      samorazvitie: data.professionalQual?.[11]?.grade?.toString() || '',
    }
  })

  const [infoAddUser, setInfoAddUser] = React.useState<InfoAddDolzhnost>(() => ({
    position: data?.position || '',
    department: data?.department || '',
    company: data?.company || '',
    address: data?.address || '',
    image: data?.image || '',
    education: data?.education || '',
    lengtWork: data?.lengtWork || '',
    foreignLang: data?.foreignLang || [],
    сompEduLevel: data?.сompEduLevel || 0,
    personalQual: data?.personalQual || { honesty: 0, responsibility: 0, flexibility: 0, empathy: 0 },
    emploEvalu: data?.emploEvalu || 0,
    professionalSkills: data?.professionalSkills || [],
    professionalQual: makeKeyQualities(formData),
  }))

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер изображения должен быть до 5 МБ');
      return;
    }

    try {
      // Используем unwrap() для получения данных
      const response = await postImage(file).unwrap();
      // Предполагаем, что ответ содержит url
      setImageUrl((response as any).url);
      toast.success('Файл успешно загружен');
    } catch (err: unknown) {
      toast.error('Ошибка при загрузке');
      console.error(err);
    }
  };

  React.useEffect(() => {
    setInfoAddUser((prev) => ({
      ...prev,
      professionalQual: makeKeyQualities(formData),
    }))
  }, [formData])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditPosition = async () => {
    const payload = {
      position: infoAddUser.position,
      department: infoAddUser.department,
      company: infoAddUser.company,
      address: infoAddUser.address,
      education: infoAddUser.education,
      lengtWork: infoAddUser.lengtWork,
      сompEduLevel: infoAddUser.сompEduLevel,
      image: imageUrl || infoAddUser.image, // Используем новое изображение или старое
      personalQual: {
        honesty: clampInt(infoAddUser.personalQual?.honesty, 0, 100),
        responsibility: clampInt(infoAddUser.personalQual?.responsibility, 0, 100),
        flexibility: clampInt(infoAddUser.personalQual?.flexibility, 0, 100),
        empathy: clampInt(infoAddUser.personalQual?.empathy, 0, 100),
      },
      emploEvalu: clampInt(infoAddUser.emploEvalu, 0, 100),
      foreignLang: (infoAddUser.foreignLang || [])
        .filter(l => l.lang)
        .map(({ lang, level }) => ({ lang, level })),
      professionalSkills: (infoAddUser.professionalSkills || [])
        .filter(s => s.skill)
        .map(({ skill, grade }) => ({ 
          skill, 
          grade: clampInt(grade, 0, 100)
        })),
      professionalQual: (infoAddUser.professionalQual || []).map(q => ({
        qualitie: q.qualitie,
        grade: clampInt(q.grade, 0, 100),
      })),
    }

    try {
      if (!data?.id) throw new Error('Нет ID позиции!')
      
      // Удаляем старое фото только если загрузили новое
      if (imageUrl && data.image) {
        const converted = data.image
          .replace(/^\/+/, "")
          .replace(/\//g, "%5C");
        
        try {
          await deleteFileUrl(converted).unwrap();
          console.log("Старое фото удалено:", converted);
        } catch (err) {
          console.error("Ошибка при удалении старого фото:", err);
        }
      }

      await editPosition({ positionId: data.id, body: payload }).unwrap()
      toast.success('Должность успешно обновлена!');
      setOpenAdd(false);
    } catch (error: unknown) {
      console.error('Ошибка:', error);
      if (isApiError(error)) {
        toast.error(`Ошибка при изменении должности. ${error.data?.message || ''}`);
      } else {
        toast.error('Ошибка при изменении должности');
      }
    }
  }

  return (
    <>
      <div
        className="py-[5px] border-b-2 hover:text-green-600 hover:border-green-600 transition-all duration-200 ease-in-out"
        onClick={() => setOpenAdd(true)}
      >
        <p className="font-semibold">Изменить должность</p>
      </div>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Редактировать должность</DialogTitle>
        <DialogContent>
          <div className="flex flex-col w-[500px] gap-[10px]">
            <TextField
              label="Должность"
              variant="standard"
              value={infoAddUser.position}
              onChange={(e) => setInfoAddUser({ ...infoAddUser, position: e.target.value })}
            />
            <TextField
              label="Отдел"
              variant="standard"
              value={infoAddUser.department}
              onChange={(e) => setInfoAddUser({ ...infoAddUser, department: e.target.value })}
            />
            <TextField
              label="Компания"
              variant="standard"
              value={infoAddUser.company}
              onChange={(e) => setInfoAddUser({ ...infoAddUser, company: e.target.value })}
            />
            <TextField
              label="Адрес"
              variant="standard"
              value={infoAddUser.address}
              onChange={(e) => setInfoAddUser({ ...infoAddUser, address: e.target.value })}
            />
            <TextField
              label="Образование"
              variant="standard"
              value={infoAddUser.education}
              onChange={(e) => setInfoAddUser({ ...infoAddUser, education: e.target.value })}
            />
            <TextField
              label="Стаж работы"
              variant="standard"
              value={infoAddUser.lengtWork}
              onChange={(e) => setInfoAddUser({ ...infoAddUser, lengtWork: e.target.value })}
            />
            <div className='pt-[20px]'>
              <input type='file' id='file' className='w-[260px] outline-[#3EA458]' onChange={handleFileChange} />
              {infoAddUser.image && !imageUrl && (
                <p className='text-sm text-gray-600 mt-2'>Текущее изображение: {infoAddUser.image}</p>
              )}
              {imageUrl && (
                <p className='text-sm text-green-600 mt-2'>Новое изображение загружено</p>
              )}
            </div>

            <LanguageFormEdit setInfoAddUser={setInfoAddUser} infoAddUser={infoAddUser}/>
            <CompForEditDolzhnost setInfoAddUser={setInfoAddUser} infoAddUser={infoAddUser} />

            {Object.keys(qualitiesTemplate).map((key, index) => (
              <div key={index} className="flex justify-between items-center border p-2">
                <p>{makeKeyQualities(formData)[index].qualitie}</p>
                <input
                  type="number"
                  className="w-[100px] rounded-[10px] outline-none border px-[10px]"
                  placeholder="от 0 - 100"
                  value={formData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Отмена</Button>
          <Button onClick={handleEditPosition}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}