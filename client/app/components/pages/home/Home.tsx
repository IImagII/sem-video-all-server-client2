import { FC } from 'react'

import Layout from '../../layout/Layout'

import Catalog from './catalog/Catalog'
import Discover from './discover/Discover'
import { IHome } from './home.interface'

const Home: FC<IHome> = ({ randomVideo, topVideo, newVideos }) => {
  return (
    <Layout title="My own application sem-video | Видеохостинг">
      <Discover topVideo={topVideo} randomVideo={randomVideo} />
      <Catalog newVideos={newVideos} />
    </Layout>
  )
}

export default Home
