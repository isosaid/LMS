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
import { InfoAddDolzhnost } from "../../../shared/types"

interface PersonalQuality {
  name: string
  rating: number
}

interface ProfessionalSkill {
  skill: string
  grade: number
}

interface CompForAddDolzhnostProps {
  setInfoAddUser: React.Dispatch<React.SetStateAction<InfoAddDolzhnost>>
}

export default function CompForAddDolzhnost({ setInfoAddUser }: CompForAddDolzhnostProps) {
  const [personalQualities, setPersonalQualities] = useState<PersonalQuality[]>([
    { name: "Честность", rating: 0 },
    { name: "Ответственность", rating: 0 },
    { name: "Гибкость", rating: 0 },
    { name: "Эмпатия", rating: 0 },
  ])

  const [professionalSkills, setProfessionalSkills] = useState<ProfessionalSkill[]>([
    { skill: "Навык 1", grade: 0 },
    { skill: "Навык 2", grade: 0 },
  ])

  const [attestationResult, setAttestationResult] = useState<number | "">("")
  const [compLevel, setCompLevel] = useState<number | "">("")

  const ratingLabels = [
    "1 – Очень низкий уровень (не обнаружено)",
    "2 – Низкий уровень (проявляется редко)",
    "3 – Средний уровень (происходит периодически)",
    "4 – Высокий уровень (проявляется стабильно)",
    "5 – Очень высокий уровень (проявляется постоянно)",
  ]


  useEffect(() => {
  setInfoAddUser((prev) => ({
    ...prev,
    personalQual: {
      honesty: personalQualities[0]?.rating || 0,
      responsibility: personalQualities[1]?.rating || 0,
      flexibility: personalQualities[2]?.rating || 0,
      empathy: personalQualities[3]?.rating || 0,
    },
    professionalSkills: professionalSkills.map((s) => ({ skill: s.skill, grade: s.grade })),
    сompEduLevel: typeof compLevel === "number" ? compLevel : 0,
    emploEvalu: typeof attestationResult === "number" ? attestationResult : 0,
  }))
}, [personalQualities, professionalSkills, compLevel, attestationResult, setInfoAddUser])


  const handlePersonalQualityRating = (index: number, value: number | null) => {
    setPersonalQualities((prev) =>
      prev.map((q, i) => (i === index ? { ...q, rating: value || 0 } : q))
    )
  }

  const handleProfessionalSkillRating = (index: number, value: number | null) => {
  setProfessionalSkills((prev) =>
    prev.map((s, i) => (i === index ? { ...s, grade: value || 0 } : s)) 
  )
}

  const handleProfessionalSkillNameChange = (index: number, value: string) => {
    setProfessionalSkills((prev) =>
      prev.map((s, i) => (i === index ? { ...s, skill: value } : s))
    )
  }

  const addProfessionalSkill = () => {
    setProfessionalSkills((prev) => [
      ...prev,
      { skill: `Навык ${prev.length + 1}`, grade: 0 },
    ])
  }

  const removeProfessionalSkill = (index: number) => {
    setProfessionalSkills((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 0 }}>
      <Paper elevation={0} sx={{ p: 1 }}>
        {/* Личные качества */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
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
            {personalQualities.map((quality, index) => (
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
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Компьютерные навыки и аттестация */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Оценка сотрудника и уровень владения компьютером
          </Typography>
          <Box className="flex flex-col gap-[10px]">
            <TextField
              label="Уровень владения компьютером"
              variant="standard"
              type="number"
              placeholder="от 0-100"
              value={compLevel}
              onChange={(e) => setCompLevel(e.target.value === "" ? "" : Number(e.target.value))}
              fullWidth
            />
            <TextField
              label="Результаты внутренней аттестации"
              variant="standard"
              type="number"
              placeholder="от 0-100"
              value={attestationResult}
              onChange={(e) => setAttestationResult(e.target.value === "" ? "" : Number(e.target.value))}
              fullWidth
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Профессиональные навыки */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            КЛЮЧЕВЫЕ ПРОФЕССИОНАЛЬНЫЕ НАВЫКИ:
          </Typography>

          <Box sx={{ mb: 3 }}>
            {ratingLabels.map((label, index) => (
              <Typography key={index} variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                {label}
              </Typography>
            ))}
          </Box>

          <Grid container spacing={2}>
            {professionalSkills.map((skill, index) => (
              <Grid item xs={12} key={index}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <TextField
                    value={skill.skill}
                    onChange={(e) => handleProfessionalSkillNameChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 200 }}
                  />
                  <Rating
                    value={skill.grade}
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
