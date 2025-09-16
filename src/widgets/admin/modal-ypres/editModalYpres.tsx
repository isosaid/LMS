import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useGetUsersQuery } from '../../../entities/User/model/api';
import { useGetMaterialsQuery } from '../../../entities/materials/model/api';
import { Checkbox } from '@mui/material';
import { useEditYpresMutation } from '../../../entities/IDP/model/api';
import { SquarePen } from 'lucide-react';
import toast from 'react-hot-toast'
import IDPDialogEditSkills from '../modal-for-skills/modalSkillEditIDP'
import { API_IMAGE, Users } from '../../../shared/types'


interface Material {
  id: number
  title: string
  coverImage:string
  YpresMaterial: {
    id: string | number
    dedline:string
  }
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogEditYpres({ ypres }: any) {
  const { data: materialData } = useGetMaterialsQuery([]);
  const { data: userData } = useGetUsersQuery([]);
  const [editYpres] = useEditYpresMutation();
  

  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [materialDeadlines, setMaterialDeadlines] = React.useState<{ [key: number]: string }>({});
  const [sotrudnik, setSotrudnik] = React.useState<number | ''>(ypres?.userId || '');
  const [description, setDescription] = React.useState(ypres?.description || '');
  const [date, setDate] = React.useState(ypres?.time || '');
const [navik, setNavik] = React.useState<string[]>([]);
  const [competenciya, setCompetenciya] = React.useState(ypres?.competencies?.join(',') || '');
  const [knowledge, setKnowledge] = React.useState(ypres?.lore?.join(',') || '');
  const [massivAll, setMassivAll] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
  if (!open) return;

  if (Array.isArray(ypres?.materialIds)) {
    const selected = ypres.materialIds.map((mat: Material) => mat.id);
    setSelectedIds(selected);

    const deadlinesObj: { [key: number]: string } = {};
    ypres.materialIds.forEach((mat: Material) => {
      if (mat.YpresMaterial?.dedline) {
        deadlinesObj[mat.id] = mat.YpresMaterial.dedline;
      }
    });
    setMaterialDeadlines(deadlinesObj);
  } else {
    setSelectedIds([]);
    setMaterialDeadlines({});
  }

  setSotrudnik(ypres?.userId || '');
  setDescription(ypres?.description || '');
  setDate(ypres?.time || '');
  setNavik(ypres?.skills);
  setCompetenciya(ypres?.competencies?.join(',') || '');
  setKnowledge(ypres?.lore?.join(',') || '');
  setMassivAll([
    ...(ypres?.skills || []),
    ...(ypres?.competencies || []),
    ...(ypres?.lore || []),
  ]);
}, [open, ypres]
);



  const mergedMaterials = materialData?.map((material: Material) => {
    const matched = ypres?.materialIds?.find((m: Material) => m.id === material.id);
    const dedline = matched?.YpresMaterial?.dedline || '';
    return { ...material, dedline };
  });

  const handleCheckboxChange = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.checked) {
    setSelectedIds(prev => [...prev, id]);

    setMaterialDeadlines(prev => ({
      ...prev,
      [id]: prev[id] || new Date().toISOString().split('T')[0]
    }));

  } else {
    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    setMaterialDeadlines(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }
};



  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePostYpres = async () => {
  if (!sotrudnik || !description || !date) {
    toast.error('Заполните все обязательные поля');
    return;
  }

  if (description.length > 140) {
    toast.error('Описание не должно превышать 140 символов');
    return;
  }

  const missingDeadline = selectedIds.find(id => !materialDeadlines[id]?.trim());
if (missingDeadline) {
  toast.error('Для всех выбранных материалов нужно указать дедлайн.');
  return;
}


  const newYpres = {
    description,
    skills: navik,
    competencies: competenciya.split(',').map((s: string) => s.trim()).filter(Boolean),
    lore: knowledge.split(',').map((s: string) => s.trim()).filter(Boolean),
    time: date,
    userId: Number(sotrudnik),
    materialIds: selectedIds.map(id => ({
      materialId: id,
      dedline: materialDeadlines[id],
      status: 'pending',
    })),
  };
  try {
    await editYpres({ body: newYpres, ypresId: ypres?.id }).unwrap()
    toast.success('ИПР успешно обновлен')
   setOpen(false);
  } catch (error) {
    toast.error('Не удалось обновить данные ИПР')
    console.log(error);
  }
};


  return (
    <>
      <span className='transition-all duration-150 transform hover:translate-y-[-5px]' onClick={handleClickOpen}>
        <SquarePen color='#3EA458' />
      </span>

      <Dialog
        open={open}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Изменение индивидуального плана развития</DialogTitle>
        <DialogContent>
          <div className='w-[500px] box-border flex flex-col gap-[20px]'>

            <div className='flex justify-between items-start'>
              <p className='text-[18px]'>Выбор сотрудника:</p>
              <select
                className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
                value={sotrudnik}
                onChange={(e) => setSotrudnik(Number(e.target.value))}
              >
                <option value="">Не выбрано</option>
                {userData?.map((user: Users) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex justify-between items-start'>
              <p className='text-[18px]'>Краткое описание:<br />Макс 140 знаков.</p>
              <textarea
                className='py-[10px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%] h-[100px]'
                placeholder='Суть индивидуального плана развития'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className=''>
                              <div className='flex gap-[20px] items-center'>
                               <label htmlFor="naviki" className='w-[150px]'>Навыки : </label>
                           <IDPDialogEditSkills setNavik={setNavik} item={ypres}/>
                              </div>
                              {navik.length > 0 && (
                         <div className="mt-2 text-green-700">
                          Вы выбрали такие навыки как : {navik.join(', ')}
                         </div>
                    )}
                    </div>

            <div className='flex justify-between items-center'>
              <p className='text-[18px]'>Компетенции:</p>
              <input
                type="text"
                className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
                placeholder='Введите названия компетенций'
                value={competenciya}
                onChange={(e) => setCompetenciya(e.target.value)}
              />
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-[18px]'>Знания:</p>
              <input
                type="text"
                className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
                placeholder='Введите знания'
                value={knowledge}
                onChange={(e) => setKnowledge(e.target.value)}
              />
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-[18px]'>Дата:</p>
              <input
                type="date"
                className='py-[5px] px-[10px] rounded-[15px] outline-[#3EA458] border w-[65%]'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className='flex border-t border-b py-[20px] flex-col gap-[20px]'>
              <p className='text-[18px] font-semibold'>Содержания ИПР:</p>
              <div className='flex gap-[10px] flex-wrap'>
                {massivAll.map((item, index) => (
                  <div key={index} className='bg-green-700 rounded-[10px] text-white py-[5px] px-[15px]'>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-[20px]'>
              <p className='text-[22px] font-semibold'>Не забудьте добавить материалы:</p>
              <div className='w-full px-[20px] h-[200px] overflow-auto flex flex-col gap-[10px]'>
                {mergedMaterials?.map((material: Material) => {
                  const isSelected = selectedIds.includes(material.id);
                  return (
                    <div key={material.id} className='flex justify-between items-center gap-[10px]'>
                      <img src={`${API_IMAGE}${material.coverImage}`} className='w-[100px]' alt='' />
                      <p className='w-[200px]'>{material.title}</p>
                      {isSelected && (
                        <input
                          type='date'
                          className='border rounded-[8px] px-[5px]'
                          value={materialDeadlines[material.id] || ''}
                          onChange={(e) =>
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
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'green', border: '1px solid green' }}>
            Отмена
          </Button>
          <Button onClick={handlePostYpres} sx={{ color: 'white', backgroundColor: '#3EA458' }}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
