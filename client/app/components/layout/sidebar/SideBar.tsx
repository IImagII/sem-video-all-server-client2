import Link from 'next/link'
import { FC } from 'react'

import styles from './SideBar.module.scss'
import Menu from './menu/Menu'
import { menu } from './menu/menu.data'
import { useAuth } from '@/app/hooks/useAuth'
import { api } from '@/app/store/api/api'

export const SideBar: FC = () => {
  //проверяем на авторизацию
  const { user } = useAuth()

  const { data } = api.useGetProfileQuery(null, {
    skip: !user //выполнение запроса будет только тогда когда пользователь авторизирован
  })

  return (
    <aside className={styles.root}>
      <Link href="/" className="text-2xl font-semibold text-white">
        SemVideo
      </Link>

      <Menu title="Меню" items={menu} />

      {/* выводитм дополнительное меню коотрое появляется при авторизации */}
      {user && (
        <Menu
          title="Мои подписки"
          items={
            data?.subscriptions.map(({ toChannel }) => ({
              image: toChannel.avatarPath,
              title: toChannel.name,
              link: '/c/' + toChannel.id
            })) || []
          }
        />
      )}

      <div className={styles.copy}>@ 2023 SemVideo Copyright</div>
    </aside>
  )
}

export default SideBar
