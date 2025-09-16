"use client"

import React, { useState } from "react"
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Paper,
  Divider,
} from "@mui/material"
import ModalShowInfo from "./modalForShow"
import { Position } from '../../../shared/types'

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  outline: "none",
}

export default function AIRecommendationModal({ data }: any) {
  const [open, setOpen] = useState(false)
  const [openShow, setOpenShow] = useState(false)
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(
    null
  )

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handlePositionSelect = (positionId: number) => {
    setSelectedPositionId(positionId)
  }

  const handleGenerate = () => {
    if (selectedPositionId) {
      setOpenShow(true)
    }
  }
  const handleCloseShow = () => {
  setOpenShow(false)
  setSelectedPositionId(null) 
}

  return (
    <div>
      {/* Кнопка с картинкой */}
      <div
        className="flex fixed top-[610px] right-[30px] items-center justify-end"
        onClick={handleOpen}
      >
        <div className="hover:p-[3px] transition-all duration-200 ease-in-out border-2 hover:shadow-lg border-blue-400 rounded-full">
          <img
            src="/pages/client/3504299a0b3ae1812d5a283dc483cab795315c05.png"
            alt="Ai"
            className="w-[100px]"
          />
        </div>
      </div>

      {/* Основное модальное окно */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="ai-recommendation-title"
        aria-describedby="ai-recommendation-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="ai-recommendation-title"
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{ mb: 3, fontWeight: 500 }}
          >
            Рекомендация от ИИ
          </Typography>

          <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
            Выберите ключевую должность:
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              mb: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <List
              sx={{
                p: 0,
                height: "400px",
                overflow: "auto",
              }}
            >
              {data?.map((position: Position, index: number) => (
                <React.Fragment key={position.id}>
                  <ListItem
                    disablePadding
                    sx={{ borderBottom: "1px solid lightgray" }}
                  >
                    <ListItemButton
                      selected={selectedPositionId === position.id}
                      onClick={() => handlePositionSelect(position.id)}
                      sx={{
                        py: 1.5,
                        "&.Mui-selected": {
                          backgroundColor: "green",
                          color: "primary.contrastText",
                          "&:hover": {
                            backgroundColor: "#00C618",
                          },
                        },
                      }}
                    >
                      <ListItemText
                        primary={position.position}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontSize: "0.95rem",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < data.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={handleGenerate}
              disabled={!selectedPositionId}
              sx={{
                px: 4,
                py: 1,
                borderColor: "green",
                color: "green",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Сгенерировать
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Модалка для показа информации */}
      <ModalShowInfo
  openShow={openShow}
  positionId={selectedPositionId}
  setOpenShow={handleCloseShow}
/>
    </div>
  )
}
