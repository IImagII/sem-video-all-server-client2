import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'

import VideoDuration from './VideoDuration'
import styles from './VideoItem.module.scss'
import { IVideo } from '@/app/types/video.interface'

const LargeVideoItem: FC<{ video: IVideo }> = ({ video }) => {
  return (
    <div className={cn(styles.video_item, styles.large_item)}>
      <div className={styles.thumbnail}>
        {video.thumbnailPath && (
          <Image
            src={video.thumbnailPath}
            alt={video.name}
            layout="fill"
            className={styles['bg-image']}
            priority
          />
        )}
        <VideoDuration isBottom duration={video.duration ?? 0} />
      </div>
    </div>
  )
}

export default LargeVideoItem
