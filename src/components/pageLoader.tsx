import { Box, CircularProgress, Typography } from '@mui/material'

export function CircularLoader() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: 'background.default'
    }}>
      <CircularProgress size={60} thickness={4} sx={{color: '#16a34a'}}/>
      <Typography variant="h6" sx={{ ml: 3, color: '#16a34a'}}>
        Загрузка приложения...
      </Typography>
    </Box>
  )
}

export function ModalLoader() {
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <CircularProgress 
  size={60} 
  thickness={4} 
/>
    </Box>
  )
}