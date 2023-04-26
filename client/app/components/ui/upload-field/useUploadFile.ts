import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useMutation } from 'react-query'

import { MediaService } from '@/app/services/media/media.service'

export const useUploadFile = (
  onChange: (...event: any) => void,
  folder?: string,
  setValue?: (val: number) => void,
  setIsChosen?: Dispatch<SetStateAction<boolean>>
) => {
  //не забыть подключить react-query
  const { mutateAsync } = useMutation(
    'upload file',
    (data: FormData) => MediaService.upload(data, folder, setValue),
    {
      onSuccess: ({ data }) => {
        onChange(data)
      },
      onError: (error: any) => {
        alert(`Ошибка при загрузке файла: ${error.message}`)
      }
    }
  )

  //именно эта функция отвечает за загрузку файла
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files //получаем все файлы
    if (!files?.length) return

    setIsChosen && setIsChosen(true) //если есть эта функция то мы ставим файл какбы выбераем его то есть на этапе загрузки при выборе файла у нас сразу открываются всеполя

    //так загружаются файлы в JS
    const formData = new FormData()
    formData.append('media', files[0])

    await mutateAsync(formData)
  }

  return {
    uploadFile
  }
}
