import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import Header from './header/Header'
import SideBAr from './sidebar/SideBar'

//работать будеттолько с пропсом PropsWithChildren так children виден не будет
export const Layout: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className={styles.main}>
        <SideBAr />
        <section className={styles.content}>
          <Header />
          <div className="pl-6 pr-8">{children}</div>
        </section>
      </main>
    </>
  )
}

export default Layout
