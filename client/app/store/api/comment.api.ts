import { api } from './api'
import { IComment, ICommentDto } from '@/app/types/comment.interface'

/* так как это у нас не осоновное api тут уже будет немного по другому запись
это api у нас добавляется для этого применяем injectEndpoints
*/
export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<IComment, ICommentDto>({
      // IComment - типизация того что будем прингимать
      // ICommentDto - того что будем отдавать
      query: (body) => ({
        url: 'comment',
        method: 'POST',
        body
      }),
      /* тут мы должны обновить коментарий к конкретному видео
	 применяем invalidatesTags но я параметрами*/
      /**тоестьтут будет сделано при добавленни
       * коментариев сразу запрос на
       * обновление видео одновременно так може т RTKQuery*/
      invalidatesTags: (result, error, { videoId }) => [
        { type: 'Video', id: videoId }
      ]
    })
  })
})
