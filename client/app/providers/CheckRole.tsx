import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '../hooks/useAuth'

import { TypeComponentAuthFields } from './private-route.interface'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  children,
  Component: { isOnlyUser }
}) => {
  //проверяем авторизацию
  const { isLoading, user } = useAuth()

  //для переадресайции берем встроенные
  const { replace, pathname } = useRouter()

  const Children = () => <>{children}</>

  //если идем загрузка то возвращаем null
  if (isLoading) return null

  //если пользователь авотризирован
  if (user) return <Children />

  /*еслипользователь не авторизирован а такжестраница защищена и 
  это не главная страница то происходит перекидка на главную страницу*/
  if (isOnlyUser) pathname !== '/' && replace('/')

  return null
}

export default CheckRole
