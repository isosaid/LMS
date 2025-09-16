"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  IconButton,
} from "@mui/material"
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { InfoAddUser } from '../../shared/types'

interface PersonalQuality {
  name: string
  rating: number
}

interface ProfessionalSkill {
  name: string
  rating: number
}


export default function EmployeeEvaluationFormEdit({setInfoAddUser, infoAddUser}: any) {
  const [personalQualities, setPersonalQualities] = useState<PersonalQuality[]>([
	 { name: "Честность", rating: infoAddUser?.personalQual?.honesty },
	 { name: "Ответственность", rating: infoAddUser?.personalQual?.responsibility },
	 { name: "Гибкость", rating: infoAddUser?.personalQual?.flexibility },
	 { name: "Эмпатия", rating: infoAddUser?.personalQual?.empathy },
  ])

  const [professionalSkills, setProfessionalSkills] = useState<ProfessionalSkill[]>(infoAddUser?.professionalSkills)
  

  const [potentialPosition, setPotentialPosition] = useState(infoAddUser?.potentialPos)
  const [areasDevelop, setAreasDevelop] = useState(infoAddUser?.AreasDevelop?.join(','))
  const [srokPov, setSrokPov]=useState(infoAddUser?.PlanDatePromRota)
  const [attestationResult, setAttestationResult] = useState(infoAddUser?.emploEvalu)  
  const [compLevel, setCompLevel] = useState(infoAddUser?.CompEduLevel) 
  const [projects, setProjects] = useState(infoAddUser?.projects)
  

  const handlePersonalQualityRating = (index: number, value: number | null) => {
	 const updated = [...personalQualities]
	 updated[index].rating = value || 0
	 setPersonalQualities(updated)
  }

  const handleProfessionalSkillRating = (index: number, value: number | null) => {
  const updated = professionalSkills.map((skill, i) =>
    i === index ? { ...skill, rating: value || 0 } : skill
  );
  setProfessionalSkills(updated);
};


  const addProfessionalSkill = () => {
	 setProfessionalSkills([...professionalSkills, { name: `Навык ${professionalSkills.length + 1}`, rating: 0 }])
  }

  const removeProfessionalSkill = (index: number) => {
	 setProfessionalSkills(professionalSkills.filter((_, i) => i !== index))
  }

 const addProject = () => {
  setProjects([...projects, ""])  
}


  const removeProject = (index: number) => {
	 setProjects(projects.filter((_: any, i: number) => i !== index))
  }

  const updateProject = (index: number, value: string) => {
  const updated = [...projects]
  updated[index] = value
  setProjects(updated)
}



  const ratingLabels = [
	 "1 – Очень низкий уровень (не обнаружено)",
	 "2 – Низкий уровень (проявляется редко)",
	 "3 – Средний уровень (происходит периодически)",
	 "4 – Высокий уровень (проявляется стабильно)",
	 "5 – Очень высокий уровень (проявляется постоянно)",
  ]


	useEffect(() => {
		setInfoAddUser((prev: InfoAddUser) => ({
		  ...prev,
		  "personalQual": {
		 "honesty": personalQualities[0].rating,
		  "responsibility": personalQualities[1].rating,
		 "flexibility": personalQualities[2].rating,
		 "empathy": personalQualities[3].rating
  },  
		professionalSkills: professionalSkills,
		AreasDevelop:  areasDevelop?.split(','),
		potentialPos: potentialPosition,
		PlanDatePromRota: srokPov,
		CompEduLevel: Number(compLevel),
		emploEvalu: Number(attestationResult),
		projects: projects
		}));

	 }, [areasDevelop, potentialPosition, srokPov, professionalSkills, personalQualities, attestationResult, compLevel, projects, setInfoAddUser]);


  return (
	 <Box sx={{ maxWidth: 800, mx: "auto", p: 0 }}>
		<Paper elevation={0} sx={{ p: 1 }}>
		  {/* Ключевые личные качества */}
		  <Box mb={4}>
			 <Typography variant="h6" color="black" gutterBottom sx={{ fontWeight: "bold" }}>
				КЛЮЧЕВЫЕ ЛИЧНЫЕ КАЧЕСТВА:
			 </Typography>

			 <Box sx={{ mb: 3 }}>
				{ratingLabels.map((label, index) => (
				  <Typography key={index} variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
					 {label}
				  </Typography>
				))}
			 </Box>

			 <Grid container spacing={2}>
				{personalQualities?.map((quality, index) => (
				  <Grid item xs={12} key={index}>
					 <Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography variant="body1" sx={{ minWidth: 200 }}>
						  {quality.name}
						</Typography>
						<Rating
						  value={quality.rating}
						  onChange={(_, value) => handlePersonalQualityRating(index, value)}
						  max={5}
						  size="large"
						/>
						<Box display="flex" gap={1}>
						  {[1, 2, 3, 4, 5].map((num) => (
							 <Typography key={num} variant="body2" color="text.secondary">
								{num}
							 </Typography>
						  ))}
						</Box>
					 </Box>
				  </Grid>
				))}
			 </Grid>
		  </Box>

		  <Divider sx={{ my: 1 }} />

		  {/* Потенциал для роста */}
		  <Box mb={2}>
			 <Typography variant="h6" color="black" gutterBottom sx={{ fontWeight: "bold" }}>
				ПОТЕНЦИАЛ ДЛЯ РОСТА:
			 </Typography>
			 <div className='flex flex-col gap-[10px]'>
				  <TextField id="12345l;ll;" label="Потенциальная должность" variant="standard"  placeholder='Потенциальная должность' className='w-[100%]' value={potentialPosition}
					 onChange={(e) => setPotentialPosition(e.target.value)} />
				  <TextField id="1234gagagjj5" label="Зоны для развития" variant="standard"  placeholder='Напишите через запятую' className='w-[100%]'  value={areasDevelop}
					 onChange={(e) => setAreasDevelop(e.target.value)}/>
				  <TextField id="1234afagag5" label="Планируемый срок повышения или ротации" variant="standard"  placeholder='Срок' className='w-[100%]' value={srokPov}
					 onChange={(e) => setSrokPov(e.target.value)} />
			 </div>
		  </Box>

		  <Divider sx={{ my: 3 }} />

		  <Box mb={4}>
			<Typography variant="h6" gutterBottom>
				  Оценка сотрудника и уровень владения компьютером
				</Typography>
			 <div className='flex flex-col gap-[10px]'>
				<TextField id="1afaf2345" label="Уровень владения компьютером" variant="standard" type='number' placeholder='от 0-100' className='w-[100%]' value={compLevel}
					 onChange={(e) => setCompLevel(e.target.value)}/>
				
				  <TextField id="12345a" label="Результаты внутренней аттестации" variant="standard" type='number' placeholder='от 0-100' className='w-[100%]' value={attestationResult}
					 onChange={(e) => setAttestationResult(e.target.value)} />
			 </div>

			 <Box mt={3}>
				<Typography variant="h6" gutterBottom>
				  Участие в проектах и достигнутые результаты:
				</Typography>
				<div className='flex flex-col gap-[20px]'>
					 {projects?.map((project: string, index:number) => (
					 <div key={index} className='flex flex-col  gap-[10px]'>
						<div className='flex items-center gap-[20px]'>
						  <TextField
								fullWidth
								multiline
								rows={5}
								placeholder="Описание проекта и результатов"
								value={project}
                         onChange={(e) => updateProject(index, e.target.value)}
								variant="outlined"
								size="small"
								
							 />
							 <IconButton onClick={() => removeProject(index)} size="small" color="error">
						  <DeleteIcon />
						</IconButton>
						</div>
						
							
					 </div>
					 
				  ))}
					<Button variant="outlined" startIcon={<AddIcon />} onClick={addProject}>
						Добавить проект
					 </Button>
				</div>
				 
				 
			 </Box>
		  </Box>

		  <Divider sx={{ my: 3 }} />

		  {/* Ключевые профессиональные навыки */}
		  <Box mb={4}>
			 <Typography variant="h6" color="black" gutterBottom sx={{ fontWeight: "bold" }}>
				КЛЮЧЕВЫЕ ПРОФЕССИОНАЛЬНЫЕ НАВЫКИ:
			 </Typography>

			 <Box sx={{ mb: 3 }}>
				{ratingLabels?.map((label, index) => (
				  <Typography key={index} variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
					 {label}
				  </Typography>
				))}
			 </Box>

			 <Grid container spacing={2}>
				{professionalSkills?.map((skill, index) => (
				  <Grid item xs={12} key={index}>
					 <Box display="flex" alignItems="center" justifyContent="space-between">
						<TextField
						  value={skill.name}
						  onChange={(e) => {
              const updated = professionalSkills?.map((skill, i) =>
              i === index ? { ...skill, name: e.target.value } : skill );
              setProfessionalSkills(updated);}}

						  variant="outlined"
						  size="small"
						  sx={{ minWidth: 200 }}
						/>
						<Rating
						  value={skill.rating}
						  onChange={(_, value) => handleProfessionalSkillRating(index, value)}
						  max={5}
						  size="large"
						/>
						
						<IconButton onClick={() => removeProfessionalSkill(index)} size="small" color="error">
						  <DeleteIcon />
						</IconButton>
					 </Box>
				  </Grid>
				))}
			 </Grid>

			 <Box mt={2}>
				<Button variant="outlined" startIcon={<AddIcon />} onClick={addProfessionalSkill}>
				  Добавить
				</Button>
			 </Box>
		  </Box>

		</Paper>
	 </Box>
  )
}
