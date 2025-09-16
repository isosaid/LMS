import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeletePositionMutation, useHidePositionMutation, useShowPositionMutation } from '../../../entities/personal-reserve/model/api'
import toast from 'react-hot-toast'
import EditDialogKadrRezerv from '../add-dialog-kadr-rezerv/editDialogKR'


export default function AlertDialogShowOrHide({data, refetch}: any) {
  const [open, setOpen] = React.useState(false);
  const [showPosition]=useShowPositionMutation()
  const [hidePosition]=useHidePositionMutation()
  const [deletePosition]=useDeletePositionMutation()
  const handleClickOpen = () => {
	 setOpen(true);
  };

  const handleClose = () => {
	 setOpen(false);
  };

  const handleShow = async () => {
  try {
	 await showPosition(data.id).unwrap();
	 await refetch();
	 toast.success('Успешно показано');
	 setOpen(false);
  } catch {
	 toast.error('Ошибка при добавлении');
  }
};



  const handleHide = async () => {
  try {
	 await hidePosition(data.id).unwrap();
	 await refetch();
	 toast.success('Успешно скрыто ');
	 setOpen(false);
  } catch {
	 toast.error('Ошибка при удалении');
  }
};


const handleDelete = async () => {
  try {
	 await deletePosition(data.id).unwrap();
	 await refetch();
	 toast.success('Успешно удалено ');
	 setOpen(false);
  } catch {
	 toast.error('Ошибка при удалении');
  }
};


  return (
	 <React.Fragment>
		<td className={`py-[10px] font-semibold tracking-[1px] w-[20%] text-center border ${data.show ? 'text-green-600' : 'text-red-600'}`} onClick={handleClickOpen}> 
                                  {data.show ? 'Показано' : 'Скрыто'}
                     </td>
		<Dialog
		  open={open}
		  onClose={handleClose}
		  aria-labelledby="alert-dialog-title"
		  aria-describedby="alert-dialog-description"
		>
		  <DialogTitle id="alert-dialog-title">
			 {`${data.position}`}
		  </DialogTitle>
		  <DialogContent>
  <div className='flex w-[300px] flex-col gap-[10px]'>
    {/* Показываем только если сейчас скрыто */}
    {!data.show && (
      <div
        className='py-[5px] border-b-2 hover:text-green-600 hover:border-green-600 transition-all duration-200 ease-in-out'
        onClick={handleShow}
      >
        <p className='font-semibold'>Показать</p>
      </div>
    )}

    <EditDialogKadrRezerv data={data} />

    {/* Удаление всегда */}
    <div
      className='py-[10px] border-b-2 hover:text-red-600 hover:border-red-600 transition-all duration-200 ease-in-out px-[5px]'
      onClick={handleDelete}
    >
      <p className='font-semibold'>Удалить должность</p>
    </div>

    {/* Показываем только если сейчас показано */}
    {data.show && (
      <div
        className='py-[10px] border-b-2 hover:text-red-600 hover:border-red-600 transition-all duration-200 ease-in-out px-[5px]'
        onClick={handleHide}
      >
        <p className='font-semibold'>Скрыть</p>
      </div>
    )}
  </div>
</DialogContent>

		  <DialogActions>
			 <Button onClick={handleClose}>Отмена</Button>
		  </DialogActions>
		</Dialog>
	 </React.Fragment>
  );
}
