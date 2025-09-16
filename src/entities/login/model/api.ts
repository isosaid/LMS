import { API } from '../../../shared/types'
import { LOGINUSER } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
	reducerPath: 'loginApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API,
		
		}),
		tagTypes: ['Login'],
		endpoints: (builder) => ({
			 loginUser: builder.mutation({
				 query: (body) => ({
             url: `${LOGINUSER}`,
              method: 'POST',
             body: body
             }),

			 }),
		}),
})

export const {useLoginUserMutation} = loginApi;
