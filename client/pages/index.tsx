import shuffle from 'lodash/shuffle'
import { GetStaticProps, NextPage } from 'next'

import Home from '@/app/components/pages/home/Home'
import { IHome } from '@/app/components/pages/home/home.interface'
import { VideoService } from '@/app/services/video.service'
import { IVideo } from '@/app/types/video.interface'

//тут чисто настраиваем роутинг
const HomePage: NextPage<IHome> = (props) => {
  return <Home {...props} />
}

//реализуем наглавно странице SSG
export const getStaticProps: GetStaticProps = async () => {
  try {
    //делаем запросы через наши сервисы
    const { data: newVideos } = await VideoService.getAll()
    const { data: topVideos } = await VideoService.getMostPopular()

    return {
      props: {
        newVideos,
        topVideo: topVideos[0],
        //тут мы просто берем random видео и просто его сортируем shuffle это из библиотеки lodash
        //shuffle - перемешивает элементы в массиве в случайном порядке
        randomVideo:
          shuffle(newVideos.filter((v) => v.id !== topVideos[0].id))[0] ||
          ({} as IVideo)
      } as IHome
    }
  } catch (err) {
    return {
      // props:{} as IHome ,topVideo: {} as IVideo - такой записью мы присвоили типизацию и у нас появились подсказки
      props: {
        newVideos: [],
        topVideo: {} as IVideo,
        randomVideo: {} as IVideo
      } as IHome
    }
  }
}

export default HomePage
