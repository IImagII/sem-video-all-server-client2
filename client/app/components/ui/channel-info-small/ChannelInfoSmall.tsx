import { FC } from 'react'

import UserAvatar from '../user-avatar/UserAvatar'

import styles from './ChannelInfoSmall.module.scss'
import { IUser } from '@/app/types/user.interface'
import { formatNumberTok } from '@/app/utils/format-number-to-k'

//это компонет для оотбражения того кто писал коментарий
const ChannelInfoSmall: FC<{ channel: IUser; message?: string }> = ({
  channel,
  message
}) => {
  return (
    <div className={styles.profile_info}>
      {channel.avatarPath && <UserAvatar user={channel} />}

      <div>
        <div className={styles.name}>{channel.name}</div>
        <div className={styles.subscribers_count}>
          {message ||
            formatNumberTok(channel.subscribersCount || 0) + ' subscribers'}
        </div>
      </div>
    </div>
  )
}

export default ChannelInfoSmall
