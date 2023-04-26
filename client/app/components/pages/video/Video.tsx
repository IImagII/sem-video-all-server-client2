//это компонент динамическрй страницы для показа одиночной старницы с плеером
//данные приходят из /page/v/[id].tsx
import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import Layout from '../../layout/Layout'

import styles from './Video.module.scss'
import Comments from './comments/Comments'
import VideoDetail from './video-detail/VideoDetail'
import VideoPlayer from './video-player/VideoPlayer'
import { videoApi } from '@/app/store/api/video.api'
import { IUser } from '@/app/types/user.interface'
import { IVideo } from '@/app/types/video.interface'

//это страница с самом плеером
const Video: FC = () => {
  //получим id текущего проэкта
  const { query } = useRouter()

  //ДЕЛАЕМ ЗАПРОС УЖЕ ИЗ ДРУГОГО api videoApi получаем data и переименовываем в video
  const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
    Number(query.id),
    { skip: !query.id } // тут показывем что если нет query.id то запроса не будет
  )

  //запрос на  обновление просмотров
  const [updateViews] = videoApi.useUpdateViewsMutation() //получаем просто функцию updateViews

  //делаем запрос на обновление просмотров просто при загрузке страницы
  useEffect(() => {
    if (query.id) updateViews(Number(query.id))
  }, [query.id])

  return (
    <Layout title={video.name}>
      <div className={styles.layout}>
        <VideoPlayer videoPath={video.videoPath} />
        <Comments videoId={video.id} comments={video.comments || []} />
      </div>
      <div className={cn(styles.layout, 'mt-7')}>
        <VideoDetail video={video} channel={video.user || ({} as IUser)} />
        <div></div>
      </div>
    </Layout>
  )
}

export default Video
