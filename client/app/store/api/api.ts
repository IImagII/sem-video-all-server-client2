//api- в целом они работают как service
//это мы делаем RTK Query
//нюанс должно быть только одно api а потом в него доаляются какбы более мелкие
// важно чтобы импорт был именно ткаой
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { TypeRootState } from '../store'

import { API_URL } from '@/app/api/axios'
import { USER } from '@/app/services/user.service'
import { IUser } from '@/app/types/user.interface'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Video', 'Profile'], // это типа хранилище и чтобы с этим хранилищем можно было работать
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    //тут указывакем что нам нужно прикреплять token при авторизации
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).auth.accessToken

      if (token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),

  endpoints: (builder) => ({
    /* есть либо query либо mutation
	query - для GET
	mutation - POST PUT PATH DELETE
	*/
    getProfile: builder.query<IUser, any>({
      //IUser - то что нам приходит
      //тут делаем GET запрос на получения профиля
      query: () => `${USER}/profile`,
      providesTags: () => [{ type: 'Profile' }]
    }),
    // тут делаем запрос PATCH когда мы подписываемся на канал
    subscribeToChannel: builder.mutation<boolean, number>({
      query: (channelId) => ({
        url: `${USER}/subscribe/${channelId}`,
        method: 'PATCH'
      }),
      /*это для того чтобы как только мы подписались на канал 
      сразу у нас обновился канал в режиме реального времени 
      именно для этого применяем invalidatesTags*/
      invalidatesTags: () => [{ type: 'Profile' }]
    })
  })
})

// 1)вариант
// export const { useGetProfileQuery } = api // само генерирует название название должно быть именно через use

// 2)вариант использовать непосредственно так там где оно нужно
// api.useGetProfileQuery

//не забывать добавлять в root-reducer.ts
