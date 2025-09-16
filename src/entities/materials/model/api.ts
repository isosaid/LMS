import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ADD_ARTICLE_MATERIAL, ADD_FILE_MATERIAL, ADD_PRESENTATION_MATERIAL, ADD_TO_PLAN_MATERIAL, ADD_VIDEO_MATERIAL, DELETE_FILE, DELETE_PRESENTATION, DELETE_VIDEO, FAVORITES_MATERIAL, GET_MATERIAL, GET_MATERIAL_BY_ID, GET_MATERIAL_VIEW, GET_TABLE_USER_BY_ID, RATING_MATERIAL, STATUS_MATERIAL } from './types'
import { API } from '../../../shared/types'

export const materialApi = createApi({
	reducerPath: 'materialApi',
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
		tagTypes: ['Materials'],
		endpoints: (builder) => ({
			getMaterials: builder.query({
     query: ({ title, lang, levels, type, author, skills }) => {
        const params = new URLSearchParams();

    if (title) params.append("title", title);
    if (lang) params.append("lang", lang);
    if (levels) params.append("levels", levels);
    if (type) params.append("type", type);
    if (author) params.append("author", author);
    if (skills) {
    const skillString = Array.isArray(skills) ? skills.join(',') : skills;
     params.append("skills", skillString); 
	}

    return `${GET_MATERIAL}?${params.toString()}`;
  },
  providesTags: ['Materials'],
}),

			 	deleteUser: builder.mutation({
				query: (deleteId) => ({
					url: `${GET_MATERIAL}/${deleteId}`,
					method: 'DELETE',
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			  postMaterial: builder.mutation({
				query: (body) => ({
					url: `${GET_MATERIAL}`,
					method: 'POST',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 putMaterial: builder.mutation({
				query: (body) => ({
					url: `${GET_MATERIAL}/${body.id}`,
					method: 'PUT',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 getUserById: builder.query({
				query: (materialId) => ({
					url: `/material/admin${materialId}`,
					method: 'GET',
				 }),
				 providesTags: ['Materials'],
			 }),
			  getTableUserById: builder.query({
				query: (materialId) => ({
					url: `${GET_TABLE_USER_BY_ID}${materialId}`,
					method: 'GET',
				 }),
				 providesTags: ['Materials'],
			 }),
			 getMaterialById: builder.query({
				query: (materialId) => ({
					url: `${GET_MATERIAL_BY_ID}${materialId}`,
					method: 'GET',
				 }),
				 providesTags: ['Materials'],
			 }),
			 postMaterialView: builder.mutation({
				query: (body) => ({
					url: `${GET_MATERIAL_VIEW}`,
					method: 'POST',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 addDostupForUsers: builder.mutation({
				query: (body) => ({
					url: `${GET_MATERIAL}/${body.id}`,
					method: 'PUT',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 ratingMaterials: builder.mutation({
				query: ({materialId, body}) => ({
					url: `${RATING_MATERIAL}${materialId}`,
					method: 'PUT',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 favoriteMaterials: builder.mutation({
				query: (materialId) => ({
					url: `${FAVORITES_MATERIAL}${materialId}`,
					method: 'PUT',
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 addArcticleMaterials: builder.mutation({
				query: ({materialId, newMessage}) => ({
					url: `${ADD_ARTICLE_MATERIAL}${materialId}`,
					method: 'PUT',
					body: newMessage
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 addVideoMaterials: builder.mutation({
				query: ({materialId, body}) => ({
					url: `${ADD_VIDEO_MATERIAL}${materialId}`,
					method: 'PUT',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 addToPlanMaterials: builder.mutation({
				query: ({materialId, deadline}) => ({
					url: `${ADD_TO_PLAN_MATERIAL}${materialId}/${deadline}`,
					method: 'PUT',
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 addPresentMaterials: builder.mutation({
				query: ({materialId, body}) => ({
					url: `${ADD_PRESENTATION_MATERIAL}${materialId}`,
					method: 'PUT',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 addFileMaterials: builder.mutation({
				query: ({materialId, body}) => ({
					url: `${ADD_FILE_MATERIAL}${materialId}`,
					method: 'PUT',
					body: body
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 statusMaterial: builder.mutation({
				query: ({userId, materialId, status}) => ({
					url: `${STATUS_MATERIAL}${userId}/${materialId}/${status}`,
					method: 'PUT',
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 deletePresentation: builder.mutation({
				query: ({materialId, fileId}) => ({
					url: `${DELETE_PRESENTATION}${materialId}/${fileId}`,
					method: 'DELETE',
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 deleteVideo: builder.mutation({
				query: ({materialId, videoId}) => ({
					url: `${DELETE_VIDEO}${materialId}/${videoId}`,
					method: 'DELETE',
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			 deleteFile: builder.mutation({
				query: ({materialId, fileId}) => ({
					url: `${DELETE_FILE}${materialId}/${fileId}`,
					method: 'DELETE',
				 }),
				 invalidatesTags: ['Materials'],
			 }),
			}),
})

export const {useGetMaterialsQuery, useDeleteUserMutation, usePostMaterialMutation, usePutMaterialMutation, useGetUserByIdQuery, usePostMaterialViewMutation, useAddDostupForUsersMutation , useGetMaterialByIdQuery, useRatingMaterialsMutation, useGetTableUserByIdQuery, useFavoriteMaterialsMutation, useAddArcticleMaterialsMutation, useAddVideoMaterialsMutation, useAddToPlanMaterialsMutation, useAddPresentMaterialsMutation, useAddFileMaterialsMutation, useDeletePresentationMutation, useDeleteFileMutation, useDeleteVideoMutation, useStatusMaterialMutation} = materialApi;
