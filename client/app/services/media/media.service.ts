import { axiosClassic } from '../../api/axios'

import { IMediaResponse } from './media.interface'

export const MediaService = {
  async upload(
    media: FormData,
    folder?: string,
    setValue?: (val: number) => void
  ) {
    return axiosClassic.post<IMediaResponse>('/media', media, {
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      //тут организовываем прогресс загрузки
      onUploadProgress: (progressEvent) => {
        if (setValue) {
          const progress =
            (progressEvent.loaded / (progressEvent.total || 1)) * 100

          setValue(Math.ceil(progress))
        }
      }
    })
  }
}
