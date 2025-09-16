import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Trash2 } from 'lucide-react'
import { useDeleteUserMutation } from '../../entities/materials/model/api'
import toast from 'react-hot-toast'

export default function DeleteDialog({id}: any ) {
  const [open, setOpen] = React.useState(false);
  const [deleteUser]=useDeleteUserMutation()
    const handleDelete = async () => {
    try {
      const result = await deleteUser(id).unwrap(); // важно использовать unwrap
      toast.success("Успешно удалено!");
      console.log("Result:", result);
    } catch (err) {
      toast.error("Ошибка при удалении ");
      console.error(err);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className='flex items-center justify-center py-[10px]' onClick={handleClickOpen}>
            <Trash2 color='#e92f2f' style={{
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.color = '#ff5555';
    e.currentTarget.style.transform = 'scale(1.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.color = '#e92f2f';
    e.currentTarget.style.transform = 'scale(1)';
  }}/>
          </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Вы уверены ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Удалив курс вы не сможете его восстановить !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleDelete} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
