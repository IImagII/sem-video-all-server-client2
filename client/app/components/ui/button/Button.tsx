import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import styles from './Button.module.scss'
import { IButton } from './button.interface'

export const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  ...rest
}) => {
  //с помощью cn мы можем обьединить классы
  return <button className={cn(styles.button, className)}>{children}</button>
}

export default Button
