import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DELETE_TEST, GET_TEST_BY_ID, POST_TEST } from './types'
import { API } from '../../../shared/types'

export const testApi = createApi({
	reducerPath: 'testApi',
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
		tagTypes: ['Test'],
		endpoints: (builder) => ({
			 postTest: builder.mutation({
							query: (body) => ({
								url: `${POST_TEST}`,
								method: 'POST',
								body: body
							 }),
							 invalidatesTags: ['Test'],
			 }),
			 postTestSubmit: builder.mutation({
							query: ({testId, body}) => ({
								url: `/tests/${testId}/submit`,
								method: 'POST',
								body: body
							 }),
							 invalidatesTags: ['Test'],
			 }),
			 getByIdTest: builder.query({
							query: (testId) => ({
								url: `${GET_TEST_BY_ID}${testId}`,
								method: 'GET',
							 }),
							 providesTags: ['Test'],
			 }),
			 deleteTest: builder.mutation({
							query: (deleteId) => ({
								url: `${DELETE_TEST}${deleteId}`,
								method: 'DELETE',
							 }),
							 invalidatesTags: ['Test'],
						 }),

		}),
})

export const {usePostTestMutation, useGetByIdTestQuery, usePostTestSubmitMutation, useDeleteTestMutation} = testApi;
