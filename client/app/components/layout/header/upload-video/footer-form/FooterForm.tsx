import cn from 'classnames'
import { FC } from 'react'
import { MdCheckCircle, MdUpload } from 'react-icons/md'

import styles from './FooterForm.module.scss'
import Button from '@/app/components/ui/button/Button'

//идет загрузка видео какойто процент
const FooterForm: FC<{ percent: number; isUploaded: boolean }> = ({
  percent,
  isUploaded
}) => {
  return (
    <div className={styles.footer}>
      <div
        className={cn(styles.status, {
          [styles['icons-uploaded']]: isUploaded
        })}
      >
        <MdUpload className={styles['upload-icon']} />
        <MdCheckCircle className={styles['check-icon']} />
        {/* идет загрузка видео какойто процент */}
        <span>
          {isUploaded ? 'Video is uploaded' : `Uploading ${percent}%...`}
        </span>
      </div>
      <div>
        <Button>Save</Button>
      </div>
    </div>
  )
}

export default FooterForm
