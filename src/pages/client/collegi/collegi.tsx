import { Tab, Tabs } from '@mui/material'
import { FakeData, SortType4 } from '../../../shared/types'
import { useState } from 'react'
import {motion} from 'framer-motion'
import { useGetUsersQuery } from '../../../entities/User/model/api'

const Collegi = () => {
	const [sortBy, setSortBy] = useState<SortType4>('По умолчанию')
	const handleSortByChange = (value: SortType4) => {
		setSortBy(value)				
	}	
	const [filterFullname, setFilterFullname]=useState('')
	const [filterPosition, setFilterPosition]=useState('')
	const [filterDepartment, setFilterDepartment]=useState('')
	
	const {data: usersData, isLoading} = useGetUsersQuery({
	 fullname: filterFullname,
	 position: filterPosition,
	 department: filterDepartment,
	})
	const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  if (sortBy === 'По умолчанию') {
    setFilterFullname(value);
    console.log(`fullname : ${value}`);
  } else if (sortBy === 'Должность') {
    setFilterPosition(value);
    console.log(`position : ${value}`);
  } else {
    setFilterDepartment(value);
    console.log(`department : ${value}`);
  }
};

if (isLoading) {
    return (
      <div className="  h-[500px] flex items-center justify-center ">
        <div className="w-[60px] h-[60px] border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return <>
  <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}>
         <section className='w-[80%] m-auto flex flex-col gap-[20px]'>
   <p className='text-[30px] text-green-600 tracking-[1px] font-bold'>Коллеги</p>
	<div className='flex gap-[50px] items-center'>
		<input type="text" placeholder={`${sortBy == 'По умолчанию' ? 'Введите ФИО' : sortBy == 'Отдел' ? 'Введите название отдела': 'Введите название должности' }`} className='w-[700px] border border-gray-300  py-[10px] px-[20px] rounded-[10px] outline-[#3EA458]' value={sortBy== 'По умолчанию' ? filterFullname : sortBy == 'Должность' ? filterPosition : filterDepartment} onChange={(e)=>handleChangeFilter(e)} />
		 <div>
				<Tabs
						value={sortBy}
						onChange={(_, newValue) => handleSortByChange(newValue)}
						sx={{
							display: 'inline-flex',
							ml: 0,
							'& .MuiTabs-indicator': { backgroundColor: '#3EA458' },
						}}
					>
						<Tab
							sx={{
								'&.Mui-selected': { color: '#3EA458' },
							}}
							label='По умолчанию'
							value='По умолчанию'
						/>
						<Tab
							sx={{
								'&.Mui-selected': {  color: '#3EA458' },
							}}
							label='Отдел'
							value='Отдел'
						/>
						<Tab
							sx={{
								'&.Mui-selected': {  color: '#3EA458' },
							}}
							label='Должность'
							value='Должность'
						/>
					</Tabs>
		</div>
	</div>
	<div className='rounded-[20px] overflow-hidden border border-gray-400 mt-[20px] mb-[40px]'>
		<table className='table-fixed border-collapse w-full '>
			<tbody>
  <tr className="text-center bg-green-600 text-white">
    <th className="w-[100px] border py-[15px]">Должность</th>
    <th className="w-[100px] border py-[15px]">ФИО</th>
    <th className="w-[100px] border py-[15px]">Фото</th>
    <th className="w-[100px] border py-[15px]">Отдел</th>
  </tr>

  {usersData?.length === 0 ? (
    <tr>
      <td
        colSpan={4}
        className="text-center text-green-600 text-[30px] tracking-[1px] font-semibold italic h-[200px]"
      >
        Таких сотрудников нет.
      </td>
    </tr>
  ) : (
    usersData?.map((user: FakeData) => (
      <tr
        key={user.id}
        className="text-center hover:bg-gray-100 cursor-pointer"
        onClick={() => window.location.href = `/user/profile/${user.id}`} // 👈 вместо Link
      >
        <td className="w-[100px] border py-[20px]">{user.position}</td>
        <td className="w-[100px] border py-[20px]">{`${user.name} ${user.surname}`}</td>
        <td className="w-[100px] border py-[20px]">
          <div className="flex items-center justify-center">
            <img
              src="/pages/account/image 3 (1).png"
              alt="Фото"
              className="w-[40px] rounded-full"
            />
          </div>
        </td>
        <td className="w-[100px] border py-[20px]">{user.department}</td>
      </tr>
    ))
  )}
</tbody>

		</table>
	</div>
  </section>
		  </motion.div>
  
  
  </>
}

export default Collegi