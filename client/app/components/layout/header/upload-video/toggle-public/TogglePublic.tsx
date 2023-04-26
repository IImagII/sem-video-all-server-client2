import { Switch } from '@headlessui/react'
import cn from 'classnames'
import { FC } from 'react'

import styles from './TogglePublic.module.scss'

interface TogglePublicProps {
  clickHandler: () => void
  isEnable: boolean
}

const TogglePublic: FC<TogglePublicProps> = ({ isEnable, clickHandler }) => {
  return (
    <div className={styles.wrapper}>
      <Switch
        checked={isEnable}
        onChange={clickHandler}
        className={cn(styles.switch, {
          'bg-primary bg-opacity-80': isEnable,
          'bg-gray-200': !isEnable
        })}
      >
        <span
          className={cn(styles.point, {
            'translate-x-6': isEnable,
            'translate-x-1': !isEnable
          })}
        />
      </Switch>
      <span onClick={clickHandler}>Пуьличное видео </span>
    </div>
  )
}

export default TogglePublic
