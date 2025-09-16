"use client"

import type React from "react"

import { useState } from "react"
import { Modal, Box, Typography, Button, Paper, IconButton, TextField } from "@mui/material"
import { VideoLibrary, Close } from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useAddVideoMaterialsMutation } from '../../../entities/materials/model/api'
import { usePostImageMutation } from '../../../entities/files/model/api'
import toast from 'react-hot-toast'

const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      dark: "#388e3c",
      light: "#81c784",
    },
  },
})

interface VideoUploadModalProps {
  open: boolean
  params: any
  onClose: () => void
}

export default function VideoUploadModal({ open, onClose, params}: VideoUploadModalProps) {
  const [postImage, {data: imageData}]=usePostImageMutation()
  const [handleLink, setHandleLink]=useState('')
  const [addVideoMaterials]=useAddVideoMaterialsMutation()
  console.log(params.id);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        
        if (!file) return;
    
        if (file.size > 5 * 1024 * 1024) {
          toast.error('Размер изображения должен быть до 5 МБ');
          return;
        }
    
        try {
          await postImage(file).unwrap();
          toast.success('Файл успешно загружен');
        } catch (err) {
          toast.error('Ошибка при загрузке');
          console.error(err);
        }
      };
  



  const handleSave = async () => {
    const newVideo={ 
     "id": Date.now(),
     "coverImg": imageData?.url,
     "videoUrl": handleLink
}  
 try {
   await addVideoMaterials({materialId: params.id, body: newVideo}).unwrap()
   toast.success('Видео добавлено успешно ')
    onClose()
    setHandleLink('')
 } catch (error) {
  console.error(error);
  toast.error('Не удалось добавить видео')
 }
    
  }

  return (
    <ThemeProvider theme={greenTheme}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="video-upload-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VideoLibrary sx={{ color: "text.secondary" }} />
              <Typography variant="h6" id="video-upload-title" sx={{ fontWeight: 500 }}>
                ВИДЕО
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleSave}
                sx={{
                  color: "white",
                  letterSpacing:'2px',
                  borderColor: "#e0e0e0",
                  bgcolor: "green",

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
            {/* Video File Upload */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Typography variant="body1" sx={{ minWidth: 100 }}>
                  Файл видео:
                </Typography>
                <TextField id="outlined-basic" label="Введите ссылку на видео" variant="outlined" sx={{width: '100%'}} value={handleLink} onChange={(e)=>setHandleLink(e.target.value)}/>
              </Box>

            </Box>

            {/* Cover Upload */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1" sx={{ minWidth: 100 }}>
                  Обложка:
                </Typography>
                <input
                  accept="image/*"
                  id="cover-upload-button"
                  type="file"
                  onChange={handleFileChange}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </ThemeProvider>
  )
}
