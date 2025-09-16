import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRoleUserMutation } from '../../../entities/User/model/api'
import toast from 'react-hot-toast'


export default function AlertDialogControl({user}: any) {
  const [open, setOpen] = React.useState(false);
    const [roleUser]=useRoleUserMutation()

  const handleClickOpen = () => {
	 setOpen(true);
  };

  const handleClose = () => {
	 setOpen(false);
  };

  const handleDoAdmin=async ()=>{
	try {
		await roleUser({
    "value": "ADMIN",
   "userIds": [user.id]
  }).unwrap() 
 toast.success('Роль изменена на ADMIN') 
  setOpen(false)
	} catch (error) {
		console.error(error);
		toast.error('Не удалось поменять роль на ADMIN')
	}
  }

  const handleDoUser=async ()=>{
	try {
		await roleUser({
    "value": "USER",
   "userIds": [user.id]
  }).unwrap() 
 toast.success('Роль изменена на USER') 
  setOpen(false)
	} catch (error) {
		console.error(error);
		toast.error('Не удалось поменять роль на USER')
	}
  }

 

  return (
	 <React.Fragment>
		<td className={`text-center cursor-pointer px-[5px] font-semibold text-[12px] `} onClick={handleClickOpen}> {user?.roles?.[0]?.value == 'ADMIN' ? "Администратор" : 'Пользователь'} </td>
		<Dialog
		  open={open}
		  onClose={handleClose}
		  aria-labelledby="alert-dialog-title"
		  aria-describedby="alert-dialog-description"
		>
		  <DialogTitle id="alert-dialog-title">
			 {`${user.name+ " " + user.surname}`}
		  </DialogTitle>
		  <DialogContent>
  <div className="flex flex-col w-[300px] gap-[10px]">
    {/* Если роль USER → показать "Сделать админом" */}
    {user?.roles?.[0]?.value !== "ADMIN" && (
      <p
        className="hover:border-[green] hover:text-[green] transition-all cursor-pointer duration-200 border-b-2 ease-out border-gray-300 py-[5px]"
        onClick={handleDoAdmin}
      >
        Сделать админом
      </p>
    )}

    {/* Если роль ADMIN → показать "Сделать пользователем" */}
    {user?.roles?.[0]?.value === "ADMIN" && (
      <p
        className="hover:border-[green] hover:text-[green] transition-all cursor-pointer duration-200 border-b-2 ease-out border-gray-300 py-[5px]"
        onClick={handleDoUser}
      >
        Сделать пользователем
      </p>
    )}
  </div>
</DialogContent>

		  <DialogActions>
			 <Button onClick={handleClose} sx={{color: 'green'}}>Отмена</Button>
		  </DialogActions>
		</Dialog>
	 </React.Fragment>
  );
}
