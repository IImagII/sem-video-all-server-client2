import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

import UserAvatar from '../user-avatar/UserAvatar'

import VideoDuration from './VideoDuration'
import styles from './VideoItem.module.scss'
import VideoStatictics from './VideoStatictics'
import { IVideoItem } from './video-item.interface'

const VideoItem: FC<IVideoItem> = ({
  isSmall,
  isUpdateLink,
  removeHandler,
  item
}) => {
  const { push } = useRouter()

  return (
    <div
      className={cn(styles.video_item, {
        //тут реализовываем проверку обязательно через [] иначе работать не будет
        [styles.small]: isSmall //только тогда когда у нас есть isSmall
      })}
    >
      {!!removeHandler && (
        //removeHandler обязательно делается !! чтобы точно приввести к boolean
        <button
          className="absolute bottom-3 right-3 z-10"
          onClick={() => removeHandler(item.id)}
        >
          {/* делаем корзинку */}
          <BiTrash className="text-lg text-red-700/" />
        </button>
      )}
      {isUpdateLink && (
        <button
          className="absolute bottom-3 right-11 z-10"
          onClick={() => push(`/video/edit/${item.id}`)}
        >
          {/* карандаш для редактирования */}
          <BiEdit className="tetx-lg text-blue-600" />
        </button>
      )}

      <div className={styles.thumbnail}>
        {item.thumbnailPath && (
          <Image
            src={item.thumbnailPath}
            alt={item.name}
            width={185}
            height={103}
            layout="responsive"
          />
        )}
        <VideoDuration duration={item.duration ?? 0} />
        {item?.user?.avatarPath && (
          <div className="absolute right-3 -bottom-7">
            <UserAvatar user={item.user} />
          </div>
        )}
      </div>

      <div className={styles.information}>
        {!isSmall && <div className={styles.author}>{item.user?.name}</div>}
        <Link href={`/v/${item.id}`} className={styles.name}>
          {item.name}
        </Link>
        <VideoStatictics
          views={item.views ?? 0}
          createdAt={!isSmall ? item.createdAt : undefined}
        />
      </div>
    </div>
  )
}

export default VideoItem
