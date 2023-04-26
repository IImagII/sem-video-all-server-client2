import { FC } from 'react'

import styles from './Discover.module.scss'
import LargeVideoItem from '@/app/components/ui/video-item/LargeVideoItem'
import { IVideo } from '@/app/types/video.interface'

export interface IDiscover {
  topVideo: IVideo
  randomVideo: IVideo
}

const Discover: FC<IDiscover> = ({ topVideo, randomVideo }) => {
  return (
    <div className={styles.discover}>
      <div className={styles.top_video}>
        <LargeVideoItem video={topVideo} />
      </div>
      <div className={styles.random_video}>
        <LargeVideoItem video={randomVideo} />
      </div>
    </div>
  )
}

export default Discover
