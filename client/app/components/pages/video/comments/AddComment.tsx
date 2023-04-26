import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'

import styles from './Comment.module.scss'
import Field from '@/app/components/ui/field/Field'
import { commentApi } from '@/app/store/api/comment.api'
import { ICommentDto } from '@/app/types/comment.interface'

//это компонент создания формы коментария
const AddComment: FC<{ videoId: number }> = ({ videoId }) => {
  //это мы берем из формы для валидации формы
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<ICommentDto>({
    mode: 'onChange'
  })

  //делаем запрос для получения коментариев
  const [writeComment, { isLoading }] = commentApi.useCreateCommentMutation()

  const onSubmit: SubmitHandler<ICommentDto> = async (data) => {
    writeComment({
      ...data,
      videoId
    })
      .unwrap()
      .then(() => reset()) // это происходит сброс полей
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <Field
          {...register('message', {
            required: 'Сщщбщение обязательно'
          })}
          placeholder="Введите коментарий"
          error={errors.message}
        />
        <button
          className="text-xl absolute right-2 top-1.5 text-purple"
          disabled={isLoading}
        >
          <MdSend />
        </button>
      </div>
    </form>
  )
}

export default AddComment
