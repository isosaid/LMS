import { BrowserRouter, Route, Routes } from 'react-router'
import React, { Suspense } from 'react'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/layoutAdmin'
import { CircularLoader } from '../../components/pageLoader' 


const AccessControl = React.lazy(() => import('../../pages/admin/access-control/accessControl'))
const EducationTracks = React.lazy(() => import('../../pages/admin/education-tracks/educationTracks'))
const Idp = React.lazy(() => import('../../pages/admin/idp/idp'))
const AddTest = React.lazy(() => import('../../pages/admin/materials/[id]/add-test/page'))
const Kurs = React.lazy(() => import('../../pages/admin/materials/[id]/kurs'))
const Materials = React.lazy(() => import('../../pages/admin/materials/materials'))
const TalentPool = React.lazy(() => import('../../pages/admin/talent-pool/talentPool'))
const Workers = React.lazy(() => import('../../pages/admin/workers/workers'))
const LoginPage = React.lazy(() => import('../../pages/auth/login/Login'))
const Collegi = React.lazy(() => import('../../pages/client/collegi/collegi'))
const CoursePage = React.lazy(() => import('../../pages/client/main/course/course'))
const GetByIdCourse = React.lazy(() => import('../../pages/client/main/info-about-course/getById'))
const KnowledgeBasePage = React.lazy(() => import('../../pages/client/main/KnowledgeBase'))
const MyPlan = React.lazy(() => import('../../pages/client/my-plan/myPlan'))
const PersonalReserve = React.lazy(() => import('../../pages/client/personal-reserve/personalReserve'))
const Profile = React.lazy(() => import('../../pages/client/profile/profile'))
const AddArticle = React.lazy(() => import('../../pages/admin/materials/[id]/add-article/page'))
const Favorites = React.lazy(() => import('../../pages/client/favorites/favorites'))
const TrackById = React.lazy(() => import('../../pages/client/my-plan/track-by-id/trackById'))
const ProfileById = React.lazy(() => import('../../pages/client/user-by-id/userById'))

const Router = () => {
  return (
    <BrowserRouter>
      {/* Глобальный Suspense для всего приложения */}
      <Suspense fallback={<CircularLoader />}>
        <Routes>
          <Route path='/'>
            <Route index element={<LoginPage />} />
          </Route>

          <Route path='/user' element={<Layout />}>
            <Route index element={<KnowledgeBasePage />} />
            <Route path=':id' element={<GetByIdCourse />} />
            <Route path='track/:id' element={<TrackById />} />
            <Route path='profile/:id' element={<ProfileById />} />
            <Route path='my-plan' element={<MyPlan />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='collegi' element={<Collegi />} />
            <Route path=':id/course-page' element={<CoursePage />} />
            <Route path='personal-reserve' element={<PersonalReserve />} />
            <Route path='profile' element={<Profile />} />
          </Route>

          <Route path='/admin' element={<LayoutAdmin />}>
            <Route index element={<Materials />} />
            <Route path='education-tracks' element={<EducationTracks />} />
            <Route path='idp' element={<Idp />} />
            <Route path=':id' element={<Kurs />} />
            <Route path='talent-pool' element={<TalentPool />} />
            <Route path='workers' element={<Workers />} />
            <Route path='access-control' element={<AccessControl />} />
            <Route path=':id/add-test' element={<AddTest />} />
            <Route path=':id/add-article' element={<AddArticle />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router