import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './Menu.module.scss'
import { IMenuItem } from './menu.interface'
import { useAuth } from '@/app/hooks/useAuth'

const MenuItems: FC<{ item: IMenuItem }> = ({ item }) => {
  const { user } = useAuth() //тут смотрим авторизацию
  const { asPath } = useRouter() //asPath - нужен чтобы отслеживать ссылку /c/1 то есть будет конкретно показывать 1 как id у useParams()

  //делаем провверку на авторизацию и конкретный link
  if (item.link === '/my-channel')
    if (!user) return null
    else item.link = `/c/${user?.id}`

  return (
    <li>
      <Link
        href={item.link}
        className={`${styles.link} ${
          asPath === item.link ? styles.active : ''
        }`}
      >
        {/* так делаем меню активное */}

        {/* //тут делем проверку если у насбудет картинка вместо иконки ну так у нас в проекте предусмотрено */}
        {/* нюанс если написать просто && то будет передаваться null поэтому передаем пустую строку '' */}
        <span className={item.image ? styles.image : ''}>
          {/* тут провверяем что если у нас именно icon то показываем именно icon */}
          {item.icon && <item.icon />}
          {/* и сразу же проверяем на картинку и показываем картинку */}
          {item.image && (
            <Image src={item.image} width={40} height={40} alt={item.title} />
          )}
        </span>
        <b>{item.title}</b>
      </Link>
    </li>
  )
}

export default MenuItems
