import cn from 'classnames'
import { FC } from 'react'
import { BsPersonPlusFill } from 'react-icons/bs'

import styles from './SubscribeButton.module.scss'
import { useAuth } from '@/app/hooks/useAuth'
import { api } from '@/app/store/api/api'

export interface ISubscribeButton {
  channelIdForSubscribe: number
}

const SubscribeButton: FC<ISubscribeButton> = ({ channelIdForSubscribe }) => {
  const { user } = useAuth()

  const { data: profile } = api.useGetProfileQuery(null, {
    skip: !user // проверяем авторизацию еще раз
  })

  const [subscribe, { isLoading, data }] = api.useSubscribeToChannelMutation()

  //проверка если id user совпадает с тем на кого мы хотим подписаться то кнопки быть не должно
  if (user?.id === channelIdForSubscribe) return null

  //деламе проверку подписан или не подписан следующий алгоритм
  const isSubscribed =
    profile?.subscriptions?.some(
      (sub) => sub.toChannel.id === channelIdForSubscribe
    ) || !!data

  //алгоритм такой если подписка есть то загорается серым цветом
  return (
    <button
      className={cn(styles.button, {
        [styles.subscribed]: isSubscribed
      })}
      //делаем unwrap() чтобы получить isLoading
      onClick={() => subscribe(channelIdForSubscribe).unwrap()}
      disabled={isLoading}
    >
      <BsPersonPlusFill />
      {/* меняется название в зависимости от подписки */}
      {isSubscribed ? 'Уже подписан' : 'Подписаться'}
    </button>
  )
}

export default SubscribeButton
