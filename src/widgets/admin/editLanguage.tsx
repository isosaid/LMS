"use client"

import { useEffect, useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Stack,
  IconButton,
} from "@mui/material"
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { InfoAddUser } from '../../shared/types'

interface LanguageEntry {
  id: number
  language: string
  level: string
}

export default function LanguageProficiencyFormEdit({setInfoAddUser, infoAddUser}: any ) { 
  const [languages, setLanguages] = useState<LanguageEntry[]>(infoAddUser?.foreignLang)
  console.log(infoAddUser?.foreignLang);
  
  

    useEffect(() => {
    setInfoAddUser((prev: InfoAddUser) => ({
      ...prev,
      foreignLang: languages,
    }));
  }, [languages, setInfoAddUser]);
  

  const proficiencyLevels = ["A1", "A2", "B1", "B2", "C1", "C2"]

  const handleLanguageChange = (id: number, value: string) => {
    setLanguages((prev) => prev.map((lang) => (lang.id === id ? { ...lang, language: value } : lang)))
  }

  const handleLevelChange = (id: number, level: string) => {
  setLanguages((prev) =>
    prev.map((lang) => (lang.id === id ? { ...lang, level } : lang))
  );
}


  const addLanguage = () => {
    const newId = Date.now()
    setLanguages((prev) => [...prev, { id: newId, language: "", level: "" }])
  }

  const removeLanguage = (id: number) => {
    if (languages.length > 1) {
      setLanguages((prev) => prev.filter((lang) => lang.id !== id))
    }
  }

  return (
    <Paper elevation={0} sx={{ p: 1,  maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: "text.primary",
          textTransform: "uppercase",
          letterSpacing: 0.5,
			 fontSize: '18px'
        }}
      >
        Уровень владения иностранными языками:
      </Typography>

      <Stack spacing={3}>
        {languages?.map((entry) => (
          <Box key={entry.id}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                label="Иностранный язык"
                variant="outlined"
                size="small"
                value={entry.language}
                onChange={(e) => handleLanguageChange(entry.id, e.target.value)}
                sx={{
                  minWidth: 200,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.paper",
                  },
                }}
              />

              <Box sx={{ flex: 1 }}>
                <ToggleButtonGroup
                  value={entry.level}
                  exclusive
                  onChange={(_, newLevel) => {
                    if (newLevel !== null) {
                      handleLevelChange(entry.id, newLevel)
                    }
                  }}
                  size="small"
                  sx={{
                    "& .MuiToggleButton-root": {
                      minWidth: 30,
                      height: 40,
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.secondary",
                      "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    },
                  }}
                >
                  {proficiencyLevels.map((level) => (
                    <ToggleButton key={level} value={level}>
                      {level}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {languages.length > 1 && (
                <IconButton
                  onClick={() => removeLanguage(entry.id)}
                  size="small"
                  sx={{
                    mt: 0.5,
                    color: "error.main",
                    "&:hover": {
                      backgroundColor: "error.light",
                      color: "error.contrastText",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addLanguage}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Добавить
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}
