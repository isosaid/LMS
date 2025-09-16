import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import GreenButton from '../../../../../shared/ui/button'
import { useAddArcticleMaterialsMutation } from '../../../../../entities/materials/model/api'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'

const AddArticle = () => {
  const params=useParams()
  const navigate=useNavigate()
  const [value, setValue] = useState("");  
  const [addArticleMaterials]=useAddArcticleMaterialsMutation()
  

  const handleSend=()=>{
    const newMessage={
    article: value
  } 

  if(value == '') {
    toast.error('Заполните пожалуйста статью')
  } else {
    addArticleMaterials({
    materialId: Number(params.id), 
    newMessage
   })
   toast.success('Статья добавлена успешно')
   navigate(`/admin/${params.id}`)
   setValue('')   
  }
  }


  return <>
  <section className='px-[40px] flex flex-col gap-[20px] py-[30px]'>
    <div className='flex items-center justify-between'>
      <p className='text-[30px] font-semibold italic tracking-[1px]'>Статья</p>
      <GreenButton value={'Сохранить'} shirina={200} func={handleSend}/>
    </div>
    <MDEditor
  value={value}
  onChange={(val) => setValue(val || '')}
  style={{
    minHeight: '450px',
    backgroundColor: '#fdfdfd',
    border: '1px solid green',
    borderRadius: '8px',
    padding: '10px'
  }}
/>

  </section>
  
  </> 
}

export default AddArticle