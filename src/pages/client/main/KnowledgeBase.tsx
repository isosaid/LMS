import SearchIcon from '@mui/icons-material/Search'
import {
	Box,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material' 
import React, { useEffect, useMemo, useState } from 'react'
import CourseCard from '../../../components/CourseCard'
import FilterComponent from '../../../components/FilterComponent'
import { SortType } from '../../../shared/types'
import { useNavigate } from 'react-router'
import ModalForDopInfo from '../../../widgets/client/modalForDopInfo'
import { useGetMaterialsQuery} from '../../../entities/materials/model/api'
import { useGetUserProfileQuery } from '../../../entities/User/model/api'

const levelMap: Record<string, string> = {
  'Все': '',
  'Стажёры': 'basic',
  'Специалист': 'intermediate',
  'Продвинутый': 'advanced',
}

const langMap: Record<string, string> = {
  'Все': '',
  'Русский': 'ru',
  'Английский': 'en',
  'Другие': 'tj', // если 'tj' — это таджикский, ты прав
}

const typeMap: Record<string, string> = {
  'Все': '',
  'Тест': 'test',
  'Видео': 'video',
  'Статья': 'article',
}

const skillss = [
  'Все',
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


interface Favorites {
  id: number | string
}


const KnowledgeBasePage: React.FC = () => {
	const [sortKey, setSortKey] = useState<SortType>('Популярности')
	const [searchQuery, setSearchQuery] = useState('')
	const [author, setAuthor] = useState('')
	const [choose, setChoose] = useState('Все')
	const [lang, setLang] = useState('Все')
	const [levels, setLevels] = useState('Все')
	const [skills, setSkills] = useState('Все')	
	const [type, setType] = useState('Все')
	const [dopInfo, setOpenDopInfo] = useState(false)
	const navigate = useNavigate()
	const { data: userData, isLoading, refetch} = useGetUserProfileQuery([])
  
  const selectedLevel = levelMap[levels] ?? ''
  const selectedLang = langMap[lang] ?? ''
  const selectedType = typeMap[type] ?? ''
  const selectedAuthor = choose === 'Автор' ? author : ''
  const selectedTitle = choose === 'Название' ? searchQuery : ''
  
  const { data: materialData, isLoading: loadingMaterialData} = useGetMaterialsQuery({
    title: selectedTitle,
    lang: selectedLang,
    levels: selectedLevel,
    type: selectedType,
    author: selectedAuthor,
    skills: skills === 'Все' ? '' : skills,
  })

  
  
  

	const favoriteIds = useMemo(() => {
		return userData?.favoriteMaterials?.map((fav: Favorites) => fav.id) || []
	}, [userData])

	const sortedMaterials = useMemo(() => {
		if (!materialData) return []

		return [...materialData].sort((a, b) => {
			switch (sortKey) {
				case 'Популярности':
					return (b?.viewedBy?.length || 0) - (a?.viewedBy?.length || 0)
				case 'Рейтингу':
					return (b.reting || 0) - (a.reting || 0)
				case 'Дате добавления':
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				default:
					return 0
			}
		})
	}, [materialData, sortKey])

	const handleSortByChange = (value: SortType) => {
		setSortKey(value)
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (choose === 'Название') {
			setSearchQuery(value)
		} else {
			setAuthor(value)
		}
	}

	useEffect(() => {
  const token = localStorage.getItem('access_token')
  refetch()

  if (!userData) return

  // Если courses нет или пустой массив — показываем модалку
  if (!userData.courses || userData.courses.length === 0) {
    const timer = setTimeout(() => {
      setOpenDopInfo(true)
    }, 3000)
    return () => clearTimeout(timer) // очищаем таймер при размонтировании
  } else {
    setOpenDopInfo(false)
  }

  if (!token) {
    navigate('/')
  }
}, [navigate, userData])



  if (isLoading || loadingMaterialData) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
	return (
  <Container maxWidth='lg' sx={{ mt: 2 }}>
    <Grid item xs={12} md={9}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={12} mb={1}>
          <Box display='flex' gap={2}>
            <Grid item xs={12} md={4}>
              <Typography
                variant='h4'
                className='-translate-y-3'
                component='h1'
                fontWeight='bold'
              >
                База знаний
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <FilterComponent
                label='Все'
                options={['Все', 'Название', 'Автор']}
                setChoose={setChoose}
                choose={choose}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant='outlined'
                placeholder={`${choose == 'Все' ? 'Выберите один из вариантов ' : choose == 'Название' ? 'Введите название материала' : 'Введите имя автора материала'}`}
                fullWidth
                size='small'
                value={choose == 'Название' ? searchQuery : author}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end'>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box display='flex' gap={2}>
            <FilterComponent
              label='Тип материала'
              options={['Все', 'Тест', 'Статья', 'Видео']}
              choose={type}
              setChoose={setType}
            />
            <FilterComponent
              label='Область развития'
              options={skillss}
              choose={skills}
              setChoose={setSkills}
            />
            <FilterComponent
              label='Уровень'
              options={['Все', 'Стажёры', 'Специалист', 'Продвинутый']}
              choose={levels}
              setChoose={setLevels}
            />
            <FilterComponent
              label='Язык'
              options={['Все', 'Русский', 'Английский', 'Таджикский']}
              choose={lang}
              setChoose={setLang}
            />
          </Box>
          <Typography variant='body2' color='#ADABAB' sx={{ mt: 1, display: 'block' }}>
            Чтобы уточнить критерии поиска, укажите выбор тип материала
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 5 }}>
        <Typography component='span' variant='body2' color='textSecondary'>
          Сортировать по:
        </Typography>
        <Tabs
          value={sortKey}
          onChange={(_, newValue) => handleSortByChange(newValue)}
          sx={{
            display: 'inline-flex',
            ml: 1,
            '& .MuiTabs-indicator': { backgroundColor: 'black' },
          }}
        >
          <Tab
            sx={{ '&.Mui-selected': { fontWeight: 'bold', color: 'black' } }}
            label='Популярности'
            value='Популярности'
          />
          <Tab
            sx={{ '&.Mui-selected': { fontWeight: 'bold', color: 'black' } }}
            label='Рейтингу'
            value='Рейтингу'
          />
          <Tab
            sx={{ '&.Mui-selected': { fontWeight: 'bold', color: 'black' } }}
            label='Дате добавления'
            value='Дате добавления'
          />
        </Tabs>
      </Box>

      <ModalForDopInfo dopInfo={dopInfo} setOpenDopInfo={setOpenDopInfo} />

      {sortedMaterials.length === 0 ? (
        <div className='h-[300px] flex justify-center items-center'>
          <p className='italic text-green-600 text-[30px] font-semibold'>Такого курса не существует.</p>
        </div>
      ) : (
        <Grid container spacing={3} py={3}>
          {sortedMaterials.map(course => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
              <CourseCard course={course} isFavorite={favoriteIds.includes(course.id)} userData={userData}/>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  </Container>
)
}

export default KnowledgeBasePage
