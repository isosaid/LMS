import { useParams } from 'react-router'
import { useGetTrackByIdQuery } from '../../../../entities/tracks/model/api'
import { Grid } from '@mui/material'
import CourseCard from '../../../../components/CourseCard'
import { useGetUserProfileQuery } from '../../../../entities/User/model/api'
import { useMemo } from 'react'
import { API_IMAGE, Course } from '../../../../shared/types'

interface Favorites {
   id: number | string 
}

const TrackById = () => {
	const params=useParams()
	const {data: trackData, isLoading: trackLoading}=useGetTrackByIdQuery(params.id)
	const { data: userData, isLoading } = useGetUserProfileQuery([])
	

		const favoriteIds = useMemo(() => {
			return userData?.favoriteMaterials?.map((fav: Favorites)=> fav.id) || []
		}, [userData])


		 if (isLoading || trackLoading) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return <>
  <section className='w-[77%] m-auto flex flex-col gap-[20px] '>
	<p className='text-[30px] font-semibold italic tracking-[1px]'>{trackData?.title}</p>
	<div className=' flex justify-between items-start'>
		<div className='flex flex-col gap-[30px]'>
			<img src={`${API_IMAGE}${trackData?.coverImage}`} alt={trackData?.title} className='w-[650px] rounded-[15px]' />
		</div>
		
		<div className='w-[42%] flex flex-col gap-[20px]'>
			<div className='flex flex-col gap-[10px]'>
				<p className='text-[20px] font-semibold italic '>Чему учит этот учебный трек : </p>
			<p>{trackData?.teaches}</p>
			</div>
			<div className='flex flex-col gap-[10px]'>
				<p className='text-[20px] font-semibold italic tracking-[1px]'>Описание учебного трека </p>
			<p>{trackData?.description}</p>
			</div>
			
			
		</div>
	</div>
	<div>
				<p className='text-[25px] font-semibold tracking-[1px] italic'>Материалы учебного трека :</p>
				<Grid container spacing={3} py={3}>
						 {trackData?.materialIds?.map((course: Course) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
              <CourseCard course={course} isFavorite={favoriteIds.includes(course.id)} />
            </Grid>
						 ))}
					  </Grid>
			</div>
	</section>
	</>
}

export default TrackById