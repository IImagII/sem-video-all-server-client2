import { NextPageAuth } from '../app/providers/private-route.interface'

import Layout from '@/app/components/layout/Layout'
import Menu from '@/app/components/layout/sidebar/menu/Menu'
import { api } from '@/app/store/api/api'

/** обратить внимание что название файла моджет быть другое не такое как компонента
 * важно чтобы название файла совпадало с link на переход а название комопнента может
 * не совпадать
 */
const MySubscriptionsPage: NextPageAuth = () => {
  //делаем запрос
  const { data } = api.useGetProfileQuery(null)

  return (
    <Layout title="Мои подписки">
      <Menu
        title="Мои подписки"
        items={
          data?.subscriptions.map(({ toChannel }) => ({
            title: toChannel.name,
            image: toChannel.avatarPath,
            link: `/c/${toChannel.id}`
          })) || []
        }
      />
    </Layout>
  )
}

MySubscriptionsPage.isOnlyUser = true //это мы сделали защиту для роута то есть не может быть доступна если ты не авторизирован

export default MySubscriptionsPage
