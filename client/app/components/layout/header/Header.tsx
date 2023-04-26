import { FC } from 'react'

import styles from './Header.module.scss'
import IconsRight from './icons-right/IconsRight'
import Search from './search/Search'

export interface IHeader {}

const Header: FC<IHeader> = () => {
  return (
    <header className="w-full relative pt-6 px-6 border-b-stone-500 flex flex-wrap justify-between items-center mb-8">
      <Search />
      <IconsRight />
    </header>
  )
}

export default Header
