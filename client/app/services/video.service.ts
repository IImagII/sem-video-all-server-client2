import { axiosClassic } from '../api/axios'
import { IVideo } from '../types/video.interface'

export const VIDEO = 'video'

export const VideoService = {
  //функцияя получения всех пользователей
  async getAll() {
    return axiosClassic.get<IVideo[]>(`/${VIDEO}`)
  },

  //функция получения популярных видео
  async getMostPopular() {
    return axiosClassic.get<IVideo[]>(`/${VIDEO}/most-popular`)
  }
}
