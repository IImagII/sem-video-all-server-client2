import { FC } from 'react'

import styles from './Comment.module.scss'
import ChannelInfoSmall from '@/app/components/ui/channel-info-small/ChannelInfoSmall'
import { IComment } from '@/app/types/comment.interface'

//это компонент для отображения каждого коментария
const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <div className={styles.commentItem}>
      <ChannelInfoSmall channel={comment.user} message={comment.message} />
    </div>
  )
}

export default CommentItem
