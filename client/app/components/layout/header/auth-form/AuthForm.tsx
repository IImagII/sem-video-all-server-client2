import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'

import stylesIcon from '../icons-right/IconsRight.module.scss'

import styles from './AuthForm.module.scss'
import { IAuthFields } from './auth-form.interface'
import { validEmail } from './auth-form.valid'
import Button from '@/app/components/ui/button/Button'
import Field from '@/app/components/ui/field/Field'
import { useActions } from '@/app/hooks/useActions'
import { useAuth } from '@/app/hooks/useAuth'
import { useOutside } from '@/app/hooks/useOutSide'

/*функцуионал мы делаем нашу форму для регитсрацуии или авторизации коотрая выезжает 
по нажатию и при клике вне ее уберается с экрана */

const AuthForm: FC = () => {
  const { ref, setIsShow, isShow } = useOutside(false) //хук по закрытию при клике вне поля

  const [type, setType] = useState<'login' | 'register'>('login')

  //useActions
  const { login, register: registerAction } = useActions()
  //register: registerAction- такойц записью мы меняем имя с  register на registerAction

  const { isLoading } = useAuth() //сама авторизация

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IAuthFields>({
    mode: 'onChange' // ошибки ьудут показываться сразу после анписания текста
  }) //беремтся готовый хук для валидации из react-hook-form

  //создаем функцию при которой будет происходит сама валидация SubmitHandler берем из библиотеки валидации react-hook-form
  const onSubmit: SubmitHandler<IAuthFields> = (data) => {
    if (type === 'login') login(data)
    else if (type === 'register') registerAction(data)
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      {/* делаем кнопку закрытия формы авторизации */}
      <button className={stylesIcon.button} onClick={() => setIsShow(!isShow)}>
        <FaUserCircle fill="#a4a4a4" />
      </button>
      {/* если он соответсвенно нажат то мы показываем форму
       и вешаем на него функцию нашей валидации handleSubmit которую мы достали из формы 
       и передаем нашу созданную функцию handleSubmit по которой происходит валидация onSubmit
       */}
      {isShow && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* используя наш ui компонент Field мы передаем в него параметры для валидации */}
          <Field
            {...register('email', {
              required: 'E-mail обязателен!',
              pattern: {
                value: validEmail,
                message: 'Не правильный E-mail'
              }
            })}
            placeholder="E-mail"
            error={errors.email}
          />
          <Field
            {...register('password', {
              required: 'Пароль обязателен!',
              minLength: {
                value: 6,
                message: 'Мин.длина пароля 6 символов'
              }
            })}
            placeholder="password"
            error={errors.email}
            type="password"
          />
          {/* добавляем кнопки тоже беря их из нашего UI Button */}
          <div className="mt-5 mb-1 text-center">
            {/* setType - это мы берем из нашего хука состояния useState()
            в заивисмости от него мы устанававливаем или login или register
            */}
            <Button onClick={() => setType('login')} disabled={isLoading}>
              {/* disabled={isLoading} - эта запись показывает что кнопки не будет если не будешь авторизирован */}
              Войти
            </Button>
          </div>
          <button
            className={styles.register}
            onClick={() => setType('register')}
            disabled={isLoading}
          >
            Регистрация
          </button>
        </form>
      )}
    </div>
  )
}

export default AuthForm
