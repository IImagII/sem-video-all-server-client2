import { FC } from 'react'

import Layout from '../layout/Layout'
import Loader from '../ui/loader/Loader'

import Catalog from './home/catalog/Catalog'
import { api } from '@/app/store/api/api'
import { videoApi } from '@/app/store/api/video.api'

//это страница В студию которая находиться в профиле
//этостраница откуда приходят данные из роутинга /page/studio.tsx
const Studio: FC = () => {
  //выводи наш каталог для этого делаем запросы
  const { data, isLoading } = api.useGetProfileQuery(null)
  const [removeVideo] = videoApi.useDeleteVideoMutation()

  const videos = data?.videos

  return (
    <Layout title="Semtube studio">
      <div>
        {/* тут загрузчик показывается или если есть видео то выводиться вв иде каталога */}
        {isLoading ? (
          <Loader count={5} />
        ) : videos?.length ? (
          <Catalog
            newVideos={videos}
            removeHandler={removeVideo}
            isUpdateLink
          />
        ) : (
          <p>Видео не найдено</p>
        )}
      </div>
    </Layout>
  )
}

export default Studio
