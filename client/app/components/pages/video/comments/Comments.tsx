import { FC } from 'react'

import AddComment from './AddComment'
import styles from './Comment.module.scss'
import CommentItem from './CommentItem'
import { useAuth } from '@/app/hooks/useAuth'
import { IComment } from '@/app/types/comment.interface'

//
const Comments: FC<{ comments: IComment[]; videoId: number }> = ({
  comments,
  videoId
}) => {
  //проверяем что пользователь авторизирован
  const { user } = useAuth()

  return (
    // делаем проверку есть ли коментарии и выводим соответсвующее сообщение
    <div className={styles.comments}>
      <h2>Комментарии</h2>
      <div className={styles.line} />
      {comments.length ? (
        <div className={styles.grid}>
          {comments.map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      ) : (
        <p>Коментарией не найдено!</p>
      )}

      <div className={styles.bottomForm}>
        {user && <AddComment videoId={videoId} />}
      </div>
    </div>
  )
}

export default Comments
