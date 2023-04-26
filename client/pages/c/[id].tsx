import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Channel from '@/app/components/pages/channel/Channel'
import { IChannel } from '@/app/components/pages/channel/channel.interface'
import { UserService } from '@/app/services/user.service'
import { IUser } from '@/app/types/user.interface'

const ChannelPage: NextPage<IChannel> = ({ channel }) => {
  return <Channel channel={channel} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  /*getStaticPaths - это функция в Next.js, которая позволяет предварительно 
   генерировать статические маршруты (пути) для динамических страниц.
Когда вы создаете динамические страницы в Next.js, вы можете использовать
 getStaticPaths для указания, какие параметры маршрута должны быть использованы
  для генерации статических маршрутов (например, /blog/first-post, 
  /blog/second-post и т.д.). Эта функция должна вернуть объект, содержащий 
  массив динамических маршрутов, доступных для страницы, которую вы создаете. */

  try {
    //делаем запросы через наши сервисы для получения всех пользователей
    const { data: users } = await UserService.getAll()

    //получаем конкретный id
    const paths = users.map((user) => ({
      params: {
        id: String(user.id)
      }
    }))
    return {
      paths,
      /*fallback: 'blocking' определяет, что если запрос пользователя не совпадает ни с 
	 одним из определенных маршрутов, то будет применена стратегия "блокировки".*/
      fallback: 'blocking'
    }
  } catch (err) {
    return {
      paths: [], // так как будет ошибка
      fallback: false
    }
  }
}

//именн тут мы получаем наш конкретный channel- тоесть id который потом передается в компонент ввверху
export const getStaticProps: GetStaticProps = async ({ params }) => {
  //params - для того чтобы забрать id который текущий есть на тсранице
  try {
    //делаем запросы через наш сервис чтобы получить конкретный id
    const { data: channel } = await UserService.getUser(Number(params?.id))

    return {
      props: {
        channel
      } as IChannel
    }
  } catch (err) {
    return {
      props: {
        channel: {} as IUser
      } as IChannel
    }
  }
}

export default ChannelPage
