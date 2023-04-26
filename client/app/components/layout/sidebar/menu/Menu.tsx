import { FC } from 'react'

import styles from './Menu.module.scss'
import MenuItems from './MenuItems'
import { IMenuItem } from './menu.interface'
import Line from '@/app/components/ui/line/Line'

interface IMenu {
  title: string
  items: IMenuItem[]
}

const Menu: FC<IMenu> = ({ title, items }) => {
  return (
    <nav className={styles.mnu_sidebar}>
      <h3>{title}</h3>
      <ul>
        {items.map((menuItem) => (
          <MenuItems item={menuItem} key={menuItem.link} />
        ))}
      </ul>
      <Line />
    </nav>
  )
}

export default Menu
