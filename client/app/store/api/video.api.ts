import { api } from './api'
import { VIDEO } from '@/app/services/video.service'
import { IVideo, IVideoDto } from '@/app/types/video.interface'

/* так как это у нас не осоновное api тут уже будет немного по другому запись
это api у нас добавляется для этого применяем injectEndpoints
*/
export const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //реалихзуем именно поиск видео по searchTerm который мы получим из поля поиск...
    getVideosBySearchTerm: builder.query<IVideo[], string>({
      query: (searchTerm) => ({ url: `/${VIDEO}`, params: { searchTerm } })
    }),
    //получение одного видео по id
    getVideoById: builder.query<IVideo, number>({
      query: (id) => `/${VIDEO}/${id}`,
      //сразу записываем его в videotag
      providesTags: (result, error, id) => [{ type: 'Video', id }]
    }),
    //получение одного видео по id только приватного
    getVideoPrivate: builder.query<IVideo, number>({
      query: (id) => `/${VIDEO}/get-private/${id}`,
      providesTags: (result, error, id) => [{ type: 'Video', id }]
    }),
    //создание видео соответсвенно для конкретного пользователя
    createVideo: builder.mutation<string, void>({
      query: () => ({
        url: `/${VIDEO}`,
        method: 'POST'
      }),
      //обновляем именно profile тоесть добавляем видео к профилю
      invalidatesTags: () => [{ type: 'Profile' }]
    }),
    //обновление видео конкретно по id
    updateVideo: builder.mutation<IVideo, IVideoDto>({
      /*тут мы забираем IVideoDto вкотоором содержиться и id и все
	  сотальное и деструктуризацией забираем это все по отдельности*/
      query: ({ id, ...body }) => ({
        url: `/${VIDEO}/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Video', id },
        { type: 'Profile' }
      ]
    }),
    //реалоизация обновления просмотров
    updateViews: builder.mutation<IVideo, number>({
      query: (id) => ({
        url: `/${VIDEO}/update-views/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Video', id }]
    }),
    //реализация обновления лайков
    updateLikes: builder.mutation<IVideo, number>({
      query: (id) => ({
        url: `/${VIDEO}/update-likes/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Video', id }]
    }),
    //реализация удаления видео
    deleteVideo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${VIDEO}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: 'Video' }, { type: 'Profile' }]
    })
  })
})
