import { Link, useParams } from 'react-router'
import { API_IMAGE, SortType2 } from '../../../../shared/types'
import {  Button, Rating, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { Eye, Trash2, User } from 'lucide-react'
import BarComponent from '../../../../widgets/client/proccessing/progressBar'
import {motion} from 'framer-motion'
import { useGetMaterialByIdQuery, useRatingMaterialsMutation} from '../../../../entities/materials/model/api'
import MonthSelectorModal from '../../../../widgets/client/modal-dobavit-v-plan/dovPLan'
import GreenButton from '../../../../shared/ui/button'
import { useGetUserByIdQuery, useGetUserProfileQuery } from '../../../../entities/User/model/api'
import toast from 'react-hot-toast'
import { useDeleteCommentsMutation, usePostCommentsMutation } from '../../../../entities/comments/model/api'
import RecommendCourse from '../../../../widgets/client/share-kurs/shareKurs'


interface Material {
	id: string | number
}


interface Comments {
	id: string | number
}

const CommentItem = ({ comment, refetch } : any) => {
	const { data: user, isLoading, error } = useGetUserByIdQuery(comment.authorId);	
	const [deleteComment, {isLoading: deleteLoadingComment}]=useDeleteCommentsMutation()

	if (isLoading || deleteLoadingComment) return <div>Loading...</div>;
	if (error) return <div>Error loading user</div>;
	
	

	const deleteComments = async () => {
  try {
    await deleteComment(comment.id).unwrap();
    await refetch();
    toast.success("Комментарий удалён");
  } catch (err: any) {
    toast.error(`Не удалось удалить. ${err?.data?.message}`);
    console.error(err);
  }
};


	return (
		<div className='px-[10px] border-b-2 pb-[10px] '>
			<div className='flex items-center justify-between gap-[20px]'>
				<div className='flex gap-[20px] items-start'>
					<img src="/pages/account/image 3 (1).png" alt="fotka "  className='w-[50px] h-[50px] rounded-full'/>
          <div>
				<p><strong>{user?.name + ' ' + user?.surname}</strong></p>
			<p> {comment.text}</p>
			 </div>
				</div>
				
			  <div className='hover:bg-red-700 transition-all duration-200 ease-in-out   p-[5px] rounded-full' onClick={deleteComments}> <Trash2 className='text-red-700 hover:text-white transition-all duration-100 ease-in-out '/> </div>
			</div>
		</div>
	);
};




const GetByIdCourse = () => {
	const productId = useParams()
   const [sortBy, setSortBy] = useState<SortType2>('О материале')
	const {data: materialDataById, refetch, isLoading}=useGetMaterialByIdQuery(productId.id)
	const [ratingMaterials]=useRatingMaterialsMutation()
	const {data: userData, isLoading: loadingMaterialData}=useGetUserProfileQuery([])
	const [postComments]=usePostCommentsMutation()
   const [rating, setRating]=useState('')
   const [publicComment,setPublicComment]=useState('')

 const materialExists = userData?.plannedMaterials?.some(
  (material: Material) => material.id === Number(productId.id)
); 



	const handleSortByChange = (value: SortType2) => {
				setSortBy(value)				
			}


  const handlePublicComms = async () => {
  if (!publicComment.trim()) {
    toast.error("Комментарий не может быть пустым");
    return;
  }

  const newComms = {
    text: publicComment,
    materialId: Number(productId.id),
  };

  try {
    await postComments(newComms).unwrap(); 
    await refetch(); 
    setPublicComment('');
    toast.success("Комментарий добавлен");
  } catch (err) {
    console.error("Ошибка при добавлении комментария", err);
    toast.error("Не удалось добавить комментарий");
  }
};



	const ratingMaterial = async () => {
  if (!rating || isNaN(Number(rating))) {
	toast.error('Введите корректную оценку от 1 до 5')
    return
  }

  try {
    const postRating = {
      userId: userData?.id,
      reting: Number(rating)
    }

     await ratingMaterials({
      materialId: productId.id,
      body: postRating 
    })

    setRating('')
	 toast.success('Ваш рейтинг добавлен ')
  } catch (error) {
    console.error('Ошибка при отправке рейтинга:', error)
  }
}

	if (isLoading || loadingMaterialData ) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
	
	
  return <>
    <section className='w-[77%] m-auto'>
	  <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      > 
		<p className='text-[32px] leading-[0px] font-semibold pb-[40px]'> {materialDataById?.title}</p>
			<div className='flex items-start justify-between'>
       <aside className=' w-[60%]'>
			<img src={`${API_IMAGE}${materialDataById?.coverImage}`} alt="" className='w-[100%] rounded-[20px]' />
			<div className='flex px-[20px] justify-between items-center py-[10px]'>
					<RecommendCourse materialId={productId.id}/>
				<div className='flex items-center gap-[10px]'>
					<Eye/>
					<p className='text-[18px] font-semibold'>{materialDataById?.viewedBy?.length == 0 ? '0' : materialDataById?.viewedBy?.length}</p>
				</div>
			</div>
			<div className='pt-[50px]'>
				<Tabs
						value={sortBy}
						onChange={(_, newValue) => handleSortByChange(newValue)}
						sx={{
							display: 'inline-flex',
							ml: 1,
							'& .MuiTabs-indicator': { backgroundColor: '#3EA458' },
						}}
					>
						<Tab
							sx={{
								'&.Mui-selected': { color: '#3EA458' },
							}}
							label='О материале'
							value='О материале'
						/>
						<Tab
							sx={{
								'&.Mui-selected': {  color: '#3EA458' },
							}}
							label='Комментарии'
							value='Комментарии'
						/>
					</Tabs>
			</div>
				
					 <div className="mt-4 transition-all duration-300">
          {sortBy === "О материале" && (
					<div className='py-[20px]  '>
				<p className='px-[20px]'>{materialDataById?.description} </p>
			 </div>
        )}
        {sortBy === "Комментарии" && (
			<motion.div 
			key={location.pathname}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}>
				<div className='border-2 my-[20px] pb-[30px]'>

					<div className='flex flex-col  py-[30px] gap-[20px] w-[95%] m-auto'>
						{ materialDataById?.comments?.length == 0 ? <div>
							<p className='text-[25px] text-green-600 font-semibold italic text-center'>Комментариев нет.</p>
						</div> :
						materialDataById?.comments?.map((comment: Comments) => (
	      <CommentItem key={comment.id} comment={comment} refetch={refetch} />
))}

					</div>
					<div className='w-[95%] m-auto'>
						<div className='w-[100%] m-auto flex items-center px-[10px] justify-between'>
					<div className='flex items-center py-[20px]  gap-[10px]'>
					<User width={30} height={30}/>
					<p className='font-semibold text-[20px]'>
					{userData?.name + ' ' + userData?.surname}
					</p>
				</div>
				<Button
  variant="contained"
  sx={{
    backgroundColor: "#4caf50", // зелёный
    color: "white",
	 textTransform: 'none',
	 fontSize: '18px',
	 letterSpacing:'1px',
    '&:hover': {
      backgroundColor: "#43a047",
		  // чуть темнее при ховере
    }
  }}
  onClick={handlePublicComms}
>
  Опубликовать
</Button>
				</div>
				
				<textarea name="" id="" placeholder='Оставьте ваш отзыв об этом курсе ' className='w-[100%] rounded-[15px] h-[150px] p-[10px] border border-gray-400 outline-[#3EA458]' value={publicComment} onChange={(e)=>setPublicComment(e.target.value)}></textarea>
					</div>
				
			 </div>
			</motion.div>
          
        )}
      </div>
		 </aside>
		 <aside className='w-[37%] border flex flex-col gap-[20px] rounded-[10px] border-[#3EA458] py-[40px]'>
        <div className='  flex flex-col justify-center items-center gap-[20px] '>
			<MonthSelectorModal materialExists={materialExists} productId={productId}/>

			<Link to={`/user/${materialDataById?.id}/course-page`} className='w-[90%] m-auto '>
			<Button
  variant="contained"
  sx={{
    backgroundColor: "#4caf50", 
    color: "white",
	 textTransform: 'none',
	 fontSize: '18px',
	 letterSpacing:'1px',
	 width: '100%',
    '&:hover': {
      backgroundColor: "#43a047",
    }
  }}
>   
         Пройти
         </Button>
			</Link>
			        

			<BarComponent/>
		  </div>
		  <div className=' w-[90%] m-auto flex flex-col gap-[20px] '>
			<p className='text-[22px] text-[#ADABAB]'>Язык : <span className='text-[18px] text-black font-semibold tracking-[1px]'>{materialDataById?.lang == 'en' ? ' Английский' : materialDataById?.lang == 'ru' ? ' Русский' : ' Таджикский'}</span> </p>
			<p className='text-[22px] text-[#ADABAB]'>Уровень загруженности: <span className='text-[18px] text-black font-semibold tracking-[1px]'>{materialDataById?.levels == 'advanced' ? 'Специалист' : materialDataById?.levels == 'basic' ? 'Базовый' : 'Продвинутый'}</span> </p>
			<p className='text-[22px] text-[#ADABAB]'>Тип : <span className='text-[18px] px-[20px] py-[5px] rounded-[10px] font-semibold tracking-[1px] bg-green-600 text-white'>{materialDataById?.type == 'test' ? "Тест" : materialDataById?.type == 'video' ? 'Видео' : 'Статья'}</span></p>
			<div className='flex items-center gap-[20px]'>
			<p className='text-[22px] text-[#ADABAB]'>Рейтинг :</p>	
			<Rating
  name="half-rating-read"
  value={materialDataById?.reting ?? 0} // используем 0 как fallback
  precision={0.5}
  readOnly
/>
			</div>
          
			 <div className='flex  justify-between gap-[10px]'>	
         <input type="text" value={rating} onChange={(e)=>setRating(e.target.value)} placeholder='Оцените курс от 1 - 5 ' className='border rounded-[10px] outline-green-600 px-[20px] py-[5px]'/>
				<GreenButton value={'Отправить'} shirina={150} func={ratingMaterial}/>
			 </div>
			
			
		  </div>

		 </aside>
		</div>
      </motion.div>
		
	 </section>
  </>
}

export default GetByIdCourse