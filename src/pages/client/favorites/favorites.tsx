import { Grid } from '@mui/material' 
import { useGetUserProfileQuery } from '../../../entities/User/model/api'
import CourseCardFav from '../../../components/courseCardFav'
import { Course} from '../../../shared/types'



const Favorites = () => {
	const {data: userData, isLoading}=useGetUserProfileQuery([])
	if (isLoading) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return <>
  <section className='w-[77%] m-auto'>
	<p className='text-[30px] font-semibold tracking-[1px]'>Избранные</p>
	{userData?.favoriteMaterials?.length === 0 ? (
	  <div className='h-[300px] flex justify-center items-center'>
		 <p className='italic text-green-600 text-[30px] font-semibold'>
			Ничего не найдено.
		 </p>
	  </div>
	) : (
	  <Grid container spacing={3} py={3}>
		 {userData?.favoriteMaterials.map((course: Course) => (
			<Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
			  <CourseCardFav course={course} isFavorite={true}/>
			</Grid>
		 ))}
	  </Grid>
	)}
  </section>
  </>
}

export default Favorites