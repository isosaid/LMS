import { Trash2 } from 'lucide-react'
import GreenButton from '../../../shared/ui/button'
import ResponsiveAddDialogTraks from '../../../widgets/admin/dialogAddEduTracks'
import { useState } from 'react'
import { useDeleteTrackMutation, useGetTracksQuery } from '../../../entities/tracks/model/api'
import EditTrackModal from '../../../widgets/admin/trackEditModal'
import toast from 'react-hot-toast'
import { API_IMAGE } from '../../../shared/types'

interface Tracks {
  id: number | string
  coverImage: string
  title: string
  createdAt:string
  author: {
    name:string
    surname:string
  }
}

const EducationTracks = () => {
  const [name, setName]=useState('')  
  const [category, setCategory]=useState('')
  const {data: dataTrack}=useGetTracksQuery({name , category })
  const [deleteTrack]=useDeleteTrackMutation()
  
  const sbrosFilter=()=>{
    setName('')
    setCategory('')
  }

  const handleDeleteTrack=async (id: number | string )=>{
    try {
      await deleteTrack(id).unwrap()
      toast.success('Учебный трек успешно удален')
    } catch (error) {
      toast.error('Не удалось удалить учебный трек')
      console.log(error)
    }
  }
  
  return <>
  <div className='px-[30px]'>
    <div className='flex justify-between items-center border-b border-gray-300 pt-[30px] pb-[20px] mb-[20px]'>
    <p className='text-[30px] font-semibold tracking-[1px]'>Учебные треки </p>
    <ResponsiveAddDialogTraks />
    
  </div>
  <div className='flex flex-col gap-[15px]'>
    <p className='text-[24px] font-semibold tracking-[1px]'>Фильтр</p>
    <div className='flex justify-between items-center'>
      <div className='flex w-[35%] flex-col gap-[10px]'>
        <label htmlFor="proxozhdenie" className='text-[16px] font-semibold tracking-[1px]'>Прохождение</label>
        <select name="" id="proxozhdenie" value={category} onChange={(e)=> setCategory(e.target.value)} className='p-[5px] border border-gray-300 rounded-[10px] text-black w-[100%] outline-[#3EA458]'>
          <option value="">
            Выбор значения
          </option>
          <option value="SoftSkills">Soft Skills</option>
          <option value="HardSkills">Hard Skills</option>
        </select>
      </div>
      <div className='flex w-[55%] flex-col gap-[10px]'>
        <label htmlFor="naimenovanie" className='text-[16px] font-semibold tracking-[1px]'>Поиск по наименованию</label>
        <input type="text" id='naimenovanie' className='p-[5px] px-[10px] border border-gray-300 rounded-[10px] w-[100%] outline-[#3EA458]' placeholder='Поиск по наименованию' value={name} onChange={(e)=> setName(e.target.value)} />
      </div>
    </div>
    <div className='flex items-center justify-end'>
      <GreenButton value={'Сбросить'}  shirina={250} func={sbrosFilter}/>
    </div>
  </div>

  <div className='border my-[20px] overflow-hidden rounded-[10px]'>
    <table className='w-full rounded-[10px] border-collapse border'>
      <tbody>
        <tr className='bg-[#3EA458] text-[white] border-b border-gray-300'>
          <th className='py-[10px]  w-[20%]'>Изображение</th>
          <th className='py-[10px]  w-[25%]'>Название</th>
          <th className='py-[10px] w-[20%] '>Автор</th>
          <th className='py-[10px] w-[17.5%] '>Дата создания</th>
          <th className='py-[10px] w-[17.5%] '>Действие</th>
        </tr>
        { dataTrack?.length == 0 ?   <tr>
          <td colSpan={5} className=' text-center tracking-[1px] text-[30px] font-semibold italic text-[#3EA458] py-[100px]'> Такого учебного трека не существует. </td>
        </tr> :
          dataTrack?.map((track: Tracks)=>{
            return  <tr className='border-b border-gray-300' key={track.id}>
          <td className='text-center  h-[90px] '>
            <div className='flex items-center justify-center w-[100%]'>
              <img src={`${API_IMAGE}${track.coverImage}`}  alt="" className='w-[130px] rounded-[10px]' />
              </div> </td>
          <td className='text-center py-[10px]  w-[25%]'>{track?.title}</td>
          <td className='text-center py-[10px] w-[20%] '>{track?.author?.name + ' ' + track?.author?.surname}</td>
          <td className='text-center py-[10px] w-[17.5%]'>{new Date(track?.createdAt).toLocaleDateString("ru-RU") }</td>
          <td className=' h-[100px] w-[100%] flex items-center justify-center gap-[10px] '>
            <EditTrackModal track={track} />
             <span className=' transition-all duration-150  transform hover:translate-y-[-5px]  ' onClick={()=> handleDeleteTrack(track.id)}> <Trash2 color='red'/> </span>
            </td>
        </tr>
          })
        }
       
      </tbody>
    </table>
  </div>
  </div>
  
  </>
}

export default EducationTracks