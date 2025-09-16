import { useState } from 'react'
import GreenButton from '../../../../shared/ui/button'
import { CircularProgressWithLabel } from '../../../../widgets/admin/circle'
import { Link, useNavigate, useParams } from 'react-router'
import { useDeleteFileMutation, useDeletePresentationMutation, useDeleteVideoMutation, useGetTableUserByIdQuery, useGetUserByIdQuery } from '../../../../entities/materials/model/api'
import ForAddDostupDialog from '../../../../widgets/admin/dialogForAddDostupToMaterial'
import VideoUploadModal from '../../../../widgets/admin/modals-for-add-files/modalAddVideo'
import FileUploadModal from '../../../../widgets/admin/modals-for-add-files/modalAddFile'
import PresentationUploadModal from '../../../../widgets/admin/modals-for-add-files/modalAddPresentation'
import { Trash2 } from 'lucide-react'
import { useDeleteTestMutation } from '../../../../entities/test/model/api'
import toast from 'react-hot-toast'
import MDEditor from '@uiw/react-md-editor'
import { API_IMAGE, File, Presentation, Test, Users, Video } from '../../../../shared/types'

const Kurs = () => {
	const params=useParams()
	const navigate=useNavigate()
	const {data, refetch}=useGetUserByIdQuery(params.id)
	  const [modalOpen, setModalOpen] = useState(false)
	  const [modalOpenFile, setModalOpenFile] = useState(false)
	  const [modalOpenPresentation, setModalOpenPresentation] = useState(false)
	  const {data: tableUser}=useGetTableUserByIdQuery(params.id)
	  const [active, setActive]=useState('Material')
	  const [deleteTest]=useDeleteTestMutation()
	  const [deletePresentation]=useDeletePresentationMutation()
	  const [deleteVideo]=useDeleteVideoMutation()
	  const [deleteFile]=useDeleteFileMutation()

	  const handleDeleteVideo=async (id: number | string)=>{
		try {
			await deleteVideo({materialId: params.id, 
				videoId:id
			}).unwrap()
			refetch()
			toast.success("Видео успешно удалена")
		} catch (error) {
			console.error(error);
			toast.error('Не удалось удалить видео')
		}		
	  }


	  const handleDeleteTest= async (id: number | string)=>{
		try {
			await deleteTest(id).unwrap()
			refetch()
			toast.success("Тест успешно удален")
		} catch (error) {
			console.error(error);
			toast.error('Не удалось удалить тест ')
		}
	  }


	  const handleDeletePresentation= async (id: number | string)=>{
		try {
			await deletePresentation({materialId: params.id, 
				fileId:id
			}).unwrap()
			refetch()
			toast.success("Презентация успешно удалена")
		} catch (error) {
			console.error(error);
			toast.error('Не удалось удалить презентацию')
		}
	  }


	  const handleDeleteFile= async (id: number | string)=>{
		try {
			await deleteFile({materialId: params.id, 
				fileId:id
			}).unwrap()
			refetch()
			toast.success("Файл успешно удален")
		} catch (error) {
			console.error(error);
			toast.error('Не удалось удалить файл')
		}
	  }

	  const handleCheckResult=()=>{
         navigate(`/user/${params.id}/course-page`)
	  }
	    
  return <>
  <section className='p-[30px] flex flex-col gap-[20px]'>
	<div className='flex justify-between items-center '>
		<p className='text-[30px] font-semibold tracking-[1px]'>{data?.title}</p>
		<GreenButton value={'Добавить материал'} shirina={250} func={()=>setActive('Learning')}/>
	</div>
	<div className={`flex flex-col ${active== 'Material' ? '':''} border border-gray-400 rounded-[20px] gap-[20px]`}>
		<div className='w-[100%]  flex justify-between'>
			<div className='w-[50%] flex flex-col gap-[20px]'>
				<div className='w-[300px] flex mb-[20px]'>
					<p className={`w-[200px] text-center py-[10px] border-r border-b border-gray-400 ${active == 'Material' ? 'text-[#3EA458] font-semibold tracking-[1px]':'text-black font-semibold tracking-[1px]'}`} onClick={()=>setActive('Material')}>Материал</p>
					<p className={`w-[200px] border-gray-400 text-center py-[10px] border-r border-b ${active == 'Learning' ? 'text-[#3EA458] font-semibold tracking-[1px]':'text-black font-semibold tracking-[1px]'}`} onClick={()=>setActive('Learning')}>Изучение</p>
				</div>
				{
					active == 'Material' ? 
					<>
					<div className='px-[30px] '>
					<img src={`${API_IMAGE}${data?.coverImage}`} alt="foto by id" className='w-[500px] rounded-[10px]' />
				</div>
				<div className='flex  flex-col gap-[10px]'>
					<p className='text-[18px] px-[40px] font-semibold tracking-[1px]'>Описание тестирования главного бухгалтера</p>
					<p className='font-semibold px-[40px] tracking-[1px]'>Цель теста : </p>
					<p className='pl-[40px]'> {data?.description}</p>
					<p className='text-[20px] px-[40px] font-semibold tracking-[1px]'>Разделы тестирования : </p>
				</div> 
				</>
				: ''
				}
				
			</div>
			{
				active == 'Material' ? <div className='w-[50%] shadow-md m-[20px] flex flex-col gap-[50px] py-[30px]  px-[20px] border border-gray-400 rounded-[20px] '>
					<div className='flex flex-col gap-[15px]'>
                  <div className='flex justify-between items-center'>
						<p className='text-[18px] font-semibold tracking-[1px]'>Добавлено в план : {data?.userIds?.length} </p>
						<ForAddDostupDialog dataUser={data}/>
					</div>

					</div>
					
             
				 <div className='flex flex-col gap-[15px]'>
              <div className='flex gap-[30px] items-center'>
						<p >Создал : </p>
						<p className='font-semibold tracking-[1px]'> {
							data?.author?.name + ' ' + data?.author?.surname}</p>
						<p> <span>
       {new Date(data?.createdAt).toLocaleDateString("ru-RU", {
           day: "2-digit",
           month: "2-digit",
           year: "numeric",
       })}
</span>
</p>
					</div>
					<div className='flex gap-[30px] items-center'>
						<p >Изменил : </p>
						<p className='font-semibold tracking-[1px]'> {
							data?.author?.name + ' ' + data?.author?.surname}</p>
						<p> <span>
       {new Date(data?.updatedAt).toLocaleDateString("ru-RU", {
           day: "2-digit",
           month: "2-digit",
           year: "numeric",
       })}
</span></p>
					</div>
					<div className='flex gap-[30px] items-center'>
						<p >Посмотрел : </p>
						<p className='font-semibold tracking-[1px]'> {data?.viewedBy.length}</p>
					</div>
					<GreenButton value={'Посмотреть собранный материал'} func={handleCheckResult}/>
				 </div>
			 
			 <div className=' mt-[70px] flex justify-evenly items-center'>
				<CircularProgressWithLabel value={0} />
				<div className='flex flex-col gap-[10px] text-[18px] font-semibold'>
					<p>Всего: 0</p>
					<p>Завершено : 0</p>
					<p>В процессе : 0</p>
					<p>Не пройдено : 0</p>
				</div>
			 </div>
       

				</div> : ''
			}
			
		</div>
		{
			active == "Material" ? <div className=' p-[30px]'>
			<table className='w-full  border border-collapse rounded-[20px] border-gray-300'>
				<tbody>
					<tr className='bg-[#3EA458] text-white'>
						<th className='w-[20%] py-[10px] '>ФИО</th>
						<th className='w-[10%] py-[10px] '>Статус</th>
						<th className='w-[10%] py-[10px] '>Прогресс</th>
						<th className='w-[15%] py-[10px] '>Дата дедлайна </th>
						<th className='w-[10%] py-[10px] '>Затрачено времени</th>
						<th className='w-[15%] py-[10px] '>Должность</th>
						<th className='w-[11%] py-[10px] '>Отдел</th>
						<th>Тест</th>
					</tr>
					{
					     tableUser?.length == 0 ? <tr>
							<td colSpan={8}>
								<div className=' py-[40px]'>
									<p className='text-[25px] font-semibold italic text-green-600 text-center tracking-[1px]'>Пользователи не найдены. Добавьте курс в план пользователей.</p>
								</div>
							</td>
						  </tr> :   
							  tableUser?.map((user: Users)=>{
							return <tr key={user.id} className='border-b border-gray-300'>
						<td className='text-center py-[15px]'>{user.name + ' ' + user.surname}</td>
						<td className='text-center py-[15px]'>{user.status == 'in_progress' ? 'В процессе' : 'В ожидании'}</td>
						<td className='text-center py-[15px]'>0 %</td>
						<td className='text-center py-[15px]'>{new Date(user.deadline).toLocaleDateString('ru-RU')}</td>
						<td className='text-center py-[15px]'>{Math.ceil((new Date(user.completionDate).getTime() - new Date(user.startDate).getTime()) / (1000 * 60 * 60 * 24))} дней</td>
						<td className='text-center py-[15px]'>{user.position}</td>
						<td className='text-center py-[15px]'>{user.department}</td>
						<td className='text-center py-[15px]'>{user.score}</td>
					</tr>
						})
					}
					
				</tbody>
			</table>
		</div> : <div className='w-[90%] gap-[30px]  pb-[60px] m-auto grid grid-cols-3'>
			<div className=' flex flex-col  gap-[20px]'>
				<GreenButton value={'Добавить видео'} shirina={250} func={()=>setModalOpen(true)}/> 
					<div className={`flex flex-col gap-[10px] overflow-auto ${
    data?.videos?.length > 0 ? "h-[260px]" : "h-auto"
  }`}>
  {data?.videos && data.videos.length > 0 ? (
    data.videos.map((video: Video) => (
      <div key={video.id} className='border flex items-center justify-between pr-[20px]'> 
        <img src={`${API_IMAGE}${video.coverImg}`} alt={video.coverImg} className='w-[100px]' />
        <p className='w-[100px] font-semibold italic'>
          ID видео: <span className='text-green-600'>{video.id}</span>
        </p>
        <Trash2 
          className='text-red-600 transition-all duration-200 ease-in-out hover:text-green-600' 
          onClick={() => handleDeleteVideo(video.id)} 
        />
      </div>
    ))
  ) : (
    <p className='text-gray-500 italic '>Видео не найдено. Добавьте видео.</p>
  )}
</div>

					<VideoUploadModal open={modalOpen} onClose={() => setModalOpen(false)} params={params}/>
					
			</div>
			
			<div className='flex flex-col gap-[20px]'>
				<Link to={`/admin/${params.id}/add-test`}>
			   <GreenButton value={'Добавить тест'} shirina={250}/>
			   </Link>
				<div>
					<div className={`flex flex-col gap-[10px] overflow-auto ${
    data?.videos?.length > 0 ? "h-[260px]" : "h-auto"
  }`}>
  {data?.test && data.test.length > 0 ? (
    data.test.map((test: Test) => (
      <div key={test.id} className='border flex items-center justify-between px-[20px] h-[57px]'> 
        <p className='w-[100px] font-semibold italic'>
          ID теста: <span className='text-green-600'>{test.id}</span>
        </p>
        <Trash2 
          className='text-red-600 transition-all duration-200 ease-in-out hover:text-green-600' 
          onClick={() => handleDeleteTest(test.id)} 
        />
      </div>
    ))
  ) : (
    <p className='text-gray-500 italic '>Тесты не найдены. Добавьте тест.</p>
  )}
</div>

				</div>
			</div>


		   <div className='flex flex-col gap-[20px]'>
				<GreenButton value={'Добавить презентацию'} shirina={250} func={()=>setModalOpenPresentation(true)}/>
			<PresentationUploadModal open={modalOpenPresentation} onClose={() => setModalOpenPresentation(false)} />
				<div className={`flex flex-col gap-[10px] overflow-auto ${
    data?.videos?.length > 0 ? "h-[260px]" : "h-auto"
  }`}>
  {data?.presents && data.presents.length > 0 ? (
    data.presents.map((present : Presentation, index: number) => (
      <div key={present.id} className='border flex items-center justify-between px-[20px] h-[57px]'> 
        <p className='w-[230px] font-semibold italic'>
          Презентация {index + 1} : <span className='text-green-600'>{present.originalName}</span>
        </p>
        <Trash2 
          className='text-red-600 transition-all duration-200 ease-in-out hover:text-green-600' 
          onClick={() => handleDeletePresentation(present.id)} 
        />
      </div>
    ))
  ) : (
    <p className='text-gray-500 italic '>Презентации не найдены. Добавьте презентацию.</p>
  )}
</div>

			</div>
			
			
				<div className='flex flex-col gap-[20px]'>
				<GreenButton value={'Добавить файл'} shirina={250} func={()=>setModalOpenFile(true)}/>
			<FileUploadModal open={modalOpenFile} onClose={() => setModalOpenFile(false)} />
				<div className={`flex flex-col gap-[10px] overflow-auto ${
    data?.videos?.length > 0 ? "h-[240px]" : "h-auto"
  }`}>
  {data?.files && data.files.length > 0 ? (
    data.files.map((file: File, index: number) => (
      <div key={file.id} className='border flex items-center justify-between px-[20px] h-[57px]'> 
        <p className='w-[200px] font-semibold italic'>
          Файл {index + 1} : <span className='text-green-600'>{file.originalName.slice(0,20)}...</span>
        </p>
        <Trash2 
          className='text-red-600 transition-all duration-200 ease-in-out hover:text-green-600' 
          onClick={() => handleDeleteFile(file.id)} 
        />
      </div>
    ))
  ) : (
    <p className='text-gray-500 italic '>Файлы не найдены. Добавьте файл.</p>
  )}
</div>

			</div>


			<div className='col-span-2 flex flex-col gap-[20px]'>
  <Link to={`/admin/${params.id}/add-article`}>
    <GreenButton value={'Добавить статью'} shirina={250}/>
  </Link>
  <div>
    <div>
      {data?.article && data.article.trim().length > 0 ? (
        <MDEditor.Markdown
          source={data.article}
          style={{ borderRadius: '6px', padding: '10px' }}
        />
      ) : (
        <p className='text-gray-500 italic '>
          Статья не найдена. Добавьте статью.
        </p>
      )}
    </div>
  </div>
</div>

			

			
			
		</div>
		}
		
	</div>
  </section>
  </>
}

export default Kurs