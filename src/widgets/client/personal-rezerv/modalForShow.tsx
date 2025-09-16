import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { useGetUsersAiQuery } from "../../../entities/personal-reserve/model/api"

interface ModalShowInfoProps {
  openShow: boolean
  positionId: number | null
  setOpenShow: (value: boolean) => void

  
}

type UserType = {
  id: number
  fullName: string
  position: string
  reason: string
}

export default function ModalShowInfo({
  openShow,
  positionId,
  setOpenShow,
}: ModalShowInfoProps) {

 const [users, setUsers] = React.useState<UserType[] | null>(null)
  const { data: userAiRecommended, isLoading } = useGetUsersAiQuery(
    { positionId },
    { skip: !positionId, refetchOnMountOrArgChange: true }
  )

  React.useEffect(() => {
  if (openShow) {
    setUsers(null)
  }
}, [openShow, positionId])

React.useEffect(() => {
  if (userAiRecommended) {
    setUsers(userAiRecommended)
  }
}, [userAiRecommended])
  const handleClose = () => {
    setOpenShow(false)
  }


  const handleOpenProfile = (id: number) => {
  window.open(`/user/profile/${id}`, "_blank") 
}

  return (
    <Dialog
      open={openShow}
      onClose={handleClose}
      aria-labelledby="ai-recommendation-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="ai-recommendation-title">
        Рекомендованные кандидаты
      </DialogTitle>

      <DialogContent>
        {isLoading || !users ? (
  <div className="h-[200px] flex items-center justify-center">
    <div className="w-[40px] h-[40px] border-[4px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
) : (
          <div className="flex flex-col ">
            {users?.map((user, index) => (
					<div key={user.id} onClick={()=>handleOpenProfile(user.id)} className="flex items-center px-[15px] hover:bg-gray-100 cursor-pointer gap-4 border-b py-[10px] "
              >
					<div className='w-[20%]'>
						<img
                  src="/pages/account/image 3 (1).png"
                  alt={`Фото ${user.fullName}`}
                  className="w-[100px]  rounded-full object-cover"
                />
					</div>
                
                <div className='flex w-[80%] flex-col gap-[10px]'>
						<div>
							<p className="font-medium">Кандидат номер {index+1} : {user.fullName}</p>
                  <p className="text-sm text-gray-600">{user.position}</p>
						</div>
                  
					 <p>{user.reason}</p>
                </div>
              </div>

              
            ))}
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{color:'green'}}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}
