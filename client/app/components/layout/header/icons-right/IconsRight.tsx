import { FC } from 'react'

import AuthForm from '../auth-form/AuthForm'
import ProfileMenu from '../profile-menu/ProfileMenu'
import UploadVideo from '../upload-video/UploadVideo'

import styles from './IconsRight.module.scss'
import { useAuth } from '@/app/hooks/useAuth'

const IconsRight: FC = () => {
  const { user } = useAuth() //так проверяем атворизацию

  return (
    <div className={styles.icons}>
      {/* делаем разное для авторизированных и неавторизированных пользователей */}
      {user ? (
        <>
          <ProfileMenu />
          <UploadVideo />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}

export default IconsRight
