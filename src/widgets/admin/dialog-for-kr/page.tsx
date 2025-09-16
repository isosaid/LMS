import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddToPersonalReserveMutation, useRemoveFromPersonalReserveMutation } from '../../../entities/personal-reserve/model/api'
import toast from 'react-hot-toast'


export default function AlertDialogKr({person, refetch}: any) {
  const [open, setOpen] = React.useState(false);
  const [addToPersonalReserve]=useAddToPersonalReserveMutation()
  const [removeFromPersonalReserve]=useRemoveFromPersonalReserveMutation()
  const handleClickOpen = () => {
	 setOpen(true);
  };

  const handleClose = () => {
	 setOpen(false);
  };

  const handleAddToPersonalReserve = async () => {
  try {
    await addToPersonalReserve(person.id).unwrap();
    await refetch();
    toast.success('Успешно добавлено');
    setOpen(false);
  } catch {
    toast.error('Ошибка при добавлении');
  }
};



  const handleRemoveFromPersonalReserve = async () => {
  try {
    await removeFromPersonalReserve(person.id).unwrap();
    await refetch();
    toast.success('Успешно удалено из кадрового резерва');
    setOpen(false);
  } catch {
    toast.error('Ошибка при удалении');
  }
};


  return (
	 <React.Fragment>
		<td className={`py-[10px] font-semibold w-[23%] text-center px-[20px] border ${person?.personReserve ? 'text-green-600' :'text-red-700'}`} onClick={handleClickOpen}>
                              {person?.personReserve ? 'Добавлен в кадровый резерв' :  'Не добавлен в кадровый резерв'}
                            </td>
		<Dialog
		  open={open}
		  onClose={handleClose}
		  aria-labelledby="alert-dialog-title"
		  aria-describedby="alert-dialog-description"
		>
		  <DialogTitle id="alert-dialog-title">
			 {`${person.name+ " " + person.surname}`}
		  </DialogTitle>
		  <DialogContent>
  <div className="flex flex-col gap-[10px]">
    {/* Показываем только если еще не в резерве */}
    {!person?.personReserve && (
      <div
        className="py-[5px] border-b-2 hover:text-green-600
                   hover:border-green-600 transition-all duration-200 ease-in-out"
        onClick={handleAddToPersonalReserve}
      >
        <p className="font-semibold">Добавить в кадровый резерв</p>
      </div>
    )}

    {/* Показываем только если уже в резерве */}
    {person?.personReserve && (
      <div
        className="py-[10px] border-b-2 hover:text-red-600
                   hover:border-red-600 transition-all duration-200 ease-in-out px-[5px]"
        onClick={handleRemoveFromPersonalReserve}
      >
        <p className="font-semibold">Удалить из кадрового резерва</p>
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
