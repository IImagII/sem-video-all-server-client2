import dayjs from 'dayjs'
import { FC } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { HiCalendar } from 'react-icons/hi'
import { RiHeart2Fill } from 'react-icons/ri'

import { formatNumberTok } from '../../../../utils/format-number-to-k'

import styles from './VideoDetail.module.scss'
import ChannelInfoSmall from '@/app/components/ui/channel-info-small/ChannelInfoSmall'
import SubscribeButton from '@/app/components/ui/subscribe-button/SubscribeButton'
import { videoApi } from '@/app/store/api/video.api'
import { IUser } from '@/app/types/user.interface'
import { IVideo } from '@/app/types/video.interface'

//тут создаем компонент лайков
const VideoDetail: FC<{ video: IVideo; channel: IUser }> = ({
  video,
  channel
}) => {
  //делаем запрос на проверку изменения лайков
  const [updateLike, { isLoading: isLikeLoading }] =
    videoApi.useUpdateLikesMutation()

  return (
    <div className={styles.detail}>
      <div>
        {/* получаем кто отправил каватраку */}
        <ChannelInfoSmall channel={channel} />
        {/* описание видео название видео тоесть информацию о видео */}
        <h1>{video.name}</h1>
        <article className={styles.article}>{video.description}</article>
      </div>
      <div className="pt-2">
        {/* показываем кнопку подписаться на канал */}
        <div className={styles.wrapper_button}>
          {video.user?.id && (
            <SubscribeButton channelIdForSubscribe={video.user.id} />
          )}
          {/* сама кнопка лайка */}
          <button
            className={styles.likeButton}
            disabled={isLikeLoading}
            onClick={() => updateLike(video.id)}
          >
            <RiHeart2Fill />
            Лайк
          </button>
        </div>

        {/* далее формируем показ просмотров и дату когда появилось */}
        <div className={styles.number_info}>
          <div>
            <AiFillEye />
            <span>{formatNumberTok(video.views || 0)} views</span>
          </div>
          <div>
            <RiHeart2Fill />
            <span>{formatNumberTok(video.likes || 0)} likes</span>
          </div>
          <div>
            <HiCalendar />
            <span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetail
