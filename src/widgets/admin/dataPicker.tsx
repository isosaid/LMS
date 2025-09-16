import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Props } from '../../shared/types'

export default function GreenOutlineDatePicker({ name, setInfoAddUser, infoAddUser }: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  React.useEffect(() => {
    const dateString = name === 'Дата рождения' 
      ? infoAddUser?.birthday || ''
      : infoAddUser?.preWorkExperience?.openDate || '';

    const parsed = dayjs(dateString, 'DD.MM.YYYY');
    if (parsed.isValid()) {
      setValue(parsed);
    } else {
      setValue(null);
    }
  }, [infoAddUser, name]);

  const handleChange = (newValue: unknown) => {
  const dayjsValue = newValue as Dayjs | null;
  setValue(dayjsValue);

  if (!dayjsValue) return;

  if (name === 'Дата рождения') {
    setInfoAddUser(prev => ({
      ...prev,
      birthday: dayjsValue.format('DD.MM.YYYY')
    }));
  } else {
    setInfoAddUser(prev => ({
      ...prev,
      preWorkExperience: {
        ...prev.preWorkExperience,
        openDate: dayjsValue.format('DD.MM.YYYY')
      },
    }));
  }
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={name}
        value={value}
        onChange={handleChange}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            sx: {
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green',
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}