import { FC, useState } from 'react'
import { HiUpload } from 'react-icons/hi'

import stylesIcon from '../icons-right/IconsRight.module.scss'

import UploadModal from './UploadModal'
import { videoApi } from '@/app/store/api/video.api'

const UploadVideo: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [videoId, setVideoId] = useState<number>(0)

  //тут формируем запрос создания причем вот это название формируется автоматически useCreateVideoMutation
  const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation()
  //createVideo - это функция для мутации
  // createVideo().unwrap()- для того чтобы заработал success и ошибки
  //при этом isLoading работает просто так без этого

  return (
    <>
      {/* сделаем картинку загрузки */}
      <button
        className={stylesIcon.button}
        disabled={isLoading}
        // disabled={isLoading} - пока идет загрузка кнопка не работает
        onClick={() => {
          //нам приходит id
          createVideo()
            .unwrap()
            .then((id) => {
              setVideoId(+id)
              setIsOpen(true)
            })
        }}
      >
        <HiUpload />
      </button>
      <UploadModal isOpen={isOpen} setIsOpen={setIsOpen} videoId={videoId} />
    </>
  )
}

export default UploadVideo
