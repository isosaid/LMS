import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DELETE_COMMENTS, POST_COMMENTS } from './types'
import { API } from '../../../shared/types'

export const commentApi = createApi({
	reducerPath: 'commentApi',
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
		tagTypes: ['Comments'],
		endpoints: (builder) => ({
			 getComments: builder.query({
				query: () => ({
					url: ``,
					method: 'GET',
				 }),
				 providesTags: ['Comments'],
			 }),
			 postComments: builder.mutation({
				query: (body)=>  ({
					url: `${POST_COMMENTS}`,
					method: 'POST',
					body: body
				}),
				invalidatesTags: ['Comments']
			 }),
			 deleteComments: builder.mutation({
				query: (commentId) => ({
					url: `${DELETE_COMMENTS}${commentId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['Comments']
			 })
		}),
})

export const {useGetCommentsQuery, usePostCommentsMutation, useDeleteCommentsMutation} = commentApi;
