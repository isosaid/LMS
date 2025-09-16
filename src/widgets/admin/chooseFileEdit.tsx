import { useRef, useState } from 'react';
import { Button, Typography, Box, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { usePostDocumentMutation } from '../../entities/files/model/api';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { InfoAddUser } from '../../shared/types'

interface Resume {
  id: string;
  url: string;
  originalName: string;
}

interface User {
  resume?: Resume | null;
}




interface ResumeUploadProps {
  value: string;
  infoAddUser: InfoAddUser;
  setInfoAddUser: React.Dispatch<React.SetStateAction<InfoAddUser>>;
  user: User;
}

export default function ResumeUpload({ value, infoAddUser, setInfoAddUser, user }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postDocument] = usePostDocumentMutation();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const existingFile = infoAddUser.resumeId && user.resume
    ? {
        id: user.resume.id,
        url: user.resume.url,
        name: user.resume.originalName,
      }
    : null;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('Размер файла должен быть до 5 МБ');
      return;
    }

    setFile(selectedFile);
    setUploading(true);

    try {
      const response = await postDocument(selectedFile).unwrap();
      setInfoAddUser((prev) => ({ ...prev, resumeId: response.id }));
      toast.success('Файл успешно загружен');
    } catch (err) {
      const error = err as FetchBaseQueryError | SerializedError;
      toast.error('Ошибка при загрузке');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setInfoAddUser((prev) => ({ ...prev, resumeId: 0 }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />

      <Button 
        variant="contained" 
        onClick={handleButtonClick} 
        disabled={uploading}
        fullWidth
      >
        {uploading ? 'Загрузка...' : value}
      </Button>

      {(file || existingFile) && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Выбранный файл:
          </Typography>
          <List dense>
            <ListItem
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={handleRemoveFile}
                  disabled={uploading}
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              <Typography variant="body2" noWrap>
                {file ? file.name : existingFile?.name}
              </Typography>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}