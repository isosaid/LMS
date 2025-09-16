"use client"

import React, { useEffect, useState } from "react"
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  Fade,
  Grow,
  Slide,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { ru } from "date-fns/locale"

// Styled components
const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}))

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}))

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#4caf50",
  },
})

// Language levels
const languageLevels = ["A1", "A2", "B1", "B2", "C1", "C2"]

export default function EmployeeProfileForm({data}: any) {  
 const [certificates, setCertificates] = useState<any[]>([]);

useEffect(() => {
  if (data?.docName) {
    setCertificates(data.docName);
  }
}, [data]);

 
 
  
 const qualitiesList = [
  { label: "Честность", key: "honesty" },
  { label: "Ответственность", key: "responsibility" },
  { label: "Гибкость", key: "flexibility" },
  { label: "Эмпатия", key: "empathy" },
];

 let cnt=1;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Box sx={{ maxWidth: 1400, margin: "20px 0px auto", padding: 0 }}>
        <Fade in={true} timeout={1000}>
          <SectionPaper>
           <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>
              1. ОБЩАЯ ИНФОРМАЦИЯ
              </SectionTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
  label="Дата рождения"
  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
  variant="outlined"
  defaultValue={data?.birthday}
  placeholder="DD.MM.YYYY"
  InputProps={{
    readOnly: true,
}}
/>


              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Контактные данные:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
              fullWidth
         label="Телефон"
         InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
         variant="outlined"
          value={`+992 ${data?.tel}`  }
          placeholder="nomer"
         InputProps={{
         readOnly: true,
         }}
/>
              </Grid>
              <Grid item xs={12} sm={6}>
                 <TextField
              fullWidth
  label="Email"
  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
  variant="outlined"
  defaultValue={data?.email}
  placeholder="DD.MM.YYYY"
  type='email'
  InputProps={{
    readOnly: true,
}}
/>
              </Grid>
              <Grid item xs={12}>
                <TextField
              fullWidth
  label="Адресс проживания"
  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
  variant="outlined"
  defaultValue={data?.address}
  placeholder="Address"
  InputProps={{
    readOnly: true,
}}
/>
              </Grid>
            </Grid>
          </SectionPaper>
        </Fade>

        <Grow in={true} timeout={1500}>
          <SectionPaper>
            <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>2. ОБРАЗОВАНИЕ</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
              fullWidth
  label="Уровень образования"
  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
  variant="outlined"
  value={data?.education}
  placeholder=""
  InputProps={{
    readOnly: true,
}}
/>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
              fullWidth
  label="Учебные заведения"
  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
  variant="outlined"
  value={data?.eduInstitution}
  placeholder=""
  InputProps={{
    readOnly: true,
}}
/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Специальность" variant="outlined"
                placeholder='Специальность' 
                value={data?.speciality}
                InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Годы обучения" variant="outlined" placeholder="ГГГГ - ГГГГ" value={data?.yearsOfStudy} InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Дополнительное образование:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Курсы" variant="outlined" placeholder="ГГГГ - ГГГГ" value={data?.courses?.join(', ') || ' '}  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Тренинги" variant="outlined" placeholder="ГГГГ - ГГГГ" value={data?.trainings?.join(', ') || ' '}  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Программы" variant="outlined" placeholder="ГГГГ - ГГГГ" value={data?.programs?.join(', ') || ' '} InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Сертификаты и дипломы:
                </Typography>
              </Grid>

              {certificates?.map((cert, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Наименование"
                      variant="outlined"
                      value={cert.name}
                      onChange={(e) => {
                        const newCertificates = [...certificates]
                        newCertificates[index].name = e.target.value
                        setCertificates(newCertificates)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Дата"
                      variant="outlined"
                      value={cert.dateReceived}
                      onChange={(e) => {
                        const newCertificates = [...certificates]
                        newCertificates[index].name = e.target.value
                        setCertificates(newCertificates)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={1} sx={{ display: "flex", alignItems: "center" }}>
                    {/* <IconButton onClick={() => removeCertificate(index)} color="error">
                      <RemoveIcon />
                    </IconButton> */}
                  </Grid>
                </React.Fragment>
              ))}


            </Grid>
          </SectionPaper>
        </Grow>

        <Slide direction="right" in={true} timeout={2000}>
          <SectionPaper>
            <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>3. ОПЫТ РАБОТЫ</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                 <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
  label="Опыт работы"
  variant="outlined"
  value={data?.lengtWork}
  placeholder=""
  InputProps={{
    readOnly: true,
}}
/>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Предыдущие места работы:
                </Typography>
              </Grid>

                <React.Fragment >
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Компания"
                      InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
                      variant="outlined"
                      value={data?.preWorkExperience?.com}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Должность"
                      InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
                      variant="outlined"
                      value={data?.preWorkExperience?.pos}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Дата работы"
                      sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }} 
  InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
                      variant="outlined"
                      placeholder="ГГГГ - ГГГГ"
                      value={data?.preWorkExperience?.openDate}
                    />
                  </Grid>

                </React.Fragment>

              <Grid item xs={12}>

              </Grid>
            </Grid>
          </SectionPaper>
        </Slide>

        <Fade in={true} timeout={2500}>
          <SectionPaper>
            <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>УРОВЕНЬ ВЛАДЕНИЯ ИНОСТРАННЫМИ ЯЗЫКАМИ:</SectionTitle>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Иностранный язык</TableCell>
                    {languageLevels.map((level) => (
                      <TableCell key={level} align="center">
                        {level}
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.foreignLang?.map((lang: any , index : any) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          value={lang.language}
                        />
                      </TableCell>
                      {languageLevels.map((level) => (
                        <TableCell key={level} align="center">
                          <input
                            type="radio"
                            name={`lang-${index}`}
                            checked={lang.level === level}
                            readOnly 
                          />
                        </TableCell>
                      ))}
                      <TableCell>
                 
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
          </SectionPaper>
        </Fade>

        <Grow in={true} timeout={3000}>
          <SectionPaper>
            <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>УРОВЕНЬ ВЛАДЕНИЯ КОМПЬЮТЕРОМ:</SectionTitle>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ mr: 2 }}>{data?.CompEduLevel} % </Typography>
              <StyledRating max={10} value={typeof data?.CompEduLevel === "number" ? data.CompEduLevel / 10 : 0}
size="large" />
              <Typography sx={{ ml: 2 }}>100</Typography>
            </Box>
          </SectionPaper>
        </Grow>

        <Slide direction="left" in={true} timeout={3500}>
          <SectionPaper>
            <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>КЛЮЧЕВЫЕ ЛИЧНЫЕ КАЧЕСТВА:</SectionTitle>
            <TableContainer>
        <Table>
        <TableHead>
        <TableRow>
        <TableCell></TableCell>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TableCell key={rating} align="center">{rating}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {qualitiesList.map(({ label, key }) => (
        <TableRow key={key}>
          <TableCell>{label}</TableCell>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TableCell key={rating} align="center">
              <input
                type="radio"
                name={`quality-${key}`}
                value={rating}
                checked={data?.personalQual?.[key] === rating}
                readOnly
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
              1 - низкий уровень | 5 - высокий уровень (без оценочного суждения)
            </Typography>
          </SectionPaper>
        </Slide>

        <Fade in={true} timeout={4000}>
          <SectionPaper>
            <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>ПОТЕНЦИАЛ ДЛЯ РОСТА:</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                value={data?.potentialPos}
    fullWidth
    label="Потенциальные должности в компании"
    variant="outlined"
    InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
/>


              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                value={data?.AreasDevelop?.join(', ')}
    fullWidth
    label="Зоны для развития"
    variant="outlined"
    InputLabelProps={{ shrink: true }}
     slotProps={{
    input: {
      readOnly: true,
    },
  }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                value={data?.PlanDatePromRota
}
    fullWidth
    label="Планируемые сроки повышения или ротации"
    variant="outlined"
    InputLabelProps={{ shrink: true }}
     InputProps={{ readOnly: true }}
    sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }}
/>
              </Grid>
            </Grid>
          </SectionPaper>
        </Fade>

        <Grow in={true} timeout={4500}>
          <SectionPaper>
            <SectionTitle variant="h6" sx={{ color: "#4caf50" }}>ОЦЕНКА СОТРУДНИКА</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12}>
               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ mr: 2 }}>{data?.emploEvalu} % </Typography>
              <StyledRating max={10} value={typeof data?.emploEvalu === "number" ? data?.emploEvalu / 10 : 5}
             size="large" />
              <Typography sx={{ ml: 2 }}>100</Typography>
            </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Отзыв руководителя:
                </Typography>
                <TextField fullWidth label="Отзыв 1" variant="outlined" multiline rows={1} sx={{ mb: 2 }} />
                <TextField fullWidth label="Отзыв 2" variant="outlined" multiline rows={1} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Участие в проектах и достигнутые результаты:
                </Typography>
                {
                  data?.projects?.map((project: any, index: number)=>{
                    return <TextField fullWidth key={project.id || index}  label={`Project ${cnt++}`} value={project} variant="outlined" multiline rows={1} sx={{
                      mb: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3EA458",
      },
      "&:hover fieldset": {
        borderColor: "#3EA458", // чтобы при ховере цвет не менялся
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3EA458", // убрать визуальный эффект фокуса, но цвет оставить
        boxShadow: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3EA458", // лейбл всегда зелёный
    },
  }} />
                  })
                }
              </Grid>
            </Grid>
          </SectionPaper>
        </Grow>
      </Box>
    </LocalizationProvider>
  )
}
