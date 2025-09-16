import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, Box, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { usePostDocumentMultipleMutation } from '../../entities/files/model/api';
import { InfoAddUser } from '../../shared/types';

interface MultipleFileUploadDocumentProps {
  value: string;
  user: any;
  setInfoAddUser: React.Dispatch<React.SetStateAction<InfoAddUser>>;
}


interface DisplayFile {
  id?: number;      
  name?: string; 
  url?: string;      
  file?: File;       
}

export default function MultipleFileUploadDocumentEdit({ value, setInfoAddUser, user }: MultipleFileUploadDocumentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<DisplayFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [postDocumentMultiple] = usePostDocumentMultipleMutation();

  useEffect(() => {
    if (user?.otherDocuments) {
      const serverFiles: DisplayFile[] = user.otherDocuments.map((f: any) => ({
        id: f.id,
        name: f.originalName,
        url: f.url,
      }));
      setFiles(serverFiles);
    }
  }, [user]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Добавление новых файлов и автоматическая загрузка
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: DisplayFile[] = Array.from(selectedFiles).map(f => ({
      file: f,
      name: f.name, // сразу сохраняем имя локального файла
    }));

    setIsUploading(true);

    try {
  // Загружаем новые файлы на сервер
  const response: { files: { id: number; name: string }[] } =
    await postDocumentMultiple(newFiles.map(f => f.file!)).unwrap();
  toast.success('Файлы успешно добавлены');

  // Присваиваем id новым файлам из ответа сервера
  const uploadedFiles: DisplayFile[] = response.files.map((f, index) => ({
    id: f.id,
    name: newFiles[index].name, // используем имя локального файла
  }));

  setFiles(prev => [...prev, ...uploadedFiles]);

  setInfoAddUser(prev => ({
    ...prev,
    otherDocumentsIds: [
      ...prev.otherDocumentsIds.filter(id => id),
      ...uploadedFiles.map(f => f.id),
    ],
  }));
} catch (error) {
  console.error('Ошибка загрузки файлов:', error);
  toast.error('Не удалось добавить файлы');
}
 finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const removedFile = files[indexToRemove];

    // Если файл с сервера, удаляем его id из InfoAddUser
    if (removedFile.id) {
      setInfoAddUser(prev => ({
        ...prev,
        otherDocumentsIds: prev.otherDocumentsIds.filter(id => id !== removedFile.id),
      }));
    }

    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
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
        disabled={isUploading}
      >
        {isUploading ? 'Загрузка...' : value}
      </Button>

      {files.length > 0 && (
        <Box>
          <Typography variant="subtitle1">Выбранные файлы:</Typography>
          <List dense>
            {files.map((fileObj, index) => (
              <ListItem
                key={`${fileObj.name}-${index}`}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                    <CloseIcon />
                  </IconButton>
                }
              >
                <Typography variant="body2">
                  {fileObj.file ? fileObj.file.name : fileObj.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
