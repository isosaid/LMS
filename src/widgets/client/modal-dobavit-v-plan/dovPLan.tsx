"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  TextField,
} from "@mui/material"
import { useAddToPlanMaterialsMutation } from '../../../entities/materials/model/api'
import toast from 'react-hot-toast'

// Create a green theme
const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
  },
})



export default function MonthSelectorModal({productId, materialExists}: any) {
  const [open, setOpen] = useState(false)
  const [date, setDate]=useState('')
  const [addToPlanMaterials]=useAddToPlanMaterialsMutation()   
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  const handleAddToPlan = async () => {
    try {
      await addToPlanMaterials({
        materialId: productId.id,
        deadline: date
      }).unwrap()
      handleClose()
      toast.success('Курс успешно добавлен в план')
      setDate('')
    } catch (error) {
      console.error(error);
      toast.error('Не удалось добавить курс в свой план')
      
    }
  }



  return (
    <>
    { materialExists == false && (
      <ThemeProvider theme={greenTheme}>
      <div style={{ width: "90%" }}>
        {/* Button to open modal */}
        <Button
  variant="contained"
  sx={{
    backgroundColor: "#4caf50", 
    color: "white",
	 textTransform: 'none',
	 fontSize: '18px',
	 letterSpacing:'1px',
	 width: '100%',
    '&:hover': {
      backgroundColor: "#43a047",
    }
  }}
  onClick={handleOpen}
>
 Добавить в план 
         </Button>
         
        

        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "24px",
              padding: "16px",
              backgroundColor: "#fafafa",
            },
          }}
        >

          <DialogContent sx={{ pt: 1 }}> 
            <div className='py-[30px]'>
              <TextField
  label="Дата"
  type="date"
  sx={{
    width: '100%',
  }}
  InputLabelProps={{
    shrink: true,
  }}
  value={date}
  onChange={(e)=> setDate(e.target.value)}
/>
            </div>
            

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToPlan}
                sx={{
                  borderRadius: "12px",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: 500,
						color: 'white',
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                  "&:disabled": {
                    backgroundColor: "#cccccc",
                  },
                }}
              >
                Добавить в план
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
    )}
    </>
    
    
  )
}
