import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IVideoDto } from '../../../../../types/video.interface'

import { IMediaResponse } from '@/app/services/media/media.interface'
import { videoApi } from '@/app/store/api/video.api'

interface IUseUploadVideoForm {
  handleCloseModal: () => void
  videoId: number
}

//обратить внимание на запись так  записывается для хука тоесть для простой функции
const useUploadVideoForm = ({
  handleCloseModal,
  videoId
}: IUseUploadVideoForm) => {
  //деалем форму которая нам нужна будет для загрузки видео
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<IVideoDto>({
    mode: 'onChange'
  })

  //делаем запрос на обновление видео в нашем случае на добавление его в колекцию
  const [updateVideo, { isSuccess }] = videoApi.useUpdateVideoMutation()

  //создаем функцию по отправке формы
  const onSubmit: SubmitHandler<IVideoDto> = (data) => {
    updateVideo({
      ...data,
      id: videoId
    })
      .unwrap()
      .then(() => {
        handleCloseModal()
        reset()
      })
  }

  const videoPath = watch('videoPath')
  const thumbnailPath = watch('thumbnailPath')
  const [videoFileName, setVideoFileName] = useState('')

  const handleUploadVideo = (value: IMediaResponse) => {
    setValue('videoPath', value.url)
    setValue('name', value.name)
    setVideoFileName(value.name)
  }

  const [isChosen, setIsChosen] = useState(false)

  const [percent, setPercent] = useState(0)
  const [isUploaded, setIsUploaded] = useState(false)
  const setProgressPercentage = (val: number) => {
    setPercent(val)
    if (val === 100) setIsUploaded(true)
  }

  return {
    form: {
      register,
      errors,
      control,
      handleSubmit,
      onSubmit
    },
    media: {
      videoPath,
      thumbnailPath,
      videoFileName,
      handleUploadVideo
    },
    status: {
      isSuccess,
      isChosen,
      setIsChosen,
      percent,
      isUploaded,
      setProgressPercentage
    }
  }
}

export default useUploadVideoForm
