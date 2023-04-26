import { IconType } from 'react-icons'

//это типизация ссылок меню которое мы будем делать
export interface IMenuItem {
  link: string
  title: string
  icon?: IconType
  image?: string
}
