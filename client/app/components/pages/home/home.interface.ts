import { IVideo } from '../../../types/video.interface'

//описываем проспы Home
export interface IHome {
  randomVideo: IVideo
  topVideo: IVideo
  newVideos: IVideo[]
}
