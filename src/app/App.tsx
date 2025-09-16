import { Provider } from 'react-redux'
import { store } from './store/store'
import Router from './router/router'
import { StrictMode, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { CircularLoader } from '../components/pageLoader' // Импортируем лоадер

function App() {
  return (
    <>
      <StrictMode>
        <Toaster position="top-center" reverseOrder={false} />
        <Provider store={store}>
          {/* Добавляем Suspense здесь */}
          <Suspense fallback={<CircularLoader />}>
            <Router/>
          </Suspense>
        </Provider>
      </StrictMode>
    </>
  )
}

export default App