import { FC } from 'react'

import Layout from '../../layout/Layout'
import Catalog from '../home/catalog/Catalog'

import { IVideo } from '@/app/types/video.interface'

//это компонента которая получает информацию из статической папки ниже /page/trending.tsx та которая NextPage
const Trending: FC<{ topVideos: IVideo[] }> = ({ topVideos }) => {
  return (
    //просто передаем туда наши получаемые видео
    <Layout title="Тренды">
      <Catalog newVideos={topVideos} />
    </Layout>
  )
}

export default Trending
