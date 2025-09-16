import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ADD_POSITION, ADD_TO_PERSONAL_RESERVE, AI_RECOMMENDATION, DELETE_FROM_PERSONAL_RESERVE, DELETE_POSITION, EDIT_POSITION, GET_POSITION, GET_POSITION_USER, GET_USER_RESERVE, HIDE_POSITION, SHOW_POSITION } from './types'
import { API } from '../../../shared/types'

export const personalReserveApi = createApi({
	reducerPath: 'personalReserveApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API,
		prepareHeaders: (headers) => {
  const itemString = localStorage.getItem('access_token');

  if (itemString) {
    try {
      const item = JSON.parse(itemString);

      // Проверяем срок действия
      if (item.expires && new Date(item.expires) > new Date()) {
        headers.set("Authorization", `Bearer ${item.value}`);
      } else {
        // Токен истек, можно удалить
        localStorage.removeItem('access_token');
      }
    } catch (err) {
      console.error("Ошибка при чтении токена:", err);
      localStorage.removeItem('access_token');
    }
  }

  return headers;
}

		}),
		tagTypes: ['Personal-reserve'],
		endpoints: (builder) => ({
			getKeyPositions: builder.query({
				  query: ({ position, company, lengtWork}) => {
				 const params = new URLSearchParams();
				 if (position) params.append("position", position);
				 if (company) params.append("company", company);
				 if (lengtWork) params.append("lengtWork", lengtWork);				 
				 return `${GET_POSITION}?${params.toString()}`;
			  },
			  providesTags: ['Personal-reserve'],
			}),
			getKeyPositionsUser: builder.query({
				  query: ({ position }) => {
				 const params = new URLSearchParams();
				 if (position) params.append("position", position);
				 			 
				 return `${GET_POSITION_USER}?${params.toString()}`;
			  },
			  providesTags: ['Personal-reserve'],
			}),
		getUsersAi: builder.query({
     query: ({positionId}) => ({
       url: `${AI_RECOMMENDATION}${positionId}`,
      method: 'GET',
    }),
  providesTags: ['Personal-reserve'],
}),


			getUsersReserve: builder.query({
				  query: ({ fullname }) => {
				 const params = new URLSearchParams();
				 if (fullname) params.append("fullname", fullname);			 
				 return `${GET_USER_RESERVE}?${params.toString()}`;
			  },
			  providesTags: ['Personal-reserve'],
			}),
			 	deletePosition: builder.mutation({
				query: (deleteId) => ({
					url: `${DELETE_POSITION}${deleteId}`,
					method: 'DELETE',
				 }),
				 invalidatesTags: ['Personal-reserve'],
			 }),
			  addToPersonalReserve: builder.mutation({
				query: (userId) => ({
					url: `${ADD_TO_PERSONAL_RESERVE}${userId}`,
					method: 'POST',
				 }),
				 invalidatesTags: ['Personal-reserve'],
			 }),
			  removeFromPersonalReserve: builder.mutation({
				query: (userId) => ({
					url: `${DELETE_FROM_PERSONAL_RESERVE}${userId}`,
					method: 'POST',
				 }),
				 invalidatesTags: ['Personal-reserve'],
			 }),
			  showPosition: builder.mutation({
				query: (positionId) => ({
					url: `${SHOW_POSITION}${positionId}`,
					method: 'POST',
				 }),
				 invalidatesTags: ['Personal-reserve'],
			 }),
			  hidePosition: builder.mutation({
				query: (positionId) => ({
					url: `${HIDE_POSITION}${positionId}`,
					method: 'POST',
				 }),
				 invalidatesTags: ['Personal-reserve'],
			 }),
			  addPosition: builder.mutation({
				query: (body) => ({
					url: `${ADD_POSITION}`,
					method: 'POST',
					body: body
				 }),
				 invalidatesTags: ['Personal-reserve'],
			 }),
			 editPosition: builder.mutation({
				query: ({body, positionId}) => ({
					url: `${EDIT_POSITION}${positionId}`,
					method: 'PUT',
					body: body
				 }),
				 invalidatesTags: ['Personal-reserve'],
			 }),
			}),
})

export const {useAddToPersonalReserveMutation, useRemoveFromPersonalReserveMutation, useShowPositionMutation, useHidePositionMutation, useDeletePositionMutation, useGetKeyPositionsQuery, useAddPositionMutation, useEditPositionMutation, useGetUsersReserveQuery, useGetKeyPositionsUserQuery, useGetUsersAiQuery} = personalReserveApi;
