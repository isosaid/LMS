import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEditUserMutation } from '../../entities/User/model/api'
import toast from 'react-hot-toast'

export default function FormPasswordDialog({userId}: any) {
  const [open, setOpen] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [editUser] = useEditUserMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <React.Fragment>
      <p 
        className='hover:border-[green] hover:text-[green] transition-all cursor-pointer duration-200 border-b-2 ease-out border-gray-300 py-[5px]' 
        onClick={handleClickOpen}
      >
        Установить новый пароль
      </p>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              try {
                await editUser({ body: { password: newPassword }, userId: userId }).unwrap();
                toast.success("Пароль успешно изменен");
                handleClose();
              } catch (error) {
                console.error(error);
                toast.error('Не удалось поменять пароль');
              }
            },
          },
        }}
      >
        <DialogTitle>Изменение пароля</DialogTitle>
        <DialogContent>
          <div className='w-[500px]'>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="password"
              label="New password"
              type={showPassword ? "text" : "password"} // тут меняем тип
              fullWidth
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit">Установить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
