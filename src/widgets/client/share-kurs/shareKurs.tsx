import { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  InputAdornment,
  Snackbar
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

export default function RecommendCourse({ materialId }: any) {
  const [open, setOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const courseLink = `https://lms.avesto.tj/user/${materialId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(courseLink)
    setOpen(false) 
    setSnackbarOpen(true) 
  }

  return (
    <div>
      {/* Кнопка */}
      <Button variant="contained" sx={{backgroundColor: '#16A34A', color: 'white'}} color="primary" onClick={() => setOpen(true)}>
        Рекомендовать курс
      </Button>

      {/* Модалка */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Рекомендация курса</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={courseLink}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopy}>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{color: '#16A34A'}}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar (уведомление) */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Скопировано!"
      />
    </div>
  )
}
