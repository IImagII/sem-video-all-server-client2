import { IVideo } from '@/app/types/video.interface'

export interface IVideoItem {
  item: IVideo //само видео
  removeHandler?: (videoId: number) => void // чтобы появилась кнопка удаления
  isUpdateLink?: boolean // для того чтбы появилась кнопка обновления
  isSmall?: boolean // и еще маленькая версия
}
