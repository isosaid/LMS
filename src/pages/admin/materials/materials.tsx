import { useEffect, useState } from 'react'
import { API_IMAGE, MyJwtPayload } from '../../../shared/types'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router'
import GreenButton from '../../../shared/ui/button'
import ResponsiveAddDialog from '../../../widgets/admin/dialogForAddMaterial'
import { useGetMaterialsQuery, usePostMaterialViewMutation } from '../../../entities/materials/model/api'
import DeleteDialog from '../../../widgets/admin/deleteMaterialDialog'
import ResponsiveEditDialog from '../../../widgets/admin/dialogForEditMaterial'

const skillss = [
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


const Materials = () => {
  const [title, setTitle]=useState('')
  const [type, setType]=useState('')
  const [skills, setSkills]=useState('')
  const [idx, setIdx]=useState(0)
 const { data: materialData } = useGetMaterialsQuery({
  title: title,
  type: type,
  skills: skills
});  



  const navigate=useNavigate()


useEffect(() => {
  const token = localStorage.getItem("access_token");
  
  if (!token) {
    navigate("/");
    return;
  }

  try {
    const decoded = jwtDecode<MyJwtPayload>(token);
    setIdx(decoded.id);
    
    if (!decoded.roles.includes('ADMIN')) {
      navigate('/user/profile');
    }
    
  } catch (err) {
    console.error("Ошибка при декодировании токена:", err);
    localStorage.removeItem("access_token"); 
    navigate("/");
  }
}, [navigate]);
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value)
  };

  const sbrosFilter=()=>{
    setTitle("")
    setType("")
    setSkills("")
  } 


  const [postMaterialView]=usePostMaterialViewMutation()
  const handleRoutById=(id: number | string)=>{
    const bodyId={
      userId: idx,
      materialId: id
    }
    postMaterialView(bodyId)  
  }
  
  return <>
  <div className='  px-[30px]'>
    <div className=' flex py-[30px] justify-between items-center'>
    <p className='text-[30px] font-semibold tracking-[1px]'>Материалы</p>
    <ResponsiveAddDialog /> 
   </div>
   <div className='flex flex-col gap-[20px] border p-[30px] rounded-[20px] mb-[30px] border-gray-300 '> 
      <p className='text-[30px] font-semibold tracking-[1px] '>Фильтры</p> 
      <div className='flex justify-between items-end'>
        <div className='flex w-[25%] flex-col gap-[10px]'>
          <label htmlFor="inpMaterial" className='text-[18px] font-semibold tracking-[1px]'>Найти материал</label>
          <input type="text" id='inpMaterial'  placeholder='Названия материала'  className='w-[100%] py-[10px] border border-gray-400 rounded-[10px] px-[10px] outline-[#43a047]' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        </div>
        <div className='flex w-[25%] flex-col gap-[10px]'>
          <label htmlFor="inpTypeMaterial" className='text-[18px] font-semibold tracking-[1px]'>Тип материала</label>
          <select name=""  id="inpTypeMaterial" onChange={handleChange} value={type} className='w-[100%] py-[10px] border border-gray-400 rounded-[10px] px-[10px] outline-[#43a047]' >
            <option value="">Все</option>
            <option value="test">Тест</option>
            <option value="video">Видео</option>
            <option value="article">Статья</option>
          </select>
        </div>
        <div className='flex w-[25%] flex-col gap-[10px]'>
  <label htmlFor="inpMaterial" className='text-[18px] font-semibold tracking-[1px]'>Поиск по навыку</label>
  <select
    name=""
    id="inpTypeMaterial"
    onChange={(e) => setSkills(e.target.value)}
    value={skills}
    className='w-full  py-[10px] border border-gray-400 rounded-[10px] px-[10px] outline-[#43a047] truncate'
  >
    <option value="" title="Все">Все</option>
    {skillss.map((skill, index) => (
  <option key={skill + index} value={skill} title={skill}>
    {skill.length > 25 ? skill.slice(0, 22) + '...' : skill}
  </option>
))}
  </select>
</div>


        <div className='flex gap-[20px] items-center'>
          <GreenButton value='Сбросить' shirina={150} func={sbrosFilter}/>
        </div>
      </div>

      {
        materialData?.length == 0 ? <div className=' flex items-center justify-center h-[30vh] w-[100%]'> 
        <p className='text-[30px] tracking-[1px] font-semibold text-[#3EA458] italic'> Такого материала не существует. </p>
        </div> :  <div className='grid grid-cols-3 gap-[30px] py-[30px]'>
    { 
      (Array.isArray(materialData) ? [...materialData].reverse() : []).map((item)=>{
            return  <div key={item.id} className='flex hover:translate-y-[-10px] transfrom transition-all duration-150 ease-in-out flex-col shadow-md rounded-[10px] gap-[10px]'>
          <Link to={'/admin/' + item.id } onClick={()=>handleRoutById(item.id)}>
          <img src={`${API_IMAGE}${item.coverImage}`} alt="" className='rounded-[10px] h-[200px] w-[100%]' />
          <div className='flex flex-col gap-[10px] px-[10px]'>
       <p className='text-[20px] h-[55px] font-semibold italic tracking-[1px]'>{item.title}</p>
         
          <div className='flex items-center text-white gap-[10px]'>
             <p className='text-[#ADABAB] '>Тип : </p>
             <p className='bg-[#3EA458] rounded-[10px]  py-[5px] px-[15px]'>
              {item.type == 'test' ? 'Тест' : item.type== 'video' ? 'Видео' : "Статья"}
             </p>
          </div>
          <p className='text-[#ADABAB]  '> Автор :  <span className='text-black font-semibold tracking-[1px] text-[14px]'>{item.author == null ? 'Firdavs Latipov' : item.author.name + " " +  item.author.surname}</span></p>
          
         
          </div></Link>
          
          <div className='flex  items-center justify-center gap-[10px] border-t border-gray-300'>
          <DeleteDialog id={item.id}/>
           <ResponsiveEditDialog item={item}/>
          </div>
          
         </div>
         
      })
    }
   </div>
      }
      
   </div>
   
  </div>

  </>
	 
  
}

export default Materials