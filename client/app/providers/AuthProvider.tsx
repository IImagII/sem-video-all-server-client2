import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'

import { TypeComponentAuthFields } from './private-route.interface'

//делаем через dynamic -потомучто у нас авторизация реализована на клиенте иначе не будет работать
const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
  ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  Component: { isOnlyUser },
  children
}) => {
  return !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
  )
}

export default AuthProvider
