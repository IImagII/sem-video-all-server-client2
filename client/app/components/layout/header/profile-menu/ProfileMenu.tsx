import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'

import { logout } from '../../../../store/auth/auth.actions'

import styles from './ProfileMenu.module.scss'
import { useActions } from '@/app/hooks/useActions'
import { useAuth } from '@/app/hooks/useAuth'
import { useOutside } from '@/app/hooks/useOutSide'
import { api } from '@/app/store/api/api'

const ProfileMenu: FC = () => {
  const { user } = useAuth() //для проверки авторизации

  //тут используем наш RTK query
  const { data, isLoading } = api.useGetProfileQuery(null, {
    //тут показываем что не нужно выполянть запрос пока нет авторизации чтобы не было ошибки
    skip: !user
  })

  const { isShow, setIsShow, ref } = useOutside(false) //для закрытия вне окна профиля
  const { logout } = useActions() //для выхода из профиля

  if (isLoading) return null

  return (
    <div ref={ref} className={styles.wrapper}>
      {/* весь профайл это будет одна большая кнопка */}
      <button onClick={() => setIsShow(!isShow)}>
        <Image
          src={data?.avatarPath || ''}
          alt={data?.name || ''}
          width={40}
          height={40}
          priority
        />
        <span className={styles.name}>{data?.name}</span>
        {isShow ? <GoChevronUp /> : <GoChevronDown />}
      </button>

      {isShow && (
        <div className={styles['profile-menu']}>
          <ul>
            <li>
              <Link href={`/c/${user?.id}`}>Мой канал</Link>
            </li>
            <li>
              <Link href={`/studio`}>В студию</Link>
            </li>
            <li>
              <button onClick={logout}>Выйти</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
