import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, TextField } from '@mui/material'

const skills = [
  "Творчество",
  "Честность",
  "Win-Win мышление",
  "Профессионализм",
  "Командный дух",
  "Целеустремлённость",
  "Знание МСФО и национальных стандартов бухгалтерского учета",
  "Финансовый анализ и прогнозирование",
  "Управление бюджетом, планирование расходов и доходов",
  "Налоговое планирование и отчётность",
  "Управление инвестициями, оценка рисков",
  "Работа с финансовыми системами (1С, SAP, Excel продвинутый уровень)",
  "Аналитическое мышление",
  "Внимательность к деталям",
  "Навыки презентации финансовых данных",
  "Стрессоустойчивость и дисциплина",
  "Кадровое делопроизводство и знание Трудового кодекса",
  "Подбор персонала (интервью, ассессмент, тестирование)",
  "Разработка систем мотивации и адаптации сотрудников",
  "Построение корпоративной культуры",
  "Обучение и развитие персонала (L&D)",
  "Использование HRIS/ATS систем",
  "Эмпатия и эмоциональный интеллект",
  "Навыки коммуникации и переговоров",
  "Конфликт-менеджмент",
  "Лидерство и наставничество",
  "Управление цепочками поставок (SCM)",
  "Оптимизация складских запасов и транспортных маршрутов",
  "Знание Incoterms и таможенных правил",
  "Использование ERP-систем для управления логистикой",
  "Контроль качества и сроков поставок",
  "Организованность и умение работать с дедлайнами",
  "Системное мышление",
  "Решение проблем в условиях неопределённости",
  "Навыки взаимодействия с поставщиками и перевозчиками",
  "Гражданское, трудовое, хозяйственное и международное право",
  "Анализ договоров и юридических документов",
  "Навыки составления контрактов и правовых заключений",
  "Юридическое сопровождение бизнеса",
  "Судебная практика и претензионная работа",
  "Логическое и критическое мышление",
  "Умение доносить сложные правовые аспекты простым языком",
  "Ответственность и высокая этичность",
  "Знание методологий управления проектами (Agile, Scrum, Waterfall, PMI, PRINCE2)",
  "Разработка бизнес-планов и технико-экономических обоснований",
  "Финансовое моделирование проектов",
  "Управление рисками и сроками",
  "Владение инструментами (MS Project, Jira, Trello)",
  "Лидерство и координация команд",
  "Гибкость и адаптивность",
  "Навыки презентации проектов",
  "Стратегическое мышление",
  "Знание международного делового этикета",
  "Ведение переговоров с иностранными партнёрами",
  "Знание внешнеэкономической деятельности (ВЭД)",
  "Владение иностранными языками",
  "Подготовка и сопровождение международных контрактов",
  "Кросс-культурная коммуникация",
  "Дипломатичность и умение находить компромиссы",
  "Навыки построения доверительных отношений",
  "Презентационные навыки",
  "Планирование закупок и управление тендерами",
  "Анализ рынка поставщиков",
  "Переговоры по условиям закупок",
  "Контроль исполнения контрактов",
  "Использование специализированных систем закупок (SAP Ariba, 1С)",
  "Эффективная коммуникация с внутренними заказчиками",
  "Умение работать под давлением"
];


interface AlertDialogSkillsProps {
  setNavik: React.Dispatch<React.SetStateAction<string[]>>;
  item: any
}

export default function AlertDialogEditSkills({ setNavik, item }: AlertDialogSkillsProps){
  const [open, setOpen] = React.useState(false);
  const [filterSkills, setFilterSkills]=React.useState('')
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(item?.skills);
  console.log(selectedSkills);
  console.log(item);
  
  

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

 React.useEffect(()=>{
	setNavik(selectedSkills)
 }, [setNavik,selectedSkills])
   
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    console.log("Выбранные навыки:", selectedSkills);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{ borderColor: "green", color: "green" }}
        onClick={handleClickOpen}
      >
        Добавить навыки к материалу
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Выберите навыки к материалу"}
        </DialogTitle>
        <DialogContent>
          <div className='pb-[20px]'>
            <TextField
          id="standard-basic"
          label="Введите название навыка"
          variant="standard"
          value={filterSkills}
          onChange={(e) => setFilterSkills(e.target.value)}
          placeholder='Поиск . . .'
          sx={{
            width: '100%',
        
            '& .MuiInput-underline:after': { borderBottomColor: 'green' },  // при фокусе
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'green' }, // при наведении
            '& .MuiFormLabel-root.Mui-focused': { color: 'green' }, // label при фокусе
          }}
        />
        
          </div>
          <div className="w-[400px] h-[350px] overflow-auto flex flex-col gap-[10px]">
          {skills.filter((skill) =>
            skill.toLowerCase().includes(filterSkills.toLowerCase())
          ).length === 0 ? (
            <p className="text-green-600 tracking-[1px] text-[20px] font-semibold italic  text-center">Навыки не найдены</p>
          ) : (
            skills
              .filter((skill) =>
                skill.toLowerCase().includes(filterSkills.toLowerCase())
              )
              .map((skill) => (
                <div
                  key={skill}
                  className="flex border px-[10px] pb-[5px] justify-between items-center"
                >
                  <p>{skill}</p>
                  <Checkbox
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    color="success"
                  />
                </div>
              ))
          )}
        </div>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'green'}}>Отмена</Button>
          <Button onClick={handleAdd} sx={{color: 'green'}} autoFocus>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
