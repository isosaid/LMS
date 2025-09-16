import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GreenButton from '../../shared/ui/button';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useGetUsersQuery } from '../../entities/User/model/api';
import toast from 'react-hot-toast';
import { usePutMaterialMutation } from '../../entities/materials/model/api';

interface User {
  id: number;
  name: string;
  surname: string;
}

interface DataUser {
  id: number;
  title: string;
  coverImage: string;
  type: string;
  description: string;
  skills: any;
  lang: string;
  category: string;
  levels: any;
  userIds: { id: number }[];
}

interface Props {
  dataUser: DataUser;
}

export default function ForAddDostupDialog({ dataUser }: Props) {
  const [putMaterial] = usePutMaterialMutation();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { data } = useGetUsersQuery([]);

  // Заменили selectedIds на selectedUsers
  const [selectedUsers, setSelectedUsers] = React.useState<{ userId: number; dedline: string }[]>([]);

  React.useEffect(() => {
    if (Array.isArray(dataUser?.userIds)) {
      setSelectedUsers(
        dataUser.userIds.map((u) => ({
          userId: u.id,
          dedline: '2025-06-30', // дефолтное значение
        }))
      );
    }
  }, [dataUser?.userIds]);

  const handleCheckboxChange = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers((prev) => [...prev, { userId: id, dedline: '2025-06-30' }]);
    } else {
      setSelectedUsers((prev) => prev.filter((u) => u.userId !== id));
    }
  };

  const handleDedlineChange = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedUsers((prev) =>
      prev.map((u) => (u.userId === id ? { ...u, dedline: newDate } : u))
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addUsersForDostup = async () => {
    const newMaterial = {
      id: dataUser.id,
      title: dataUser.title,
      type: dataUser.type,
      description: dataUser.description,
      coverImage: dataUser.coverImage,
      skills: dataUser.skills,
      lang: dataUser.lang,
      category: dataUser.category,
      levels: dataUser.levels,
      userIds: selectedUsers.map((u) => ({
        userId: u.userId,
        dedline: u.dedline,
        status: 'pending',
      })),
    };

    try {
      await putMaterial(newMaterial).unwrap();
      toast.success('Материал успешно обновлен!');
      setOpen(false);
    } catch (error) {
      toast.error('Ошибка при изменении материала');
      console.error('Ошибка:', error);
    }
  };

  return (
    <React.Fragment>
      <GreenButton value={'Добавить'} shirina={200} func={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'Выбор сотрудников'}</DialogTitle>
        <DialogContent>
          <div>
            {data?.map((user: User) => {
              const isChecked = selectedUsers.some((u) => u.userId === user.id);
              const dedline = selectedUsers.find((u) => u.userId === user.id)?.dedline || '';

              return (
                <div key={user.id} style={{ marginBottom: 10 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange(user.id)}
                      />
                    }
                    label={user.name + ' ' + user.surname}
                  />
                  {isChecked && (
                    <input
                      type="date"
                      value={dedline}
                      onChange={handleDedlineChange(user.id)}
                      style={{ marginLeft: 10 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions className=" w-[100%]">
          <GreenButton value="Добавить материал" shirina="200" func={addUsersForDostup} />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
