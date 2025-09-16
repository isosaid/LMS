import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useActiveUserMutation, useBlockUserMutation } from '../../entities/User/model/api'
import EditDialogWorkers from './editDialogWorkers'
import FormPasswordDialog from './dialogForChangePassword'
import toast from 'react-hot-toast'

export default function AlertDialog({user}: any) {
  const [open, setOpen] = React.useState(false);
  const [activeUser]=useActiveUserMutation()
  const [blockUser]=useBlockUserMutation()
  // const [deleteUser]=useDeleteUserMutation()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userSoloActive=async ()=>{
    try {
      await activeUser(user.id).unwrap()
      toast.success(`Пользователь ${user.name + ' ' + user.surname} активирован`)
    setOpen(false)
    } catch (error) {
      console.error(error);
      toast.error('Не удалось активировать пользователя')
    }
    
  }

  console.log(user);
  

   const userSoloBlock=async ()=>{
    try {
      await blockUser(user.id).unwrap()
      toast.success(`Пользователь ${user.name + ' ' + user.surname} заблокирован`)
    setOpen(false)
    } catch (error) {
      console.error(error);
      toast.error('Не удалось заблокировать пользователя')
    }
  }

  // const userSoloDelete=async ()=>{
  //   try {
  //     await deleteUser(user.id).unwrap()
  //     toast.success(`Пользователь ${user.name + ' ' + user.surname} удален`)
  //   setOpen(false)
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Не удалось удалить пользователя')
  //   }
  // }



  return (
    <React.Fragment>
      <td className={`text-center cursor-pointer px-[5px] font-semibold text-[12px] ${user.block ? 'text-red-600' : ' text-green-500 '}`} onClick={handleClickOpen}> {user.block ? 'Blocked' : "Active"} </td>
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
    {/* Если пользователь заблокирован → показать "Активировать" */}
    {user.block && (
      <p
        className="hover:border-[green] hover:text-[green] transition-all cursor-pointer duration-200 border-b-2 ease-out border-gray-300 py-[5px]"
        onClick={userSoloActive}
      >
        Активировать пользователя
      </p>
    )}

    <EditDialogWorkers user={user} />
    <FormPasswordDialog userId={user.id} />

    {!user.block && (
      <p
        className="hover:border-[red] hover:text-[red] transition-all cursor-pointer duration-200 border-b-2 ease-out border-gray-300 py-[5px]"
        onClick={userSoloBlock}
      >
        Заблокировать пользователя
      </p>
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
