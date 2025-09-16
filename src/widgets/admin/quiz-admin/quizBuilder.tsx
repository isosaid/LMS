"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  IconButton,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material"
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material"
import { usePostImageMutation } from '../../../entities/files/model/api'
import toast from 'react-hot-toast'

// Зеленая тема
const greenTheme = createTheme({
  palette: {
    primary: { main: "#2e7d32", contrastText: "#fff" },
    secondary: { main: "#4caf50", contrastText: "#fff" },
    success: { main: "#388e3c" },
  },
})

interface Answer {
  text: string
  isCorrect: boolean
  image?: string // теперь хранится ссылка на файл
}

interface Question {
  answerType: "single" | "multiple"
  text: string
  answers: Answer[]
  image?: string // теперь хранится ссылка на файл
}

function QuizBuilder({ setQue }: any) {
  const [postImage] = usePostImageMutation()
  const [questions, setQuestions] = useState<Question[]>([
    {
      answerType: "single",
      text: "",
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ])

  useEffect(() => {
    setQue(questions) // здесь будут ссылки на картинки
  }, [questions, setQue])

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        answerType: "single",
        text: "",
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ])
  }

  const deleteQuestion = (index: number) => {
    if (questions.length > 1) setQuestions(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    setQuestions(prev => prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)))
  }

  const addAnswer = (questionIndex: number) => {
    const newAnswer: Answer = { text: "", isCorrect: false }
    setQuestions(prev =>
      prev.map((q, i) => (i === questionIndex ? { ...q, answers: [...q.answers, newAnswer] } : q))
    )
  }

  const deleteAnswer = (questionIndex: number, answerIndex: number) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === questionIndex && q.answers.length > 2
          ? { ...q, answers: q.answers.filter((_, j) => j !== answerIndex) }
          : q
      )
    )
  }

  const updateAnswer = (questionIndex: number, answerIndex: number, field: keyof Answer, value: any) => {
    setQuestions(prev =>
      prev.map((q, i) => {
        if (i !== questionIndex) return q
        const answers = q.answers.map((a, j) =>
          j === answerIndex
            ? field === "isCorrect" && q.answerType === "single" && value === true
              ? { ...a, isCorrect: true }
              : { ...a, [field]: value }
            : field === "isCorrect" && q.answerType === "single" && value === true
            ? { ...a, isCorrect: false }
            : a
        )
        return { ...q, answers }
      })
    )
  }

  const handleImageUpload = async (
    questionIndex: number,
    answerIndex: number | null,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер изображения должен быть до 5 МБ')
      return
    }

    try {
      const result = await postImage(file).unwrap() // отправляем на сервер
      const fileUrl = result?.url || result // допустим сервер возвращает { url: "..." }
      
      if (answerIndex === null) {
        updateQuestion(questionIndex, "image", fileUrl)
        toast.success('Фото добавлено к вопросу')
      } else {
        updateAnswer(questionIndex, answerIndex, "image", fileUrl)
        toast.success('Фото добавлено к ответу')
      }
    } catch (err) {
      console.error(err)
      toast.error('Ошибка при загрузке изображения')
    }
  }

  const triggerImageUpload = (questionIndex: number, answerIndex: number | null) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "*"
    input.onchange = (e) => handleImageUpload(questionIndex, answerIndex, e as any)
    input.click()
  }

  const removeImage = (questionIndex: number, answerIndex: number | null) => {
    if (answerIndex === null) updateQuestion(questionIndex, "image", undefined)
    else updateAnswer(questionIndex, answerIndex, "image", undefined)
  }

  const moveQuestion = (questionIndex: number, direction: "up" | "down") => {
    if ((direction === "up" && questionIndex === 0) || (direction === "down" && questionIndex === questions.length - 1)) return
    const newQuestions = [...questions]
    const targetIndex = direction === "up" ? questionIndex - 1 : questionIndex + 1
    ;[newQuestions[questionIndex], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[questionIndex]]
    setQuestions(newQuestions)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {questions.map((question, qIndex) => (
        <Paper key={qIndex} sx={{ p: 3, mb: 3, border: "2px solid #e8f5e8" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
              ВОПРОС {qIndex + 1}
            </Typography>
            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <IconButton size="small" onClick={() => moveQuestion(qIndex, "up")} disabled={qIndex === 0}>
                <KeyboardArrowUpIcon sx={{ color: "#4caf50" }} />
              </IconButton>
              <IconButton size="small" onClick={() => moveQuestion(qIndex, "down")} disabled={qIndex === questions.length - 1}>
                <KeyboardArrowDownIcon sx={{ color: "#4caf50" }} />
              </IconButton>
              {questions.length > 1 && (
                <IconButton size="small" onClick={() => deleteQuestion(qIndex)}>
                  <DeleteIcon sx={{ color: "#d32f2f" }} />
                </IconButton>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ minWidth: 100, color: "#2e7d32" }}>Тип ответа:</Typography>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <Select value={question.answerType} onChange={(e) => updateQuestion(qIndex, "answerType", e.target.value)}>
                <MenuItem value="single">Один вариант ответа</MenuItem>
                <MenuItem value="multiple">Несколько вариантов ответа</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Текст вопроса */}
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Текст вопроса"
            value={question.text}
            onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
          />
          {question.image && (
            <Box sx={{ mt: 1, p: 1, border: "1px dashed #4caf50", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography>{question.image}</Typography>
              <IconButton size="small" onClick={() => removeImage(qIndex, null)}>✕</IconButton>
            </Box>
          )}
          <Button startIcon={<ImageIcon />} variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => triggerImageUpload(qIndex, null)}>
            {question.image ? "Изменить файл" : "Прикрепить файл"}
          </Button>

          {/* Ответы */}
          {question.answers.map((answer, aIndex) => (
            <Box key={aIndex} sx={{ mt: 2 }}>
              <TextField fullWidth placeholder={`Ответ ${aIndex + 1}`} value={answer.text} onChange={(e) => updateAnswer(qIndex, aIndex, "text", e.target.value)} />
              {answer.image && (
                <Box sx={{ mt: 1, p: 1, border: "1px dashed #4caf50", borderRadius: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>{answer.image}</Typography>
                  <IconButton size="small" onClick={() => removeImage(qIndex, aIndex)}>✕</IconButton>
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <Button startIcon={<ImageIcon />} variant="outlined" size="small" onClick={() => triggerImageUpload(qIndex, aIndex)}>
                  {answer.image ? "Изменить файл" : "Прикрепить файл"}
                </Button>
                <FormControlLabel
                  control={<Checkbox checked={answer.isCorrect} onChange={(e) => updateAnswer(qIndex, aIndex, "isCorrect", e.target.checked)} />}
                  label="Правильный ответ"
                />
                {question.answers.length > 2 && (
                  <Button variant="text" color="error" size="small" onClick={() => deleteAnswer(qIndex, aIndex)}>
                    ✕ Удалить
                  </Button>
                )}
              </Box>
            </Box>
          ))}

          <Button startIcon={<AddIcon />} variant="text" size="small" sx={{ mt: 2 }} onClick={() => addAnswer(qIndex)}>
            Добавить вариант ответа
          </Button>
        </Paper>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addQuestion} sx={{ textTransform: "none", px: 4, py: 1.5, bgcolor: "green", "&:hover": { bgcolor: "#1b5e20" }, borderRadius: 3 }}>
          Добавить Вопрос
        </Button>
      </Box>
    </Container>
  )
}

export default function Page({ setQue }: any) {
  return (
    <ThemeProvider theme={greenTheme}>
      <CssBaseline />
      <QuizBuilder setQue={setQue} />
    </ThemeProvider>
  )
}
