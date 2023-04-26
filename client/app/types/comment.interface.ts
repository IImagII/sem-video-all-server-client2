import { IBase } from './base.interface'
import { IUser } from './user.interface'
import { IVideo } from './video.interface'

export interface IComment extends IBase {
  message: string
  user: IUser
  video: IVideo
}

//Pick<IVideo,'id' - такой записью мы можем выбирать отдельные поля от коотрых мы наследуемся
export interface ICommentDto extends Pick<IComment, 'message'> {
  videoId: number
}
