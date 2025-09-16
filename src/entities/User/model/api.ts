import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACTIVE_USERS, BLOCK_USERS, DELETE_USER, EDIT_USER, GET_USER, GET_USERS, ROLE_USER } from './types'
import { API } from '../../../shared/types'

export const userApi = createApi({
	reducerPath: 'userApi',
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
		tagTypes: ['User'],
		endpoints: (builder) => ({
			 getUserProfile: builder.query({
				query: () => `${GET_USER}`,
				providesTags: ['User'],
			 }),
			 getUsers: builder.query({
					query: ({ fullname, company, role, email, position,supervisor, department}) => {
						const params = new URLSearchParams();
			 
				  if (fullname) params.append("fullname",fullname);
				  if (company) params.append("company",company);
				  if (email) params.append("email",email);
				  if (position) params.append("position", position);
				  if (department) params.append("department", department);
				  if (supervisor) params.append("supervisor", supervisor);
				  if (role) params.append("role",role);

			 
				  return `${GET_USERS}?${params.toString()}`;
				},
				providesTags: ['User'],
			 }),
			  getUserById: builder.query({
				query: (userId) => ({
					url: `/users/${userId}`,
					method: 'GET',
				 }),
				 providesTags: ['User'],
			 }),
			 activeUser: builder.mutation({
							query: (body) => ({
								url: `${ACTIVE_USERS}${body}`,
								method: 'POST',
							 }),
							 invalidatesTags: ['User'],
			 }),
			  blockUser: builder.mutation({
							query: (body) => ({
								url: `${BLOCK_USERS}${body}`,
								method: 'POST',
							 }),
							 invalidatesTags: ['User'],
			 }),
			 deleteUser: builder.mutation({
							query: (body) => ({
								url: `${DELETE_USER}${body}`,
								method: 'DELETE',
							 }),
							 invalidatesTags: ['User'],
			 }),
			 postUser: builder.mutation({
							query: (body) => ({
								url: `${GET_USERS}`,
								method: 'POST',
								body: body
							 }),
							 invalidatesTags: ['User'],
			 }),
			 editUser: builder.mutation({
							query: ({body, userId}) => ({
								url: `${EDIT_USER}${userId}`,
								method: 'PUT',
								body: body
							 }),
							 invalidatesTags: ['User'],
			 }),
			 updateUser: builder.mutation({
							query: (body) => ({
								url: `${GET_USERS}`,
								method: 'PUT',
								body: body
							 }),
							 invalidatesTags: ['User'],
			 }),
			 roleUser: builder.mutation({
							query: (body) => ({
								url: `${ROLE_USER}`,
								method: 'POST',
								body: body
							 }),
							 invalidatesTags: ['User'],
			 }),
		}),
})

export const {useGetUserProfileQuery, useGetUsersQuery, useActiveUserMutation, useBlockUserMutation, useDeleteUserMutation, usePostUserMutation, useEditUserMutation, useUpdateUserMutation, useRoleUserMutation, useGetUserByIdQuery} = userApi;
