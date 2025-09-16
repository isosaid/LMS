import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DELETE_YPRES, GET_YPRES, GET_YPRES_USER, POST_YPRES, PUT_YPRES} from './types'
import { API } from '../../../shared/types'

export const ypresApi = createApi({
	reducerPath: 'ypresApi',
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
		tagTypes: ['Ypres'],
		endpoints: (builder) => ({
			 getYpres: builder.query({
					query: ({ fullname, position}) => {
						const params = new URLSearchParams();
			 
				  if (fullname) params.append("fullname", fullname );
				  if (position) params.append("position", position);
			 
				  return `${GET_YPRES}?${params.toString()}`;
				},
				providesTags: ['Ypres'],
			 }),
			 getYpresUser: builder.query({
           query: () => ({
           url: `${GET_YPRES_USER}`,
            method: 'GET'
           })
        }),

			 deleteYpres: builder.mutation({
							query: (ypresId) => ({
								url: `${DELETE_YPRES}${ypresId}`,
								method: 'DELETE',
							 }),
							 invalidatesTags: ['Ypres'],
			 }),
			 postYpres: builder.mutation({
							query: (body) => ({
								url: `${POST_YPRES}`,
								method: 'POST',
								body: body
							 }),
							 invalidatesTags: ['Ypres'],
			 }),
			 editYpres: builder.mutation({
							query: ({body, ypresId}) => ({
								url: `${PUT_YPRES}${ypresId}`,
								method: 'PUT',
								body: body
							 }),
							 invalidatesTags: ['Ypres'],
			 }),
		}),
})

export const {useGetYpresQuery, useDeleteYpresMutation, usePostYpresMutation, useEditYpresMutation, useGetYpresUserQuery} = ypresApi;
