import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Rating,
	Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { API, CourseCardProps } from '../shared/types'
import { Check, FileText } from 'lucide-react'
import { YouTube } from '@mui/icons-material'
import { useFavoriteMaterialsMutation, usePostMaterialViewMutation } from '../entities/materials/model/api'
import { useGetUserProfileQuery } from '../entities/User/model/api'

interface Props extends CourseCardProps {
	isFavorite: boolean
	userData?: any
}

const CourseCard: React.FC<Props> = ({ course, isFavorite, userData}) => {
	const [favorite, setFavorite] = useState(isFavorite)
	const [favoriteMaterials] = useFavoriteMaterialsMutation()
	const { refetch } = useGetUserProfileQuery([])
	const [postMaterialView]=usePostMaterialViewMutation()

	useEffect(() => {
		setFavorite(isFavorite)
	}, [isFavorite])
	

	const handleFavoriteToggle = async () => {
		await favoriteMaterials(course.id) 
		setFavorite(!favorite) 
		refetch() 
	}

	const materialView=(materialId: string | number )=>{
    const bodyId={
      userId: userData.id,
      materialId: materialId
    }
    postMaterialView(bodyId) 
  }

	return (
		<Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardMedia
  component="img"
  image={`${API}${course.coverImage}`}
  alt={course.title}
  sx={{ height: 140, objectFit: 'cover' }} // ✅ контроль высоты и обрезки
/>
			<CardContent sx={{ flexGrow: 1, pb: 0 }}>
				<Typography gutterBottom variant='h6' component='div' sx={{ fontWeight: 'medium', fontSize: '1.1rem' }}>
					{course.title}
				</Typography>

				<Box sx={{ mb: 1, mt: 2 }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant='subtitle1' color='text.secondary'>
							Тип
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
								bgcolor: '#e0e0e0',
								px: 2,
								py: 0.5,
								borderRadius: 2,
								fontSize: '0.75rem',
							}}
						>
							{course?.type === 'article' ? (
								<FileText className='text-white' />
							) : course?.type === 'test' ? (
								<Check className='text-white' />
							) : (
								<YouTube className='text-white' />
							)}
							<Typography variant='body2' color='white'>
								{course?.type === 'article'
									? 'Статья'
									: course?.type === 'test'
									? 'Тест'
									: 'Видео'}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
						<Typography variant='subtitle1' color='text.secondary'>
							Рейтинг
						</Typography>
						<Rating name='half-rating-read' defaultValue={course.reting} precision={0.5} readOnly />
					</Box>
				</Box>
			</CardContent>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, mt: 'auto' }}>
				<Button
					component={Link}
					to={`/user/${course.id}`}
					variant='contained'
					color='success'
					size='small'
					sx={{
						textTransform: 'none',
						borderRadius: 2,
						fontSize: '1rem',
						px: 4,
					}}
					onClick={()=>materialView(course.id)}
				>
					Пройти
				</Button>

				<IconButton aria-label='add to favorites' onClick={handleFavoriteToggle} size='small'>
					{favorite ? <FavoriteIcon sx={{ color: '#3EA458' }} /> : <FavoriteBorderIcon />}
				</IconButton>
			</Box>
		</Card>
	)
}

export default CourseCard
