import  { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast'
import { usePostDocumentMutation } from '../../entities/files/model/api'
import { InfoAddUser } from '../../shared/types'

export default function MultipleFileUploadWithRemove({value, setInfoAddUser}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
    const [postDocument, {data: documentData}] = usePostDocumentMutation()
  const [file, setFile] = useState<File | null>(null);

  
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();

  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
        if (file) {
       setFile(file);
      }
        
        if (!file) return;
      
        if (file.size > 5 * 1024 * 1024) {
          alert('Размер изображения должен быть до 5 МБ');
          return;
        }
      
        try {
          await postDocument(file).unwrap();
          toast.success('Файл успешно загружен');
          console.log(documentData);
          
        } catch (err) {
          toast.error('Ошибка при загрузке');
          console.error(err);
        }
       };



const handleRemoveFile = () => {
  setFile(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; 
  }
};
 useEffect(()=>{
  setInfoAddUser((prev: InfoAddUser) => ({
        ...prev,
        resumeId: documentData?.id,
      }));
  }, [documentData, setInfoAddUser])

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <input
  type="file"
  ref={fileInputRef}
  style={{ display: 'none' }}
  onChange={handleFileChange}
/>

      <Button variant="contained" onClick={handleButtonClick}>
        {value}
      </Button>

      {file && (
  <Box>
    <Typography variant="subtitle1">Выбранный файл:</Typography>
    <List dense>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={handleRemoveFile}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Typography variant="body2">{file.name}</Typography>
      </ListItem>
    </List>
  </Box>
)}

    </Box>
  );
}
