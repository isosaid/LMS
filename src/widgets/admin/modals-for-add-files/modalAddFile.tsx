"use client"

import type React from "react"
import { useState } from "react"
import { Modal, Box, Typography, Button, Paper, IconButton, TextField } from "@mui/material"
import { Description, Close, CloudUpload } from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useAddFileMaterialsMutation } from '../../../entities/materials/model/api'
import { usePostDocumentMultipleMutation } from '../../../entities/files/model/api'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'

const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      dark: "#388e3c",
      light: "#81c784",
    },
  },
})

interface FileUploadModalProps {
  open: boolean
  onClose: () => void
}

interface CustomFile{
  id:number
}




export default function FileUploadModal({ open, onClose }: FileUploadModalProps) {
  const [description, setDescription] = useState("")
  const params = useParams()
  const [files, setFiles] = useState<File[]>([])
  const [postDocumentMultiple, { data: multipleFiles }] = 
  usePostDocumentMultipleMutation()

  const [addFileMaterials] = useAddFileMaterialsMutation()

  const maxFiles = 100
  const maxSize = 300 * 1024 * 1024 // 300 MB

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles)
      .filter(file => {
        if (file.size > maxSize) {
          toast.error(`Файл "${file.name}" превышает 300 МБ и не будет добавлен`)
          return false
        }
        return true
      })
      .slice(0, maxFiles - files.length) // чтобы не превышать лимит 100

    if (newFiles.length === 0) {
      event.target.value = ""
      return
    }

    try {
      await postDocumentMultiple(newFiles).unwrap()
      toast.success('Файлы успешно добавлены')
      setFiles(prev => [...prev, ...newFiles])
    } catch (error) {
      console.error(error)
      toast.error('Не удалось загрузить файлы')
    }

    event.target.value = ""
  }

  const handleSave = async () => {
  // Более чистая проверка
  if ((!multipleFiles as any)?.files?.files?.length) {
    toast.error('Нет файлов для сохранения')
    return
  }

  try {
    if (!params.id) {
      toast.error("Не найден параметр id в URL")
      return
    }

    await addFileMaterials({
      materialId: params.id,
      body: {
        filesDesc: description,
        filesId: (multipleFiles as any)?.files?.map((file: CustomFile) => file.id) || [],
      },
    }).unwrap()

    toast.success('Файлы успешно добавлены')
    setDescription('')
    setFiles([])
    onClose() 
  } catch (error) {
    console.error(error)
    toast.error('Не удалось сохранить файлы')
  }
}

  return (
    <ThemeProvider theme={greenTheme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="file-upload-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper sx={{ width: "90%", maxWidth: 600, bgcolor: "background.paper", borderRadius: 1, boxShadow: 24, overflow: "hidden" }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Description sx={{ color: "text.secondary" }} />
              <Typography variant="h6" id="file-upload-title" sx={{ fontWeight: 500 }}>
                ФАЙЛ
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleSave}
                sx={{ color: "text.secondary", borderColor: "#e0e0e0", bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#eeeeee", borderColor: "#d0d0d0" }, textTransform: "none" }}
              >
                Сохранить
              </Button>
              <IconButton onClick={onClose} size="small">
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {/* Description Field */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Typography variant="body1" sx={{ minWidth: 80, mt: 1 }}>Описание:</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Введите подробное описание (до 1024 знаков)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{ maxLength: 1024 }}
                  sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(0, 0, 0, 0.23)" }, "&:hover fieldset": { borderColor: "rgba(0, 0, 0, 0.87)" }, "&.Mui-focused fieldset": { borderColor: "primary.main" } } }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 10, display: "block", mt: 0.5 }}>
                {description.length}/1024 знаков
              </Typography>
            </Box>

            {/* File Upload */}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <input
                accept="*/*"
                style={{ display: "none" }}
                id="file-upload-button"
                type="file"
                multiple
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload-button">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={{ bgcolor: "primary.main", color: "white", textTransform: "none", px: 3, py: 1, "&:hover": { bgcolor: "primary.dark" } }}
                >
                  Загрузить файлы
                </Button>
              </label>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 300 }}>
                Можно загружать файлы размером до 300 МБ. Максимальное кол-во файлов 100
              </Typography>
            </Box>

            {/* Selected Files Display */}
            {files.length > 0 && (
              <Box sx={{ mt: 2, ml: 10 }}>
                <Typography variant="body2" color="primary.main" sx={{ mb: 1 }}>
                  Выбрано файлов: {files.length}
                </Typography>
                <Box sx={{ maxHeight: 100, overflow: "auto" }}>
                  {files.map((file, index) => (
                    <Typography key={file.name + index} variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} МБ)
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>
    </ThemeProvider>
  )
}
