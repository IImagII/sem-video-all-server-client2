import { FC } from 'react'

import styles from './Catalog.module.scss'
import Heading from '@/app/components/ui/heading/Heading'
import VideoItem from '@/app/components/ui/video-item/VideoItem'
import { IVideo } from '@/app/types/video.interface'

export interface ICatalog {
  newVideos: IVideo[]
  removeHandler?: (videoId: number) => void
  isUpdateLink?: boolean
}

//каталог будет применяться для всег ои в админке и просто так
const Catalog: FC<ICatalog> = ({ newVideos, removeHandler, isUpdateLink }) => {
  return (
    <div className={styles.recommended}>
      <div className={styles.top_block}>
        <Heading title={removeHandler ? 'Мои видео' : 'Рекомендации'} />
        {/* <Heading title={removeHandler ? 'Мои видео' : 'Рекомендации'} /> - 
        вот эта проверка как бы проверяет если удаление нам требуется то значит это админка */}
      </div>
      <div className={styles.catalog}>
        {newVideos.map((video) => (
          <VideoItem
            item={video}
            key={video.id}
            removeHandler={removeHandler}
            isUpdateLink={isUpdateLink}
          />
        ))}
      </div>
    </div>
  )
}

export default Catalog
