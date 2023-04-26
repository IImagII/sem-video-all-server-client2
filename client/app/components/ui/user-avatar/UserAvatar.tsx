import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'

import styles from './UserAvatar.module.scss'
import { IUser } from '@/app/types/user.interface'

export interface IUserAvatar {
  user: IUser
  isWhite?: boolean
}

const UserAvatar: FC<IUserAvatar> = ({ user, isWhite }) => {
  //isWhite - это галочка белая и есть синяя
  return (
    <Link href={`/c/${user.id}`}>
      <span className={cn(styles.avatar, { [styles.white]: isWhite })}>
        <Image
          width={45}
          height={45}
          alt={user.name}
          src={user.avatarPath || ''}
        />
        {user.isVerified && (
          <span className={styles.isVerified}>
            <IoIosCheckmarkCircle />
          </span>
        )}
      </span>
    </Link>
  )
}

export default UserAvatar
