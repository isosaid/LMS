"use client"

import type React from "react"
import { useState } from "react"
import { Modal, Box, Typography, Button, Paper, IconButton } from "@mui/material"
import { Slideshow, Close, Add, Delete } from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { usePostDocumentMultipleMutation } from '../../../entities/files/model/api'
import toast from 'react-hot-toast'
import { useAddPresentMaterialsMutation } from '../../../entities/materials/model/api'
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

interface PresentationUploadModalProps {
  open: boolean
  onClose: () => void
}

interface CustomFile{
  id: number | string
}

export default function PresentationUploadModal({ open, onClose }: PresentationUploadModalProps) {
  const params = useParams()  
  const [presentationFiles, setPresentationFiles] = useState<File[]>([])
  const [postDocumentMultiple, {data: multipleDocument}] = usePostDocumentMultipleMutation()
  const [addPresentMaterials] = useAddPresentMaterialsMutation()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const allowedExtensions = [".ppt", ".pptx", ".pps", ".ppsx", ".odp", ".key"]
    const maxSize = 200 * 1024 * 1024 // 200 MB

    const newFiles = Array.from(files).filter((file) => {
      const isValidExtension = allowedExtensions.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )
      const isValidSize = file.size <= maxSize
      if (!isValidSize) {
        toast.error(`Файл "${file.name}" превышает 200 МБ и не будет добавлен`)
      }
      if (!isValidExtension) {
        toast.error(`Файл "${file.name}" имеет недопустимый формат`)
      }
      return isValidExtension && isValidSize
    })

    if (newFiles.length === 0) {
      event.target.value = ""
      return
    }

    try {
      await postDocumentMultiple(newFiles).unwrap()
      toast.success('Файлы успешно добавлены на сервер')
      setPresentationFiles((prev) => [...prev, ...newFiles])
    } catch (error) {
      console.error(error)
      toast.error('Не удалось добавить файлы на сервер')
    }

    event.target.value = ""
  }

  const handleRemoveFile = (indexToRemove: number) => {
    setPresentationFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleSave = async () => {
    if ((!multipleDocument as any).files || (multipleDocument as any)?.files?.length === 0) {
      toast.error('Нет файлов для сохранения')
      return
    }

    try {
      await addPresentMaterials({
        materialId: params.id,
        body: {
  "presentationsId": (multipleDocument as any).files.map((file: CustomFile)=> file.id)
} 
      }).unwrap()
      toast.success('Презентации успешно добавлены')
    } catch (error) {
      console.error(error)
      toast.error('Не удалось добавить презентации')
    }

    console.log("Presentation files:", presentationFiles)
    onClose()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <ThemeProvider theme={greenTheme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="presentation-upload-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}
      >
        <Paper sx={{ width: "90%", maxWidth: 600, bgcolor: "background.paper", borderRadius: 1, boxShadow: 24, overflow: "hidden" }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Slideshow sx={{ color: "text.secondary" }} />
              <Typography variant="h6" id="presentation-upload-title" sx={{ fontWeight: 500 }}>
                Презентации
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleSave}
                sx={{
                  borderColor: "#e0e0e0",
                  bgcolor: "green",
                  color: 'white',
                  textTransform: "none",
                }}
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
            {/* File Upload */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Typography variant="body1" sx={{ minWidth: 80 }}>
                  Файлы:
                </Typography>
                <input
                  accept=".ppt,.pptx,.pps,.ppsx,.odp,.key"
                  style={{ display: "none" }}
                  id="presentation-upload-button"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                />
                <label htmlFor="presentation-upload-button">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<Add />}
                    sx={{
                      color: "primary.main",
                      borderColor: "primary.main",
                      textTransform: "none",
                      "&:hover": { bgcolor: "rgba(76, 175, 80, 0.04)" },
                    }}
                  >
                    Добавить
                  </Button>
                </label>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 10 }}>
                Форматы: .ppt, .pptx, .pps, .ppsx, .odp, .key | Макс. размер: 200 МБ
              </Typography>
            </Box>

            {/* Selected Files */}
            {presentationFiles.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                  Выбранные файлы:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {presentationFiles.map((file, index) => (
                    <Box
                      key={file.name + index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        border: 1,
                        borderColor: "primary.light",
                        borderRadius: 1,
                        bgcolor: "rgba(76, 175, 80, 0.04)",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatFileSize(file.size)}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(index)}
                        sx={{ color: "error.main", "&:hover": { bgcolor: "rgba(244, 67, 54, 0.04)" } }}
                        title="Удалить файл"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mt: 2, p: 1, bgcolor: "rgba(76, 175, 80, 0.08)", borderRadius: 1 }}>
                  <Typography variant="caption" color="primary.main">
                    Всего файлов: {presentationFiles.length} | Общий размер:{" "}
                    {formatFileSize(presentationFiles.reduce((total, file) => total + file.size, 0))}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Empty State */}
            {presentationFiles.length === 0 && (
              <Box sx={{ mt: 2, p: 4, border: 2, borderStyle: "dashed", borderColor: "grey.300", borderRadius: 1, textAlign: "center", bgcolor: "grey.50" }}>
                <Slideshow sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Файлы не выбраны
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Нажмите "Добавить" чтобы выбрать презентации
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Modal>
    </ThemeProvider>
  )
}
