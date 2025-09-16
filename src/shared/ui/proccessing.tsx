"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, LinearProgress } from "@mui/material"

interface ProgressBarProps {
  // Initial value for the progress
  initialValue?: number
  // Function to fetch progress data from server
  fetchProgressData?: () => Promise<number>
  // Polling interval in milliseconds (default: 5000ms)
  pollingInterval?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ initialValue = 0, fetchProgressData, pollingInterval = 5000 }) => {
  const [progress, setProgress] = useState<number>(initialValue)

  useEffect(() => {
    // If no fetch function is provided, just use the initial value
    if (!fetchProgressData) return

    // Function to fetch and update progress
    const updateProgress = async () => {
      try {
        const newProgress = await fetchProgressData()
        setProgress(newProgress)
      } catch (error) {
        console.error("Error fetching progress data:", error)
      }
    }

    // Initial fetch
    updateProgress()

    // Set up polling interval
    const intervalId = setInterval(updateProgress, pollingInterval)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [fetchProgressData, pollingInterval])

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 20,
          borderRadius: 10,
          backgroundColor: "#E0E0E0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#4CAF50",
            borderRadius: 10,
          },
        }}
      />
      <div className='flex justify-between items-center'>
        <p> {progress}%  Завершено</p>
      </div>
    </Box>
  )
}

export default ProgressBar
