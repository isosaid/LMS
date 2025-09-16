// components/FilterComponent.tsx
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface FilterComponentProps {
  label: string;
  options: string[];
  setChoose: (value: string) => void;
  choose: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ label, options, choose, setChoose }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setChoose(event.target.value as string);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${label}-select-label`} className="-mt-2">{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={choose}
        onChange={handleChange}
        sx={{
          height: '40px',
          '.MuiOutlinedInput-input': {
            paddingTop: '8px',
            paddingBottom: '8px',
          }
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,  
              maxWidth: 200,   
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              maxWidth: 300,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterComponent;
