import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DELETE_TRACKS, EDIT_TRACKS, GET_BY_ID_TRACKS, GET_TRACKS, POST_TRACKS } from './types'
import { API } from '../../../shared/types'

export const trackApi = createApi({
	reducerPath: 'trackApi',
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
		tagTypes: ['Track'],
		endpoints: (builder) => ({
			 getTracks: builder.query({
					query: ({ name, category}) => {
						const params = new URLSearchParams();
			 
				  if (name) params.append("title", name );
				  if (category) params.append("category",category);
			 
				  return `${GET_TRACKS}?${params.toString()}`;
				},
				providesTags: ['Track'],
			 }),
			 deleteTrack: builder.mutation({
							query: (trackId) => ({
								url: `${DELETE_TRACKS}${trackId}`,
								method: 'DELETE',
							 }),
							 invalidatesTags: ['Track'],
			 }),
			 postTrack: builder.mutation({
							query: (body) => ({
								url: `${POST_TRACKS}`,
								method: 'POST',
								body: body
							 }),
							 invalidatesTags: ['Track'],
			 }),
			 editTrack: builder.mutation({
							query: ({body, trackId}) => ({
								url: `${EDIT_TRACKS}${trackId}`,
								method: 'PUT',
								body: body
							 }),
							 invalidatesTags: ['Track'],
			 }),
			 getTrackById: builder.query({
							query: (materialId) => ({
								url: `${GET_BY_ID_TRACKS}${materialId}`,
								method: 'GET',
							 }),
							 providesTags: ['Track'],
						 }),
		}),
})

export const {useGetTracksQuery, useDeleteTrackMutation, usePostTrackMutation, useEditTrackMutation, useGetTrackByIdQuery} = trackApi;
