import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './VideoInformation.module.scss'

export interface IVideoInformation {
  thumbnailPath?: string
  videoId: number
  fileName: string
  isUploaded: boolean
}

const VideoInformation: FC<IVideoInformation> = ({
  thumbnailPath,
  videoId,
  fileName,
  isUploaded
}) => {
  // тут предствалена информация о видео если допустим у нас нет обложки
  return (
    <div className={styles.info}>
      {!thumbnailPath ? (
        <div className={styles.thumbnail}>
          {!isUploaded
            ? 'Идет загрузка видео...'
            : 'Ты должен загрузить превью'}
        </div>
      ) : (
        <Image
          src={thumbnailPath}
          width={344}
          height={190}
          alt=""
          layout="responsive"
        />
      )}
      {/* это ссылка коотрая типапередается она рамдомная */}
      <div className={styles.details}>
        <div>
          <span>Video Link</span>
          <span>
            <Link href={`/v/${videoId}`}>http://local/v/{videoId}</Link>
          </span>
        </div>
        <div>
          <span>Filename</span>
          <span>{fileName}</span>
        </div>
      </div>
    </div>
  )
}

export default VideoInformation
