import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DELETE_FILE, DELETE_FILE_URL, POST_DOCUMENT, POST_DOCUMENT_MULTIPLE, POST_IMAGE} from './types'
import { API } from '../../../shared/types'

interface DocumentResponse {
  id: string | number; 
}

interface ImageResponse {
  url: string;
  id: string;
}

interface UploadResponse {
  files: { id: number; name: string }[];
}

export const filesApi = createApi({
	reducerPath: 'filesApi',
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
		tagTypes: ['Files'],
		endpoints: (builder) => ({
			 deleteFile: builder.mutation({
							query: (fileId) => ({
								url: `${DELETE_FILE}${fileId}`,
								method: 'DELETE',
							 }),
							 invalidatesTags: ['Files'],
			 }),
			 deleteFileUrl: builder.mutation({
							query: (file) => ({
								url: `${DELETE_FILE_URL}${file}`,
								method: 'DELETE',
							 }),
							 invalidatesTags: ['Files'],
			 }),
			postImage: builder.mutation<ImageResponse, File>({
           query: (file) => {
          const formData = new FormData();
           formData.append('file', file);
          return {
          url: POST_IMAGE,
          method: 'POST',
          body: formData,
    };
  },
  invalidatesTags: ['Files'],
}),
			postDocument: builder.mutation<DocumentResponse, File>({
           query: (file) => {
          const formData = new FormData();
           formData.append('file', file);
          return {
          url: POST_DOCUMENT,
          method: 'POST',
          body: formData,
    };
  },
  invalidatesTags: ['Files']
   }),
	postDocumentMultiple: builder.mutation<UploadResponse, File[]>({
  query: (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); 
    });
    return {
      url: POST_DOCUMENT_MULTIPLE,
      method: "POST",
      body: formData,
    };
  },
  invalidatesTags: ["Files"],
}),


		}),
})

export const {useDeleteFileMutation, usePostImageMutation, useDeleteFileUrlMutation, usePostDocumentMutation, usePostDocumentMultipleMutation} = filesApi;
