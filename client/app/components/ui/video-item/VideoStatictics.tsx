import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FC } from 'react'

import styles from './VideoItem.module.scss'
import { formatNumberTok } from '@/app/utils/format-number-to-k'

export interface IVideoStatictics {
  views: number
  createdAt?: string
}

dayjs.extend(relativeTime) // это нужно для fromNow() мы расширили dayjs с помощью relativeTime

const VideoStatictics: FC<IVideoStatictics> = ({ views, createdAt }) => {
  return (
    <div className={styles.number_info}>
      {/* выводим просмотры  */}
      <div className={styles.views}>{formatNumberTok(views)}views</div>

      {/* если есть дата то и дату выводим */}
      {!!createdAt && (
        <>
          <div className="mx-2">.</div>
          <div className={styles.date}>
            {/* она показывает солкьо прошло времени от текущей даты  */}
            {dayjs(new Date(createdAt)).fromNow()}
          </div>
        </>
      )}
    </div>
  )
}

export default VideoStatictics
