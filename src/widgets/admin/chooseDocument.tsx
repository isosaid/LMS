import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { usePostDocumentMultipleMutation } from '../../entities/files/model/api';
import { InfoAddUser } from '../../shared/types';

interface MultipleFileUploadDocumentProps {
  value: string;
  setInfoAddUser: React.Dispatch<React.SetStateAction<InfoAddUser>>;
}


export default function MultipleFileUploadDocument({ value, setInfoAddUser }: MultipleFileUploadDocumentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  
  const [postDocumentMultiple, { data: multipleData, isLoading }] = usePostDocumentMultipleMutation();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);

      try {
        await postDocumentMultiple(newFiles).unwrap();
        toast.success("Файлы успешно добавлены");
      } catch (error) {
        console.error('Error uploading files:', error);
        toast.error("Не удалось добавить файлы");
      }
    }
  };

  useEffect(() => {
    if (multipleData) {
      const response = multipleData 
      if (response.files) {
        setInfoAddUser((prev: InfoAddUser) => ({
  ...prev,
  otherDocumentsIds: response.files?.map(file => file.id) || [],
}));

      }
    }
  }, [multipleData, setInfoAddUser]);

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button 
        variant="contained" 
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : value}
      </Button>

      {files.length > 0 && (
        <Box>
          <Typography variant="subtitle1">Выбранные файлы:</Typography>
          <List dense>
            {files.map((file, index) => (
              <ListItem
                key={`${file.name}-${index}`}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                    <CloseIcon />
                  </IconButton>
                }
              >
                <Typography variant="body2">{file.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}