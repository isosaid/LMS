import { Box, CircularProgress, Typography } from '@mui/material';

export const CircularProgressWithLabel = ({ value }: { value: number }) => {
  const getColor = (val: number) => (val > 0 ? '#3EA458' : '#d3d3d3'); // основной цвет прогресса
  const bgColor = '#e0e0e0'; // цвет "фона" круга

  return (
    <Box position="relative" display="inline-flex" flexDirection="column" alignItems="center">
      {/* Фоновый круг */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={150}
        thickness={3}
        sx={{
          color: bgColor,
          position: 'absolute',
        }}
      />

      {/* Основной прогресс */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={150}
        thickness={3}
        sx={{
          color: getColor(value),
        }}
      />

      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      />

      <Typography
        variant="body2"
        color="textSecondary"
        letterSpacing={'1px'}
        fontWeight={'bold'}
        textAlign="center"
        mt={1}
      >
        {`${Math.round(value)} %`} <br />
        Общий результат
      </Typography>
    </Box>
  );
};
