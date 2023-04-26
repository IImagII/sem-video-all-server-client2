import { FC } from 'react'
import { Controller } from 'react-hook-form'

import styles from '../UploadVideo.module.scss'
import TogglePublic from '../toggle-public/TogglePublic'
import VideoInformation from '../video-information/VideoInformation'

import SuccessMessage from './SuccessMessage'
import useUploadVideoForm from './useUploadVideoForm'
import Field from '@/app/components/ui/field/Field'
import TextArea from '@/app/components/ui/text-area/TextArea'
import UploadField from '@/app/components/ui/upload-field/UploadField'
import { IMediaResponse } from '@/app/services/media/media.interface'
import FooterForm from '../footer-form/FooterForm'

/** логика загрузки мы сначало нажимаем на кнопку загрузки идет запрос
 * на сервер createVideo мы создаем новое видео в ответ мы получаем id вновь созданного видео,
 * id мы передаем в остоние и у нас открывается модальное окно с сообщение загрузите видео*/
const UploadVideoForm: FC<{
  videoId: number
  handleCloseModal: () => void
}> = ({ videoId, handleCloseModal }) => {
  const { form, status, media } = useUploadVideoForm({
    videoId,
    handleCloseModal
  })

  return (
    <form
      onSubmit={form.handleSubmit(form.onSubmit)}
      className="flex flex-wrap"
    >
      {status.isSuccess && <SuccessMessage />}

      {/* эта форма появляется когда видео уже загрузилось status.isChosen то есть покав идео гразиться мы можем добавлять название и описание*/}
      {status.isChosen ? (
        <>
          <div className="w-7/12 pr-6 pt-3">
            <Field
              {...form.register('name', {
                required: 'Название обязательно'
              })}
              placeholder="Name"
              error={form.errors.name}
            />
            <TextArea
              {...form.register('description', {
                required: 'Описание обязательно!'
              })}
              placeholder="Description"
              error={form.errors.description}
            />

            {/* это поле для загрузки картинки */}
            <div className="mt-8">
              <Controller
                control={form.control}
                name="thumbnailPath"
                render={({ field: { onChange } }) => (
                  <UploadField
                    folder="thumbnails"
                    onChange={(value: IMediaResponse) => {
                      onChange(value.url)
                    }}
                  />
                )}
              />
            </div>

            <Controller
              control={form.control}
              name="isPublic"
              render={({ field: { onChange, value } }) => (
                <TogglePublic
                  clickHandler={() => {
                    onChange(!value)
                  }}
                  isEnable={!!value}
                />
              )}
            />
          </div>
          <div className="w-5/12 p-3 pl-10">
            <VideoInformation
              fileName={media.videoFileName}
              videoId={videoId}
              isUploaded={status.isUploaded}
              thumbnailPath={media.thumbnailPath}
            />
          </div>

          <FooterForm isUploaded={status.isUploaded} percent={status.percent} />
        </>
      ) : (
        // тут показывается что видео еще не загружено
        <div className={styles.uploadScreen}>
          <Controller
            control={form.control}
            name="videoPath"
            render={() => (
              <UploadField
                title="Сначало загрузи видео"
                folder="videos"
                onChange={media.handleUploadVideo}
                setValue={status.setProgressPercentage}
                setIsChosen={status.setIsChosen}
              />
            )}
          />
        </div>
      )}
    </form>
  )
}

export default UploadVideoForm
