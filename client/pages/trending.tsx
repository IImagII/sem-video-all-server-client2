import { GetStaticProps, NextPage } from 'next'

import Trending from '@/app/components/pages/trending/Trending'
import { VideoService } from '@/app/services/video.service'
import { IVideo } from '@/app/types/video.interface'

const trending: NextPage<{ topVideos: IVideo[] }> = ({ topVideos }) => {
  return <Trending topVideos={topVideos} />
}

//Делаем запрос по методу SSG  для получения данных и потом отдаем их в компонент Trending чтобы он их уже выводил
export const getStaticProps: GetStaticProps = async () => {
  try {
    //делаем запрос
    const { data: topVideos } = await VideoService.getMostPopular()

    return {
      props: {
        topVideos
      },
      revalidate: 60
      /*revalidate - это опция, используемая при генерации статических страниц 
	 в Next.js с использованием функции getStaticProps. Она определяет, через 
	 какой интервал времени должна быть выполнена повторная генерация страницы 
	 с использованием getStaticProps.В данном коде, revalidate: 60 означает, что 
	 страница будет автоматически перегенерирована каждые 60 секунд (или 1 минуту)*/
    }
  } catch (err) {
    return {
      props: {
        topVideos: []
      }
    }
  }
}

export default trending
