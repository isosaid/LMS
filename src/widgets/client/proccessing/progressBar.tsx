import type React from "react"
import ProgressBar from "../../../shared/ui/proccessing"
import { Container, Box } from "@mui/material"

// Example function to simulate fetching progress from server
const fetchProgressFromServer = async (): Promise<number> => {
  // In a real application, this would be an API call
  // For demo purposes, we'll simulate a server response with a random progress value
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random progress between 0 and 100
      // In a real app, this would be the actual progress from your server
      const progress = 0
      resolve(progress)
    }, 0)
  })
}

const BarComponent: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 0, mx: 0, width: '100%' }}>
        <ProgressBar
          initialValue={10}
          fetchProgressData={fetchProgressFromServer}
          pollingInterval={0} 
        />
      </Box>
    </Container>
  )
}

export default BarComponent
