import { configureStore } from '@reduxjs/toolkit'
import {userApi } from '../../entities/User/model/api'
import { loginApi } from '../../entities/login/model/api'
import { materialApi } from '../../entities/materials/model/api'
import { trackApi } from '../../entities/tracks/model/api'
import { ypresApi } from '../../entities/IDP/model/api'
import { testApi } from '../../entities/test/model/api'
import { commentApi } from '../../entities/comments/model/api'
import { filesApi } from '../../entities/files/model/api'
import { personalReserveApi } from '../../entities/personal-reserve/model/api'

export const store = configureStore({
  reducer: {
	[userApi.reducerPath]: userApi.reducer,
	[loginApi.reducerPath]: loginApi.reducer,
	[materialApi.reducerPath]: materialApi.reducer,
	[trackApi.reducerPath]: trackApi.reducer,
	[ypresApi.reducerPath]: ypresApi.reducer,
	[testApi.reducerPath]: testApi.reducer,
	[commentApi.reducerPath]: commentApi.reducer,
	[filesApi.reducerPath]: filesApi.reducer,
	[personalReserveApi.reducerPath]: personalReserveApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( 
		userApi.middleware,
		loginApi.middleware,
		materialApi.middleware,
		trackApi.middleware,
		ypresApi.middleware,
		testApi.middleware,
		commentApi.middleware,
		filesApi.middleware,
		personalReserveApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
